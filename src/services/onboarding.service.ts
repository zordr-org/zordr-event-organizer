import type { Organizer } from "@/types/organizer";

const ONBOARDING_COMPLETED_KEY =
  "onboardingCompleted";

const ONBOARDING_DATA_KEY =
  "zordrOnboardingData";

export type OnboardingData = {
  organizationName: string;
  organizationType: string;

  contactName: string;
  email: string;
  phone: string;

  city: string;
  state: string;
  pincode: string;

  address: string;

  payoutAccountName: string;
  bankAccount: string;
  ifsc: string;

  logoName?: string;

  documents?: string[];
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getDefaultOnboardingData(): OnboardingData {
  return {
    organizationName:
      "KITSW Cultural Club",

    organizationType:
      "College Club / Student Body",

    contactName:
      "Rohit Varma",

    email:
      "rohit@kitsw.ac.in",

    phone:
      "+91 9876543210",

    city:
      "Warangal",

    state:
      "Telangana",

    pincode:
      "506015",

    address:
      "Kakatiya Institute of Technology & Science, Warangal",

    payoutAccountName:
      "KITSW Cultural Club",

    bankAccount:
      "",

    ifsc:
      "",

    logoName:
      "",

    documents:
      [],
  };
}

export function getOnboardingData(): OnboardingData {
  const defaults =
    getDefaultOnboardingData();

  if (!isBrowser()) {
    return defaults;
  }

  const stored =
    localStorage.getItem(
      ONBOARDING_DATA_KEY,
    );

  if (!stored) {
    return defaults;
  }

  try {
    const parsed =
      JSON.parse(stored) as Partial<OnboardingData>;

    return {
      ...defaults,
      ...parsed,
      documents:
        parsed.documents ??
        defaults.documents,
    };
  } catch {
    return defaults;
  }
}

export function saveOnboardingData(
  data: Partial<OnboardingData>,
): OnboardingData {
  const current =
    getOnboardingData();

  const updated: OnboardingData = {
    ...current,
    ...data,
  };

  if (isBrowser()) {
    localStorage.setItem(
      ONBOARDING_DATA_KEY,
      JSON.stringify(updated),
    );
  }

  return updated;
}

export function isOnboardingCompleted(): boolean {
  if (!isBrowser()) {
    return false;
  }

  return (
    localStorage.getItem(
      ONBOARDING_COMPLETED_KEY,
    ) === "true"
  );
}

export function completeOnboarding(
  data?: Partial<OnboardingData>,
): OnboardingData {
  const finalData = data
    ? saveOnboardingData(data)
    : getOnboardingData();

  if (isBrowser()) {
    localStorage.setItem(
      ONBOARDING_COMPLETED_KEY,
      "true",
    );
  }

  return finalData;
}

export function resetOnboarding(): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(
    ONBOARDING_COMPLETED_KEY,
  );

  localStorage.removeItem(
    ONBOARDING_DATA_KEY,
  );
}

export function getOnboardingStatus() {
  return {
    completed:
      isOnboardingCompleted(),

    data:
      getOnboardingData(),
  };
}

export function getOrganizerFromOnboarding(): Organizer {
  const data =
    getOnboardingData();

  return {
    id: "ORG-001",

    name:
      data.organizationName,

    type:
      data.organizationType,

    contactName:
      data.contactName,

    email:
      data.email,

    phone:
      data.phone,

    city:
      data.city,

    state:
      data.state,

    pincode:
      data.pincode,

    status:
      isOnboardingCompleted()
        ? "Active"
        : "Pending",
  };
}