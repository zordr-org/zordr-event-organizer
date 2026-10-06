export type SessionStatus =
  | "active"
  | "expired"
  | "logged-out";

export type UserSession = {
  id: string;

  userId: string;

  token?: string;

  status: SessionStatus;

  createdAt: string;
  expiresAt?: string;

  lastActivityAt?: string;
};