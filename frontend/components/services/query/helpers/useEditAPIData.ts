import { useMutation, useQueryClient, InfiniteData } from 'react-query';
import { APIEntry } from 'types/api';

export default function useEditAPIData() {
  const queryClient = useQueryClient();
  return useMutation(
    (entry: APIEntry) => {
      return fetch(`${process.env.NEXT_PUBLIC_API}/apis/${entry.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      }).then((res) => res.json());
    },
    {
      onMutate: (entry) => {
        const oldEntries = queryClient.getQueryData([process.env.NEXT_PUBLIC_API, 'apis']);

        queryClient.setQueryData<InfiniteData<APIEntry[]>>(
          [process.env.NEXT_PUBLIC_API, 'apis'],
          (data) => {
            if (!data) return { pages: [], pageParams: [] };

            const pages = data.pages.map((page) =>
              page.map((oldEntry) => (oldEntry.id === entry.id ? entry : oldEntry))
            );

            return {
              ...data,
              pages,
            };
          }
        );

        return function rollback() {
          queryClient.setQueryData([process.env.NEXT_PUBLIC_API, 'apis'], () => oldEntries);
        };
      },
      onError: (err, variables, rollback) => {
        if (rollback) rollback();
      },
      onSettled: () => {
        queryClient.invalidateQueries([process.env.NEXT_PUBLIC_API, 'apis'], { exact: true });
      },
    }
  );
}
