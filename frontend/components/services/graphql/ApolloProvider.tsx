import { ApolloProvider as Provider } from '@apollo/client';
import type { Children } from 'types/global';
import client from './client';

type Props = {
  children: Children;
};

export default function ApolloProvider({ children }: Props): JSX.Element {
  return <Provider client={client}>{children}</Provider>;
}
