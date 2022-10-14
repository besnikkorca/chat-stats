import { useMutation, useQueryClient, UseMutationResult } from 'react-query';
import { APIEntry } from 'types/api';

export default function useCreateAPIEntry() {
  const queryClient = useQueryClient();
  return useMutation(
    (entry: APIEntry) =>
      fetch(`${process.env.NEXT_PUBLIC_API}/apis`, {
        method: 'POST',
        body: JSON.stringify(entry),
      }).then((res) => res.json()),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([process.env.NEXT_PUBLIC_API, 'apis']);
      },
    }
  );
}
