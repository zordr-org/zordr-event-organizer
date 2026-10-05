"use client";

import {
  useCallback,
  useMemo,
} from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export function useUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  );

  const getParam = useCallback(
    (key: string) => params.get(key),
    [params],
  );

  const setParam = useCallback(
    (key: string, value: string) => {
      const nextParams = new URLSearchParams(
        searchParams.toString(),
      );

      nextParams.set(key, value);

      const query = nextParams.toString();

      router.replace(
        query
          ? `${pathname}?${query}`
          : pathname,
        { scroll: false },
      );
    },
    [pathname, router, searchParams],
  );

  const removeParam = useCallback(
    (key: string) => {
      const nextParams = new URLSearchParams(
        searchParams.toString(),
      );

      nextParams.delete(key);

      const query = nextParams.toString();

      router.replace(
        query
          ? `${pathname}?${query}`
          : pathname,
        { scroll: false },
      );
    },
    [pathname, router, searchParams],
  );

  return {
    params,
    getParam,
    setParam,
    removeParam,
  };
}