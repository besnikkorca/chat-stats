import { ApolloError } from 'apollo-server-express';
import { MutationResolvers } from '../generated/graphql-types';

const ONE_HOUR = 1;

const resolver: MutationResolvers = {
  message: async (_, { message }, { models, user }) => {
    if (!user) throw new ApolloError('Unauthorized', 'UNAUTHORIZED');

    return models.Message.create({ text: message, userId: user.id }).then((newMessage) =>
      newMessage.createMessageMetaData()
    );
  },

  register: async (_, { registerInput }, context) => {
    const { password, confirmPassword } = registerInput;

    // TODO: do proper validation of registerInput - not only password/confirmPassword
    if (password !== confirmPassword) {
      throw new ApolloError('Passwords do not match', 'PASSWORDS_DO_NOT_MATCH');
    }

    const newUser = await context.models.User.create(registerInput);

    const token = context.authToken.create(newUser.id);

    return {
      token,
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

    const validPassword = await context.password.compare(user.password, password);

    if (!validPassword) throw new ApolloError('Invalid password', 'INVALID_PASSWORD');

    const token = context.authToken.create(user.id);

    // Using a lib like moment js makes it way easier to handle dates
    // but not worth importing for a single/simple use case
    const expires = new Date();
    expires.setHours(expires.getHours() + ONE_HOUR);

    // Setting the token in http only cookies but also returning it
    // so that if it's a browser authentication is handled automatically
    // by the http only cookies but if the api is being consumed by something
    // else it can use the returned token to consume the api
    context.res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      expires,
      sameSite: 'none',
    });
    context.res.cookie('token_expiration', expires.toISOString(), { expires });

    return token;
  },
};

export default resolver;
