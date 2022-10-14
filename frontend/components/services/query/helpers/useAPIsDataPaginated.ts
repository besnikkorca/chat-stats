import { useInfiniteQuery } from 'react-query';
import { APIEntry } from 'types/api';
import { ONE_MINUTE } from 'utils/time';
import { defaultApis } from '../defaultData';

const ENTRIES_PER_PAGE = 10;

export default function useAPIsDataPaginated(search: string, sortBy: keyof APIEntry | null) {
  return useInfiniteQuery<APIEntry[]>(
    [process.env.NEXT_PUBLIC_API, 'apis', { sortBy, search }],
    ({ signal, pageParam = 1 }) => {
      const paginateStr = `?page=${pageParam}&limit=${ENTRIES_PER_PAGE}`;
      const sortStr = sortBy ? `&sortBy=${sortBy}&order=desc` : '';
      const searchStr = search ? `&search=${search}` : '';

      return fetch(`${process.env.NEXT_PUBLIC_API}/apis${paginateStr}${sortStr}${searchStr}`, {
        signal,
      }).then((res) => res.json());
    },
    {
      staleTime: ONE_MINUTE,
      placeholderData: { pages: [defaultApis], pageParams: [] },
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return;
        return pages.length + 1;
      },
    }
  );
}
