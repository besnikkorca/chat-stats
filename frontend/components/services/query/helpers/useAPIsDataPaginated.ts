import { useInfiniteQuery } from 'react-query';
import { APIEntry } from 'types/api';

const ENTRIES_PER_PAGE = 10;

export default function useAPIsDataPaginated() {
  return useInfiniteQuery<APIEntry[]>(
    [process.env.NEXT_PUBLIC_API, 'apis'],
    ({ signal, pageParam = 1 }) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_API}/apis?page=${pageParam}&limit=${ENTRIES_PER_PAGE}`,
        {
          signal,
        }
      ).then((res) => res.json());
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return;
        return pages.length + 1;
      },
    }
  );
}
