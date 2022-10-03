import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';

export default class AuthToken {
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  private constructor() {}

  static create(userId: number) {
    return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1h' });
  }
}
