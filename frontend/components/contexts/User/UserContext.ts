import { createContext } from 'react';
import { UserContextType } from 'types/user';

// Could have stored it in redux too, but based on my subjective opinion I think redux should be
// reserved for more complex buisness logic rather than simple assignment to make full use of the
export default createContext<UserContextType>({
  initialized: false,
  setInitialized: () => {},
  user: null,
  setUser: () => null,
  expirationToken: null,
  setExpirationToken: () => null,
});
