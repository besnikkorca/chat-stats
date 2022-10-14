import { useState, useEffect } from 'react';

export default function useDebounce<T>(value: T, delay: number) {
  const [val, setVal] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setVal(value);
    }, delay);

    return () => {
      if (handler) clearTimeout(handler);
    };
  }, [value, delay]);

  return val;
}
