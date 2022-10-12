import { useQuery } from 'react-query';
import { APIEntry } from 'types/api';
import { ONE_MINUTE } from 'utils/time';
import { defaultApis } from '../defaultData';

export default function useAPIsData() {
  const apisData = useQuery<APIEntry[]>(
    [process.env.NEXT_PUBLIC_API, 'apis'],
    ({ signal }) =>
      fetch(`${process.env.NEXT_PUBLIC_API}/apis`, { signal }).then((res) => res.json()),
    {
      staleTime: ONE_MINUTE,
      placeholderData: defaultApis,
    }
  );

  return apisData;
}
