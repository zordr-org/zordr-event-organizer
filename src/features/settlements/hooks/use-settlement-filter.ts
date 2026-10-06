"use client";

import { useCallback, useState } from "react";

export type SettlementFilter = "all" | string;

export function useSettlementFilter(
  initialFilter: SettlementFilter = "all",
) {
  const [filter, setFilter] = useState<SettlementFilter>(initialFilter);

  const selectFilter = useCallback((value: SettlementFilter) => {
    setFilter(value);
  }, []);

  const resetFilter = useCallback(() => {
    setFilter("all");
  }, []);

  return {
    filter,
    selectFilter,
    resetFilter,
  };
}