import { useQuery } from 'react-query';
import { APIEntry } from 'types/api';

export default function useAPIData(id: number | string) {
  return useQuery<APIEntry>(
    [process.env.NEXT_PUBLIC_API, 'apis', id],
    ({ signal }) =>
      fetch(`${process.env.NEXT_PUBLIC_API}/apis/${id}`, { signal }).then((res) => res.json()),
    {
      staleTime: 1000 * 60 * 5,
    }
  );
}
