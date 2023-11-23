import { useEffect, useState } from "react";

export function useDebounce<T>(defaultValue: T, ms: number) {
  const [input, setInput] = useState(defaultValue);
  const [debounce, setDebounce] = useState(defaultValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(input);
    }, ms);

    return () => clearTimeout(handler);
  }, [input, ms]);

  return {input, setInput, debounce} as const;
}
