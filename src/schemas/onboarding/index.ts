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

  logoUrl: z.string().optional(),
});

export const contactAddressSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  phone: z
    .string()
    .trim()
    .min(10, "Contact number is required."),

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
    .min(6, "Valid pincode is required."),

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
    .min(5, "Account number is required."),

  confirmAccountNumber: z
    .string()
    .trim()
    .min(5, "Please confirm the account number."),

  ifsc: z
    .string()
    .trim()
    .min(11, "Valid IFSC code is required.")
    .max(11, "Valid IFSC code is required."),

  bankName: z
    .string()
    .trim()
    .min(2, "Bank name is required."),

  branchName: z
    .string()
    .trim()
    .min(2, "Branch name is required."),

  upiId: z.string().optional(),
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
