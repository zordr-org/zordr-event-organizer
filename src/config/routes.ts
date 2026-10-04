export const routes = {
  home: "/",

  login: "/login",

  verifyOtp: "/verify-otp",

  onboarding: {
    root: "/onboarding/onboarding",
    step: (step: number) =>
      `/onboarding/onboarding/${step}`,
    status: "/onboarding/status",
  },

  dashboard: "/dashboard",

  events: {
    root: "/events",
    new: "/events/new",

    view: (eventId: string) =>
      `/events/${eventId}`,

    edit: (
      eventId: string,
      step = 1,
    ) =>
      `/events/${eventId}/edit/${step}`,
  },

  orders: "/orders",

  scanner: "/scanner",

  analytics: "/analytics",

  settlements: "/settlements",

  settings: "/settings",
} as const;