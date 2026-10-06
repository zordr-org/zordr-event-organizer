"use client";

import { useMemo } from "react";
import type {
  KycStatus,
  PolicyDecision,
} from "@/types/platform-policy";
import {
  canAccessPortal,
  canCreateEvent,
  canPublishEvent,
} from "@/services/platform.service";

export type KycGuardAction =
  | "portal"
  | "create-event"
  | "publish-event";

export function useKycGuard(
  status: KycStatus,
  action: KycGuardAction,
) {
  const kycApproved = status === "Approved";

  const decision: PolicyDecision = useMemo(() => {
    switch (action) {
      case "portal":
        return canAccessPortal(kycApproved);

      case "create-event":
        return canCreateEvent(kycApproved);

      case "publish-event":
        return canPublishEvent(kycApproved);
    }
  }, [action, kycApproved]);

  return {
    kycApproved,
    allowed: decision.allowed,
    decision,
    requiresKyc:
      decision.code === "KYC_REQUIRED",
  };
}