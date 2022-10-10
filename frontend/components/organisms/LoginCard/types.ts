import type { GenericVoidFunc } from 'types/global';

export type Props = {
  email: string;
  password: string;
  setEmail: GenericVoidFunc;
  setPassword: GenericVoidFunc;
  onLogin: GenericVoidFunc;
};
