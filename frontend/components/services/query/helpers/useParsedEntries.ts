import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useAPIsDataPaginated from 'services/query/helpers/useAPIsDataPaginated';
import useScrollToBottomAction from 'services/query/helpers/useScrollToBottomAction';
import { APIEntry } from 'types/api';
import useDebounce from 'utils/useDebounce';
import useEditAPIData from './useEditAPIData';

export default function useParsedEntries() {
  const { data, fetchNextPage } = useAPIsDataPaginated();
  const entries = data?.pages.reduce((acc, page) => [...acc, ...page], []) || [];
  useScrollToBottomAction(document, fetchNextPage, 100);

  const headers = useMemo(() => (entries.length > 0 ? Object.keys(entries[0]) : []), [entries]);
  const parsedEntries: APIEntry[] = useMemo(() => {
    return entries.map((entry) => {
      const keys = Object.keys(entry) as (keyof APIEntry)[];

      return keys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: typeof entry[key] === 'object' ? JSON.stringify(entry[key]) : entry[key],
        }),
        {} as APIEntry
      );
    });
  }, [entries]);

  const [active, setActive] = useState<APIEntry | null>(null);
  const ref = useRef<NodeJS.Timeout | null>(null);
  const editAPIData = useEditAPIData();

  const handleEdit = (header: keyof APIEntry) => (value: string) => {
    if (!active) return;
    const newActive = { ...active, [header]: value };
    setActive(newActive);

    if (ref.current) clearTimeout(ref.current);
    ref.current = setTimeout(() => editAPIData.mutate(newActive), 2000);
  };

  const handleSetActive = (id: string) => {
    const found = parsedEntries.find((entry) => entry.id === id);
    if (!found) return;

    const entry = active?.id === found.id ? null : { ...found } || null;
    setActive(entry);
  };

  return { active, setActive: handleSetActive, headers, entries, parsedEntries, handleEdit };
}
