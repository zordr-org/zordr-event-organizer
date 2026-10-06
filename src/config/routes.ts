export const routes = {
  home: "/",

  login: "/login",

  onboarding: {
    root: "/onboarding",
    step: (step: number) => `/onboarding/${step}`,
    status: "/onboarding/status",
  },

  dashboard: "/dashboard",

  events: {
    root: "/events",
    new: "/events/new",
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