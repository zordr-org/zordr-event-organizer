export const env = {
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  appUrl:
    process.env.NEXT_PUBLIC_APP_URL ?? "",
  nodeEnv:
    process.env.NODE_ENV ?? "development",
  isDevelopment:
    process.env.NODE_ENV !== "production",
  isProduction:
    process.env.NODE_ENV === "production",
} as const;