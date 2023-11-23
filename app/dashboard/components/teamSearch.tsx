"use client";

import { useDebounce } from "@/lib/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function SearchTeams() {
  const { input, setInput, debounce } = useDebounce("", 250);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', debounce);

    router.replace(`${pathName}?${params.toString()}`);
  }, [debounce]);

  return (
    <label className="text-sm">
      <p>Search Teams</p>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search Teams"
        className="text-base border p-1 rounded-md outline-none focus-within:border-gray-600"
      ></input>
    </label>
  );
}
