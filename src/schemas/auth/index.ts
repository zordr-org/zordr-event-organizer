import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters."),

  confirmPassword: z
    .string()
    .min(6, "Please confirm your new password."),
}).refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  }
);

export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<
  typeof forgotPasswordSchema
>;
