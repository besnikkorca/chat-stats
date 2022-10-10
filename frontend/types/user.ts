import { User as GQLUser } from 'services/graphql/generated/graphql';

export type User = GQLUser | null;

export interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  initialized: boolean;
  setInitialized: (initialized: boolean) => void;
  expirationToken: string | null;
  setExpirationToken: (token: string | null) => void;
}
