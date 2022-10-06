import type { Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';

const ONE_HOUR = 1;

export default class AuthToken {
  token: string;

  expirationToken: Date;

  constructor(userId: number) {
    this.token = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1h' });
    // Using a lib like moment js makes it way easier to handle dates
    // but not worth importing for a single/simple use case
    const expires = new Date();
    expires.setHours(expires.getHours() + ONE_HOUR);
    this.expirationToken = expires;
  }

  getToken() {
    return this.token;
  }

  getExpirationToken() {
    return this.token;
  }

  setHttpOnlyCookies(res: Response) {
    // Setting the token in http only cookies but also returning it
    // so that if it's a browser authentication is handled automatically
    // by the http only cookies but if the api is being consumed by something
    // else it can use the returned token to consume the api
    res.cookie('zb_token', this.token, {
      httpOnly: true,
      secure: true,
      expires: this.expirationToken,
      sameSite: 'none',
    });

    res.cookie('zb_token_exp', this.expirationToken.toISOString(), {
      secure: true,
      expires: this.expirationToken,
      sameSite: 'none',
    });
  }
}
