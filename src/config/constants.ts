export const APP_NAME = "Zordr Organizer";

export const APP_TAGLINE =
  "Events. Experiences. Together.";

export const DEFAULT_ORGANIZER_NAME =
  "KITSW Cultural Club";

export const DEFAULT_ORGANIZER_EMAIL =
  "rohit@kitsw.ac.in";

export const DEFAULT_ORGANIZER_PHONE =
  "+91 9876543210";

export const DEFAULT_CITY =
  "Warangal";

export const DEFAULT_STATE =
  "Telangana";

export const DEFAULT_PINCODE =
  "506015";

export const DEFAULT_PAGE_SIZE = 10;

export const MAX_PAGE_SIZE = 100;

export const OTP_LENGTH = 6;

export const SEARCH_DEBOUNCE_MS = 300;

export const TOAST_DURATION_MS = 3000;

export const LOCAL_STORAGE_KEYS = {
  AUTHENTICATED: "isAuthenticated",
  USER: "zordrUser",
  SELECTED_EVENT: "zordrSelectedEventId",
  ONBOARDING_COMPLETED:
    "onboardingCompleted",
  ONBOARDING_DATA:
    "zordrOnboardingData",
} as const;