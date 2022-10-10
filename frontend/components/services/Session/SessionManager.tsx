import Spinner from 'atoms/Spinner';
import { Props } from './types';
import useGetUserDetails from './hooks/useGetUserDetails';

export default function SessionManager({ children }: Props): JSX.Element {
  const showLoader = useGetUserDetails();

  if (showLoader) return <Spinner />;

  return <>{children}</>;
}
