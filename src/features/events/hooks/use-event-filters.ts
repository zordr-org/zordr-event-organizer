"use client";

import { useCallback, useMemo, useState } from "react";

export type EventFilters = {
  search: string;
  status: string;
  category: string;
};

const defaultFilters: EventFilters = {
  search: "",
  status: "all",
  category: "all",
};

export function useEventFilters(initial?: Partial<EventFilters>) {
  const [filters, setFilters] = useState<EventFilters>({
    ...defaultFilters,
    ...initial,
  });

  const updateFilter = useCallback(
    <K extends keyof EventFilters>(key: K, value: EventFilters[K]) => {
      setFilters((current) => ({
        ...current,
        [key]: value,
      }));
    },
    [],
  );

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const hasActiveFilters = useMemo(
    () =>
      filters.search.trim().length > 0 ||
      filters.status !== "all" ||
      filters.category !== "all",
    [filters],
  );

  return {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
  };
}