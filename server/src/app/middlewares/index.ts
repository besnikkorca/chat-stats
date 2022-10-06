import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { json, Express } from 'express';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';
import applyRoutes from '../routes';
import { corsConfig, helmetConfig, jwtConfig, apolloCorsConfig } from './config';

export default function applyMiddlewares(app: Express, apolloServer: ApolloServer): void {
  app.use(helmet(helmetConfig), cors(corsConfig), json(), expressjwt(jwtConfig));

  applyRoutes(app);

  apolloServer.applyMiddleware({
    app,
    cors: apolloCorsConfig,
  });
}
