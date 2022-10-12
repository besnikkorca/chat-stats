import { useEffect } from 'react';
import { GenericVoidFunc } from 'types/global';

export default function useDebounce(cb: GenericVoidFunc, delay: number) {
  useEffect(() => {
    const handler = setTimeout(() => {
      cb();
    }, delay);

    return () => {
      if (handler) clearTimeout(handler);
    };
  }, [cb, delay]);
}
