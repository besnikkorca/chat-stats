import Spinner from 'atoms/Spinner';
import useUserData from 'contexts/User/useUserData';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { Children } from 'types/global';
import { Routes } from 'types/routes';

type Props = {
  children: Children;
  requiresAuth: boolean;
};

export default function RouteGuard({ children, requiresAuth }: Props) {
  const { initialized, user } = useUserData();
  const router = useRouter();
  useEffect(() => {
    if (initialized) {
      if (user) {
        if (router.pathname !== Routes.home) router.replace(Routes.home);
      } else if (requiresAuth && !user) {
        if (router.pathname !== Routes.login) router.replace(Routes.login);
      }
    }
  }, [router, initialized, user]);

  if (requiresAuth && !user) return <Spinner />;

  return <>{children}</>;
}
