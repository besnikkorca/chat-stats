import { QueryClientProvider as RQQueryClientProvider, QueryClient } from 'react-query';
import { Props } from './types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

export default function QueryClientProvider({ children }: Props) {
  return <RQQueryClientProvider client={queryClient}>{children}</RQQueryClientProvider>;
}
