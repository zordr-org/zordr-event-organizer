"use client";

import { useMemo } from "react";
import {
  canAccessPortal,
  canCreateEvent,
  canPublishEvent,
  getPlatformPolicy,
} from "@/services/platform.service";

export function usePlatformPolicy() {
  const policy = useMemo(() => getPlatformPolicy(), []);

  return {
    policy,

    canAccessPortal: (kycApproved: boolean) =>
      canAccessPortal(kycApproved),

    canCreateEvent: (kycApproved: boolean) =>
      canCreateEvent(kycApproved),

    canPublishEvent: (kycApproved: boolean) =>
      canPublishEvent(kycApproved),
  };
}