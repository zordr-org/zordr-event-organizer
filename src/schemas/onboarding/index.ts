import { z } from "zod";

export const organizationDetailsSchema = z.object({
  organizationName: z
    .string()
    .trim()
    .min(2, "Organization name is required."),

  organizationType: z
    .string()
    .trim()
    .min(1, "Organization type is required."),

  contactName: z.string().trim().min(2, "Your full name is required."),
  logoUrl: z.string().min(1, "Organization logo is required."),
});

export const contactAddressSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]+$/, "Enter a valid contact number.")
    .refine((value) => { const digits = value.replace(/\D/g, ""); return digits.length >= 10 && digits.length <= 15; }, "Enter a valid contact number."),

  website: z.string().optional(),
  instagram: z.string().optional(),

  address: z
    .string()
    .trim()
    .min(2, "Address is required."),

  city: z
    .string()
    .trim()
    .min(2, "City is required."),

  state: z
    .string()
    .trim()
    .min(2, "State is required."),

  pincode: z
    .string()
    .trim()
    .regex(/^[1-9]\d{5}$/, "Enter a valid six-digit pincode."),

  mapsLink: z.string().optional(),
});

export const payoutDetailsSchema = z.object({
  accountHolder: z
    .string()
    .trim()
    .min(2, "Account holder name is required."),

  accountNumber: z
    .string()
    .trim()
    .transform((value) => value.replace(/\s/g, ""))
    .pipe(z.string().regex(/^\d{9,18}$/, "Enter an account number containing 9–18 digits.")),

  confirmAccountNumber: z
    .string()
    .trim()
    .transform((value) => value.replace(/\s/g, ""))
    .pipe(z.string().regex(/^\d{9,18}$/, "Confirm your account number using 9–18 digits.")),

  ifsc: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Enter a valid 11-character IFSC code."),

  bankName: z
    .string()
    .trim()
    .min(2, "Bank name is required."),

  branchName: z
    .string()
    .trim()
    .min(2, "Branch name is required."),

  upiId: z.string().trim().refine((value) => !value || /^[a-zA-Z0-9._-]+@[a-zA-Z][a-zA-Z0-9.-]+$/.test(value), "Enter a valid UPI ID (e.g. name@okaxis).").optional(),
}).refine(
  (data) =>
    data.accountNumber === data.confirmAccountNumber,
  {
    path: ["confirmAccountNumber"],
    message: "Account numbers do not match.",
  }
);

export const reviewSubmitSchema = z.object({
  acceptedTerms: z.boolean().refine(
    (value) => value === true,
    {
      message: "You must accept the Terms and Privacy Policy.",
    }
  ),
});

export type OrganizationDetailsInput = z.infer<
  typeof organizationDetailsSchema
>;

export type ContactAddressInput = z.infer<
  typeof contactAddressSchema
>;

export type PayoutDetailsInput = z.infer<
  typeof payoutDetailsSchema
>;

export type ReviewSubmitInput = z.infer<
  typeof reviewSubmitSchema
>;
