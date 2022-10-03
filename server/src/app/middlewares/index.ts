import { ApolloServer } from 'apollo-server-express';
import cookie from 'cookie';
import { json, Express } from 'express';
import { expressjwt } from 'express-jwt';
import { JWT_SECRET } from 'config/index';
import applyRoutes from '../routes';

export default function applyMiddlewares(app: Express, apolloServer: ApolloServer): void {
  apolloServer.applyMiddleware({
    app,
  });

  app.use(json());
  app.use(
    expressjwt({
      algorithms: ['HS256'],
      credentialsRequired: false,
      secret: JWT_SECRET,
      getToken: (req) => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1];
        }

        if (req.query && req.query.token) {
          return req.query.token as string;
        }

        if (!req.headers.cookie) return undefined;
        return cookie.parse(req.headers.cookie).token;
      },
    })
  );

  applyRoutes(app);
}
