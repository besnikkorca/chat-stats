import { useMutation, useQueryClient } from 'react-query';
import { APIEntry } from 'types/api';

export default function useDeleteAPIEntry() {
  const queryClient = useQueryClient();
  return useMutation(
    (entry: APIEntry) =>
      fetch(`${process.env.NEXT_PUBLIC_API}/apis/${entry.id}`, { method: 'DELETE' }).then((res) =>
        res.json()
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([process.env.NEXT_PUBLIC_API, 'apis']);
      },
    }
  );
}
