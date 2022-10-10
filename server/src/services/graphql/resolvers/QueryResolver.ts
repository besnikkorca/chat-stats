import { ApolloError } from 'apollo-server-express';
import { QueryResolvers } from '../generated/graphql-types';

const resolver: QueryResolvers = {
  me: async (_, __, { user }) => {
    if (!user) throw new ApolloError('Not authenticated');
    return {
      ...user.toJSON(),
      id: user.id.toString(),
      createdAt: user.createdAt.toString(),
      updatedAt: user.updatedAt.toString(),
    };
  },
  user: async (_, { id }, { models, user }) => {
    if (user?.role !== 'admin') throw new ApolloError('Unauthorized', 'UNAUTHORIZED');

    const foundUser = await models.User.findByPk(id);

    if (!foundUser) throw new ApolloError('User not found', 'USER_NOT_FOUND');

    return {
      ...foundUser.toJSON(),
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
    if (!message) throw new ApolloError('Message not found', 'MESSAGE_NOT_FOUND');
    if (user?.role !== 'admin' && user?.id !== message?.userId)
      throw new ApolloError('Unauthorized', 'UNAUTHORIZED');

    const messageMetaData = await models.MessageMetaData.findOne({ where: { messageId } });
    if (!messageMetaData) throw new ApolloError('Message metadata not found', 'MESSAGE_NOT_FOUND');

    return {
      ...messageMetaData.toJSON(),
      id: messageMetaData.id.toString(),
      messageId: messageMetaData.messageId.toString(),
    };
  },
  metadatas: async (_, __, { models, user }) => {
    if (!user) throw new ApolloError('Unauthorized', 'UNAUTHORIZED');
    const messageIds = await models.Message.findAll({
      where: { userId: user.id },
      attributes: ['id'],
    });

    return models.MessageMetaData.findAll({
      where: { messageId: messageIds.map(({ id }) => id) },
    }).then((messageMetadatas) =>
      messageMetadatas.map((messageMetaData) => ({
        ...messageMetaData,
        id: messageMetaData.id.toString(),
        messageId: messageMetaData.messageId.toString(),
      }))
    );
  },
};

export default resolver;
