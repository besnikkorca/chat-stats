import { ApolloError } from 'apollo-server-express';
import { MutationResolvers } from '../generated/graphql-types';

const resolver: MutationResolvers = {
  message: async (_, { message }, { models, user }) => {
    if (!user) throw new ApolloError('Unauthorized', 'UNAUTHORIZED');

    return models.Message.create({ text: message, userId: user.id })
      .then((newMessage) => newMessage.createMessageMetaData())
      .then((messageMetaData) => {
        return {
          ...messageMetaData.toJSON(),
          id: messageMetaData.id.toString(),
          messageId: messageMetaData.messageId.toString(),
        };
      });
  },

  register: async (_, { registerInput }, context) => {
    const { password, confirmPassword } = registerInput;

    // TODO: do proper validation of registerInput - not only password/confirmPassword
    if (password !== confirmPassword) {
      throw new ApolloError('Passwords do not match', 'PASSWORDS_DO_NOT_MATCH');
    }

    const newUser = await context.models.User.create(registerInput);

    const authToken = new context.AuthToken(newUser.id);

    const token = authToken.getToken();

    const expirationToken = authToken.getExpirationToken();

    authToken.setHttpOnlyCookies(context.res);

    return {
      token,
      expirationToken,
      user: {
        ...newUser.toJSON(),
        id: newUser.id.toString(),
        createdAt: newUser.createdAt.toString(),
        updatedAt: newUser.updatedAt.toString(),
      },
    };
  },

  login: async (_, { loginInput }, context) => {
    const { email, password } = loginInput;

    const user = await context.models.User.findOne({ where: { email } });

    if (!user) throw new ApolloError('User not found', 'USER_NOT_FOUND');

    const validPassword = await context.Password.compare(password, user.password);

    if (!validPassword) throw new ApolloError('Invalid password', 'INVALID_PASSWORD');

    const authToken = new context.AuthToken(user.id);

    const token = authToken.getToken();

    const expirationToken = authToken.getExpirationToken();

    authToken.setHttpOnlyCookies(context.res);

    return { token, expirationToken };
  },
};

export default resolver;
