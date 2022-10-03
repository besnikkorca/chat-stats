import { ExpressContext } from 'apollo-server-express';
import type { Request } from 'express-jwt';
import { Message, MessageMetaData } from 'app/models/Message';
import User from 'app/models/User';
import AuthToken from 'utils/AuthToken';
import Password from 'utils/Password';
import { Context } from './types';

export interface ExpressContextJWT extends ExpressContext {
  req: Request;
}

const context = async ({ req, res }: ExpressContextJWT): Promise<Context> => {
  const user = req.auth ? await User.findByPk(req.auth.sub) : null;

  return {
    res,
    user,
    models: {
      User,
      Message,
      MessageMetaData,
    },
    password: Password,
    authToken: AuthToken,
  };
};

export default context;
