import { ApolloError } from 'apollo-server-express';
import { QueryResolvers } from '../generated/graphql-types';

const resolver: QueryResolvers = {
  user: async (_, { id }, { models, user }) => {
    if (user?.role !== 'admin') throw new ApolloError('Unauthorized', 'UNAUTHORIZED');

    const foundUser = await models.User.findByPk(id);

    if (!foundUser) throw new ApolloError('User not found', 'USER_NOT_FOUND');

    return {
      ...foundUser,
      id: foundUser.id.toString(),
      createdAt: foundUser.createdAt.toString(),
      updatedAt: foundUser.updatedAt.toString(),
    };
  },
  messages: (_, { userId }, { models, user }) => {
    if (user?.role !== 'admin' && user?.id.toString() !== userId)
      throw new ApolloError('Unauthorized', 'UNAUTHORIZED');

    return models.Message.findAll({ where: { userId } }).then((messages) =>
      messages.map(({ id, text }) => ({ id: id.toString(), text }))
    );
  },
  metadata: async (_, { messageId }, { models, user }) => {
    const message = await models.Message.findByPk(messageId);
    if (user?.role !== 'admin' && user?.id !== message?.userId)
      throw new ApolloError('Unauthorized', 'UNAUTHORIZED');

    return models.MessageMetaData.findOne({ where: { messageId } });
  },
  metadatas: async (_, __, { models, user }) => {
    if (!user) throw new ApolloError('Unauthorized', 'UNAUTHORIZED');
    const messageIds = await models.Message.findAll({
      where: { userId: user.id },
      attributes: ['id'],
    });

    return models.MessageMetaData.findAll({
      where: { messageId: messageIds.map(({ id }) => id) },
    });
  },
};

export default resolver;
