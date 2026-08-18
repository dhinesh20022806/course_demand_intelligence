import { useEffect, useState } from "react";

export function useDebounce(text: string) {
  const [search, setSearch] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(text);
    }, 700);
    return () => {
      clearTimeout(timeout);
    };
  });
  return search;
}
