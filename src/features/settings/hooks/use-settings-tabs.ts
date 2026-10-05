"use client";

import { useCallback, useState } from "react";

export function useSettingsTabs<T extends string>(
  initialTab: T,
) {
  const [activeTab, setActiveTab] = useState<T>(initialTab);

  const selectTab = useCallback((tab: T) => {
    setActiveTab(tab);
  }, []);

  return {
    activeTab,
    selectTab,
  };
}
