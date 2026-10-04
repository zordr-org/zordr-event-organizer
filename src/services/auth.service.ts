import type {
  AuthResponse,
  AuthUser,
} from "@/types/auth";

const AUTH_KEY = "isAuthenticated";
const USER_KEY = "zordrUser";
const ACCOUNTS_KEY = "zordrOrganizerAccounts";

const PENDING_EMAIL_KEY = "zordrPendingEmail";
const PENDING_PASSWORD_KEY = "zordrPendingPassword";
const PENDING_PHONE_KEY = "zordrPendingPhone";
const OTP_VERIFIED_KEY = "zordrOtpVerified";

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

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 10) {
    return `+91${digits}`;
  }

  if (
    digits.length === 12 &&
    digits.startsWith("91")
  ) {
    return `+${digits}`;
  }

  if (
    digits.length === 13 &&
    digits.startsWith("91")
  ) {
    return `+${digits.slice(0, 12)}`;
  }

  return phone.trim();
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

function getPendingPhone(): string {
  if (!isBrowser()) {
    return "";
  }

  return (
    sessionStorage.getItem(
      PENDING_PHONE_KEY,
    ) ?? ""
  );
}

function clearPendingSignup(): void {
  if (!isBrowser()) {
    return;
  }

  sessionStorage.removeItem(
    PENDING_EMAIL_KEY,
  );

  sessionStorage.removeItem(
    PENDING_PASSWORD_KEY,
  );

  sessionStorage.removeItem(
    PENDING_PHONE_KEY,
  );

  sessionStorage.removeItem(
    OTP_VERIFIED_KEY,
  );
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
 * Starts the new-organizer signup flow.
 *
 * Email + password are entered first.
 * They are temporarily kept in sessionStorage until
 * mobile OTP verification is completed.
 */
export function startSignup(
  email: string,
  password: string,
  confirmPassword: string,
  phone: string,
): AuthResponse {
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

  if (password.length < 6) {
    return {
      success: false,
      message:
        "Password must be at least 6 characters.",
    };
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message:
        "Passwords do not match.",
    };
  }

  if (!phone.trim()) {
    return {
      success: false,
      message:
        "Mobile number is required.",
    };
  }

  const normalizedPhone =
    normalizePhone(phone);

  const phoneDigits =
    normalizedPhone.replace(
      /\D/g,
      "",
    );

  if (
    phoneDigits.length !== 12 ||
    !phoneDigits.startsWith("91")
  ) {
    return {
      success: false,
      message:
        "Please enter a valid Indian mobile number.",
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

  const existingEmail =
    accounts.find(
      (account) =>
        account.email.toLowerCase() ===
        normalizedEmail,
    );

  if (existingEmail) {
    return {
      success: false,
      message:
        "An organizer account already exists with this email. Please sign in instead.",
    };
  }

  const existingPhone =
    accounts.find(
      (account) =>
        normalizePhone(account.phone) ===
        normalizedPhone,
    );

  if (existingPhone) {
    return {
      success: false,
      message:
        "An organizer account already exists for this mobile number.",
    };
  }

  sessionStorage.setItem(
    PENDING_EMAIL_KEY,
    normalizedEmail,
  );

  sessionStorage.setItem(
    PENDING_PASSWORD_KEY,
    password,
  );

  sessionStorage.setItem(
    PENDING_PHONE_KEY,
    normalizedPhone,
  );

  sessionStorage.setItem(
    "organizerMobile",
    normalizedPhone,
  );

  sessionStorage.removeItem(
    OTP_VERIFIED_KEY,
  );

  return {
    success: true,
    message:
      "Your details are saved. Verify your mobile number to continue.",
  };
}

export function sendOtp(
  phone: string,
): AuthResponse {
  if (!phone.trim()) {
    return {
      success: false,
      message:
        "Mobile number is required.",
    };
  }

  const normalizedPhone =
    normalizePhone(phone);

  const digits =
    normalizedPhone.replace(
      /\D/g,
      "",
    );

  if (
    digits.length !== 12 ||
    !digits.startsWith("91")
  ) {
    return {
      success: false,
      message:
        "Please enter a valid Indian mobile number.",
    };
  }

  if (!isBrowser()) {
    return {
      success: false,
      message:
        "Authentication is unavailable.",
    };
  }

  sessionStorage.setItem(
    PENDING_PHONE_KEY,
    normalizedPhone,
  );

  sessionStorage.setItem(
    "organizerMobile",
    normalizedPhone,
  );

  return {
    success: true,
    message:
      `OTP sent to ${normalizedPhone}.`,
  };
}

export function verifyOtp(
  otp: string,
): AuthResponse {
  if (!/^\d{6}$/.test(otp)) {
    return {
      success: false,
      message:
        "Please enter the 6-digit OTP.",
    };
  }

  if (!isBrowser()) {
    return {
      success: false,
      message:
        "Authentication is unavailable.",
    };
  }

  const pendingEmail =
    sessionStorage.getItem(
      PENDING_EMAIL_KEY,
    );

  const pendingPassword =
    sessionStorage.getItem(
      PENDING_PASSWORD_KEY,
    );

  const pendingPhone =
    getPendingPhone();

  if (
    !pendingEmail ||
    !pendingPassword ||
    !pendingPhone
  ) {
    return {
      success: false,
      message:
        "Your signup session has expired. Please start the account creation process again.",
    };
  }

  sessionStorage.setItem(
    OTP_VERIFIED_KEY,
    "true",
  );

  return {
    success: true,
    message:
      "Mobile number verified successfully.",
  };
}

export async function completeOtpSignup(): Promise<AuthResponse> {
  if (!isBrowser()) {
    return {
      success: false,
      message:
        "Authentication is unavailable.",
    };
  }

  const otpVerified =
    sessionStorage.getItem(
      OTP_VERIFIED_KEY,
    ) === "true";

  if (!otpVerified) {
    return {
      success: false,
      message:
        "Please verify your mobile number first.",
    };
  }

  const email =
    sessionStorage.getItem(
      PENDING_EMAIL_KEY,
    );

  const password =
    sessionStorage.getItem(
      PENDING_PASSWORD_KEY,
    );

  const phone =
    sessionStorage.getItem(
      PENDING_PHONE_KEY,
    );

  if (
    !email ||
    !password ||
    !phone
  ) {
    return {
      success: false,
      message:
        "Your signup session has expired. Please start again.",
    };
  }

  const accounts = getAccounts();

  const existingEmail =
    accounts.find(
      (account) =>
        account.email.toLowerCase() ===
        email.toLowerCase(),
    );

  if (existingEmail) {
    clearPendingSignup();

    return {
      success: false,
      message:
        "An organizer account already exists with this email.",
    };
  }

  const existingPhone =
    accounts.find(
      (account) =>
        normalizePhone(account.phone) ===
        normalizePhone(phone),
    );

  if (existingPhone) {
    clearPendingSignup();

    return {
      success: false,
      message:
        "An organizer account already exists for this mobile number.",
    };
  }

  const passwordHash =
    await hashPassword(password);

  const account: OrganizerAccount = {
    id: `USR-${Date.now()}`,
    name: "Organizer",
    email: email.toLowerCase(),
    phone: normalizePhone(phone),
    passwordHash,
    onboardingCompleted: false,
    onboardingStatus: "Draft",
  };

  accounts.push(account);
  saveAccounts(accounts);

  clearPendingSignup();

  sessionStorage.setItem(
    "onboardingPhone",
    account.phone,
  );

  sessionStorage.setItem(
    "onboardingEmail",
    account.email,
  );

  return {
    success: true,
    message:
      "Organizer account created successfully.",
    user: {
      id: account.id,
      name: account.name,
      email: account.email,
      phone: account.phone,
      role: "organizer",
      isAuthenticated: false,
    },
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