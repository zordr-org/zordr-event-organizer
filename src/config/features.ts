export const featureFlags = {
  dashboard: true,
  events: true,
  createEvent: true,
  scanner: true,
  settlements: true,
  settings: true,
  onboarding: true,
  notifications: true,
  teamManagement: true,
  analytics: true,
  orders: true,
  offlineQueue: true,
} as const;

export type FeatureFlag =
  keyof typeof featureFlags;

export function isFeatureEnabled(
  feature: FeatureFlag,
): boolean {
  return featureFlags[feature];
}