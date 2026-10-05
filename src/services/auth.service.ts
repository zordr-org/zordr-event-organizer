import type {
  AuthResponse,
  AuthUser,
} from "@/types/auth";

const AUTH_KEY = "isAuthenticated";
const USER_KEY = "zordrUser";
const ACCOUNTS_KEY = "zordrOrganizerAccounts";


type OrganizerAccount = {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  onboardingCompleted: boolean;
  onboardingStatus:
    | "Draft"
    | "Submitted"
    | "Under Review"
    | "Approved"
    | "Rejected";
};

type StoredAccounts = OrganizerAccount[];

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function getAccounts(): StoredAccounts {
  if (!isBrowser()) {
    return [];
  }

  const stored = localStorage.getItem(
    ACCOUNTS_KEY,
  );

  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed as StoredAccounts;
  } catch {
    return [];
  }
}

function saveAccounts(
  accounts: StoredAccounts,
): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(
    ACCOUNTS_KEY,
    JSON.stringify(accounts),
  );
}

async function hashPassword(
  password: string,
): Promise<string> {
  if (!isBrowser()) {
    return "";
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  const digest =
    await window.crypto.subtle.digest(
      "SHA-256",
      data,
    );

  return Array.from(
    new Uint8Array(digest),
  )
    .map((byte) =>
      byte.toString(16).padStart(2, "0"),
    )
    .join("");
}

function setAuthenticatedUser(
  account: OrganizerAccount,
): AuthUser {
  const user: AuthUser = {
    id: account.id,
    name: account.name,
    email: account.email,
    phone: account.phone,
    role: "organizer",
    isAuthenticated: true,
  };

  localStorage.setItem(
    AUTH_KEY,
    "true",
  );

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user),
  );

  return user;
}

export function isAuthenticated(): boolean {
  if (!isBrowser()) {
    return false;
  }

  return (
    localStorage.getItem(AUTH_KEY) ===
    "true"
  );
}

export function getCurrentUser(): AuthUser | null {
  if (!isBrowser()) {
    return null;
  }

  const storedUser =
    localStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(
      storedUser,
    ) as AuthUser;
  } catch {
    return null;
  }
}

/**
 * Creates a new organizer account using email + password.
 * No phone or verification step is required.
 */
export async function startSignup(
  email: string,
  password: string,
  confirmPassword: string,
): Promise<AuthResponse> {
  if (!email.trim()) {
    return {
      success: false,
      message: "Email address is required.",
    };
  }

  if (!password.trim()) {
    return {
      success: false,
      message: "Password is required.",
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters.",
    };
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Passwords do not match.",
    };
  }

  if (!isBrowser()) {
    return {
      success: false,
      message: "Authentication is unavailable.",
    };
  }

  const accounts = getAccounts();
  const normalizedEmail = email.trim().toLowerCase();

  const existingEmail = accounts.find(
    (account) =>
      account.email.toLowerCase() === normalizedEmail,
  );

  if (existingEmail) {
    return {
      success: false,
      message:
        "An organizer account already exists with this email. Please sign in instead.",
    };
  }

  const passwordHash = await hashPassword(password);

  const account: OrganizerAccount = {
    id: `USR-${Date.now()}`,
    name: "Organizer",
    email: normalizedEmail,
    phone: "",
    passwordHash,
    onboardingCompleted: false,
    onboardingStatus: "Draft",
  };

  accounts.push(account);
  saveAccounts(accounts);

  sessionStorage.setItem(
    "onboardingEmail",
    account.email,
  );

  return {
    success: true,
    message: "Organizer account created successfully.",
    user: {
      id: account.id,
      name: account.name,
      email: account.email,
      role: "organizer",
      isAuthenticated: false,
    },
  };
}

export async function forgotPassword(
  email: string,
  newPassword: string,
  confirmPassword: string,
): Promise<AuthResponse> {
  if (!email.trim()) {
    return {
      success: false,
      message: "Email address is required.",
    };
  }

  if (!newPassword.trim()) {
    return {
      success: false,
      message: "New password is required.",
    };
  }

  if (newPassword.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters.",
    };
  }

  if (newPassword !== confirmPassword) {
    return {
      success: false,
      message: "Passwords do not match.",
    };
  }

  if (!isBrowser()) {
    return {
      success: false,
      message: "Authentication is unavailable.",
    };
  }

  const accounts = getAccounts();
  const normalizedEmail = email.trim().toLowerCase();

  const accountIndex = accounts.findIndex(
    (account) =>
      account.email.toLowerCase() === normalizedEmail,
  );

  if (accountIndex === -1) {
    return {
      success: false,
      message:
        "No organizer account was found with this email.",
    };
  }

  const passwordHash =
    await hashPassword(newPassword);

  accounts[accountIndex] = {
    ...accounts[accountIndex],
    passwordHash,
  };

  saveAccounts(accounts);

  return {
    success: true,
    message:
      "Password updated successfully. Please sign in.",
  };
}
export async function loginWithPassword(
  email: string,
  password: string,
): Promise<AuthResponse> {
  if (!email.trim()) {
    return {
      success: false,
      message:
        "Email address is required.",
    };
  }

  if (!password.trim()) {
    return {
      success: false,
      message:
        "Password is required.",
    };
  }

  if (!isBrowser()) {
    return {
      success: false,
      message:
        "Authentication is unavailable.",
    };
  }

  const accounts = getAccounts();

  const normalizedEmail =
    email.trim().toLowerCase();

  const account =
    accounts.find(
      (item) =>
        item.email.toLowerCase() ===
        normalizedEmail,
    );

  if (!account) {
    return {
      success: false,
      message:
        "No organizer account was found with this email.",
    };
  }

  const passwordHash =
    await hashPassword(password);

  if (
    passwordHash !==
    account.passwordHash
  ) {
    return {
      success: false,
      message:
        "Incorrect password.",
    };
  }

  if (!account.onboardingCompleted) {
    return {
      success: false,
      message:
        "Your organizer onboarding is not completed yet. Please finish the onboarding process first.",
    };
  }

  const user =
    setAuthenticatedUser(account);

  return {
    success: true,
    message:
      "Login successful.",
    user,
    token: "mock-zordr-token",
  };
}

export function markOnboardingCompleted(): void {
  if (!isBrowser()) {
    return;
  }

  const email =
    sessionStorage.getItem(
      "onboardingEmail",
    );

  if (!email) {
    return;
  }

  const accounts = getAccounts();

  const accountIndex =
    accounts.findIndex(
      (account) =>
        account.email.toLowerCase() ===
        email.toLowerCase(),
    );

  if (accountIndex === -1) {
    return;
  }

  accounts[accountIndex] = {
    ...accounts[accountIndex],
    onboardingCompleted: true,
    onboardingStatus: "Submitted",
  };

  saveAccounts(accounts);

  sessionStorage.removeItem(
    "onboardingEmail",
  );

  sessionStorage.removeItem(
    "onboardingPhone",
  );
}

export function logout(): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(
    AUTH_KEY,
  );

  localStorage.removeItem(
    USER_KEY,
  );
}

export function getAuthToken(): string | null {
  if (!isAuthenticated()) {
    return null;
  }

  return "mock-zordr-token";
}