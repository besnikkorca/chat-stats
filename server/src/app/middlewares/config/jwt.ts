import cookie from 'cookie';
import type { TokenGetter } from 'express-jwt';
import type { Algorithm } from 'jsonwebtoken';
import { JWT_SECRET } from 'config/index';

const getToken: TokenGetter = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  if (req.query && req.query.token) {
    return req.query.token as string;
  }

  if (!req.headers.cookie) return undefined;
  return cookie.parse(req.headers.cookie).zb_token;
};

const algorithms: Algorithm[] = ['HS256'];

const jwtConfig = {
  algorithms,
  credentialsRequired: false,
  secret: JWT_SECRET,
  getToken,
};

export default jwtConfig;
