import { useContext, useEffect } from 'react';
import { UserContextType } from 'types/user';
import UserContext from './UserContext';
import cookies from 'js-cookie';
import { Cookie } from 'types/cookies';

type ConvenienceProps = {
  isLoggedIn: boolean;
};

function checkIsValidToken(expirationToken: string | null) {
  if (!expirationToken) return false;
  return new Date(expirationToken) > new Date();
}

export default function useUserData(): UserContextType & ConvenienceProps {
  const userData = useContext(UserContext);
  const expirationToken = cookies.get(Cookie.token_expiration) || null;
  const isValid = checkIsValidToken(expirationToken);

  useEffect(() => {
    if (userData.expirationToken !== expirationToken) {
      userData.setExpirationToken(isValid ? expirationToken : null);
    }
  }, [isValid, userData.expirationToken, expirationToken, userData.setExpirationToken]);

  return {
    ...userData,
    isLoggedIn: !!userData.user,
    // we return expiration token from context or from the cookie
    expirationToken: userData.expirationToken || expirationToken,
  };
}
