"use client";

import { useCallback, useState } from "react";

export function useDashboardRefresh() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => {
    setRefreshKey((current) => current + 1);
  }, []);

  return {
    refreshKey,
    refresh,
  };
}