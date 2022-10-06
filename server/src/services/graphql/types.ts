import { Response } from 'express';
import { Message, MessageMetaData } from 'app/models/Message';
import User from 'app/models/User';
import AuthToken from 'utils/AuthToken';
import Password from 'utils/Password';

export interface Context {
  res: Response;
  user: User | null;
  models: { User: typeof User; Message: typeof Message; MessageMetaData: typeof MessageMetaData };
  Password: typeof Password;
  AuthToken: typeof AuthToken;
}
