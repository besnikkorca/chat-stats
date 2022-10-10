import { useState } from 'react';
import UserContext from './UserContext';
import type { Children } from 'types/global';
import { User } from 'types/user';

type Props = {
  children: Children;
};

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User>(null);
  const [initialized, setInitialized] = useState(false);
  const [expirationToken, setExpirationToken] = useState<string | null>(null);

  return (
    <UserContext.Provider
      value={{ user, setUser, expirationToken, setExpirationToken, initialized, setInitialized }}
    >
      {children}
    </UserContext.Provider>
  );
}
