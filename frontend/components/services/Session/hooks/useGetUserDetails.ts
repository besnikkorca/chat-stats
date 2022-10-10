import useUserData from 'contexts/User/useUserData';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMeQuery } from 'services/graphql/generated/graphql';
import { Routes } from 'types/routes';

export default function useGetUserDetails() {
  const router = useRouter();
  const { setUser, expirationToken, setInitialized } = useUserData();
  const { data, error, loading } = useMeQuery({ skip: !expirationToken });

  useEffect(() => {
    if (!expirationToken || error) {
      router.replace(Routes.login);
      setInitialized(true);
    } else if (data?.me) {
      setUser(data.me);
      setInitialized(true);
    }
  }, [expirationToken, error, router, data]);

  return loading;
}
