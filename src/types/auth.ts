export type AuthMethod = "password";

export type UserRole =
  | "organizer"
  | "admin"
  | "hr"
  | "employee";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  isAuthenticated: boolean;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthResponse = {
  success: boolean;
  message: string;
  user?: AuthUser;
  token?: string;
};