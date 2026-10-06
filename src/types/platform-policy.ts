export type KycStatus =
  | "Draft"
  | "Submitted"
  | "Under Review"
  | "Approved"
  | "Rejected";

export type PlatformPolicy = {
  requireApprovedKycForPortalAccess: boolean;

  requireApprovedKycForEventCreation: boolean;

  requireApprovedKycForEventPublishing: boolean;

  allowEventCreationForRejectedKyc: boolean;

  platformFeePercent: number;

  platformFeePerTicket: number;

  settlementCycle: string;
};

export type PolicyDecision = {
  allowed: boolean;

  reason?: string;

  code?:
    | "KYC_REQUIRED"
    | "KYC_REJECTED"
    | "PERMISSION_DENIED"
    | "POLICY_BLOCKED";
};
