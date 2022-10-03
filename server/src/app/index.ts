import express from 'express';
import sequelize from 'services/db';
import { PORT } from '../../config';
import apolloServer from '../services/graphql';
import applyMiddlewares from './middlewares';

async function init() {
  await sequelize.sync({ force: process.env.NODE_ENV === 'development' });
  const app = express();
  await apolloServer.start();
  applyMiddlewares(app, apolloServer);

  return app.listen({ port: PORT }, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`);
    // eslint-disable-next-line no-console
    console.log(`GraphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`);
  });
}

const server = init();

export default server;
