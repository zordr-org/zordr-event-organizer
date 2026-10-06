export const queryKeys = {
  all: ["zordr"] as const,

  auth: {
    all: ["zordr", "auth"] as const,
    user: () => [
      "zordr",
      "auth",
      "user",
    ] as const,
  },

  dashboard: {
    all: ["zordr", "dashboard"] as const,
    overview: () => [
      "zordr",
      "dashboard",
      "overview",
    ] as const,
    stats: () => [
      "zordr",
      "dashboard",
      "stats",
    ] as const,
    activity: () => [
      "zordr",
      "dashboard",
      "activity",
    ] as const,
    upcomingEvents: () => [
      "zordr",
      "dashboard",
      "upcoming-events",
    ] as const,
    notifications: () => [
      "zordr",
      "dashboard",
      "notifications",
    ] as const,
  },

  events: {
    all: ["zordr", "events"] as const,

    list: () => [
      "zordr",
      "events",
      "list",
    ] as const,

    detail: (eventId: string) => [
      "zordr",
      "events",
      "detail",
      eventId,
    ] as const,
  },

  orders: {
    all: ["zordr", "orders"] as const,

    list: (eventId: string) => [
      "zordr",
      "orders",
      "list",
      eventId,
    ] as const,

    detail: (
      eventId: string,
      orderId: string,
    ) => [
      "zordr",
      "orders",
      "detail",
      eventId,
      orderId,
    ] as const,
  },

  scanner: {
    all: ["zordr", "scanner"] as const,

    stats: (eventId: string) => [
      "zordr",
      "scanner",
      "stats",
      eventId,
    ] as const,

    recent: () => [
      "zordr",
      "scanner",
      "recent",
    ] as const,
  },

  settlements: {
    all: ["zordr", "settlements"] as const,

    transactions: () => [
      "zordr",
      "settlements",
      "transactions",
    ] as const,

    history: () => [
      "zordr",
      "settlements",
      "history",
    ] as const,

    invoices: () => [
      "zordr",
      "settlements",
      "invoices",
    ] as const,
  },

  settings: {
    all: ["zordr", "settings"] as const,

    organizer: () => [
      "zordr",
      "settings",
      "organizer",
    ] as const,
  },

  analytics: {
    all: ["zordr", "analytics"] as const,

    overview: () => [
      "zordr",
      "analytics",
      "overview",
    ] as const,

    event: (eventId: string) => [
      "zordr",
      "analytics",
      "event",
      eventId,
    ] as const,
  },

  onboarding: {
    all: ["zordr", "onboarding"] as const,

    status: () => [
      "zordr",
      "onboarding",
      "status",
    ] as const,

    data: () => [
      "zordr",
      "onboarding",
      "data",
    ] as const,
  },
};