import type {
  PlatformPolicy,
  PolicyDecision,
} from "@/types/platform-policy";

const defaultPlatformPolicy: PlatformPolicy = {
  requireApprovedKycForPortalAccess: false,
  requireApprovedKycForEventCreation: false,
  requireApprovedKycForEventPublishing: false,
  allowEventCreationForRejectedKyc: true,
  platformFeePercent: 0,
  platformFeePerTicket: 0,
  settlementCycle: "T+7",
};

export function getPlatformPolicy(): PlatformPolicy {
  return defaultPlatformPolicy;
}

export function canAccessPortal(
  kycApproved: boolean,
): PolicyDecision {
  const policy = getPlatformPolicy();

  if (
    policy.requireApprovedKycForPortalAccess &&
    !kycApproved
  ) {
    return {
      allowed: false,
      reason: "Approved KYC is required for portal access.",
      code: "KYC_REQUIRED",
    };
  }

  return {
    allowed: true,
  };
}

export function canCreateEvent(
  kycApproved: boolean,
): PolicyDecision {
  const policy = getPlatformPolicy();

  if (
    !kycApproved &&
    !policy.allowEventCreationForRejectedKyc &&
    policy.requireApprovedKycForEventCreation
  ) {
    return {
      allowed: false,
      reason: "KYC approval is required before creating events.",
      code: "KYC_REQUIRED",
    };
  }

  return {
    allowed: true,
  };
}

export function canPublishEvent(
  kycApproved: boolean,
): PolicyDecision {
  const policy = getPlatformPolicy();

  if (
    policy.requireApprovedKycForEventPublishing &&
    !kycApproved
  ) {
    return {
      allowed: false,
      reason: "Approved KYC is required before publishing events.",
      code: "KYC_REQUIRED",
    };
  }

  return {
    allowed: true,
  };
}

export function calculatePlatformFee(
  ticketAmount: number,
  quantity = 1,
): number {
  const policy = getPlatformPolicy();

  const percentageFee =
    ticketAmount *
    quantity *
    (policy.platformFeePercent / 100);

  const fixedFee =
    policy.platformFeePerTicket * quantity;

  return percentageFee + fixedFee;
}