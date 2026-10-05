import { z } from "zod";

export const generalSettingsSchema = z.object({
  showAttendeeList: z.boolean().default(false),
  allowWaitlist: z.boolean().default(false),
  ageRestriction: z.boolean().default(false),
  displayTermsAndConditions: z.boolean().default(false),
});

export const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  eventUpdates: z.boolean().default(true),
  ticketNotifications: z.boolean().default(true),
  settlementNotifications: z.boolean().default(true),
});

export const securitySettingsSchema = z.object({
  sessionTimeoutMinutes: z
    .number()
    .int()
    .positive()
    .default(30),
});

export type GeneralSettingsInput = z.infer<
  typeof generalSettingsSchema
>;

export type NotificationSettingsInput = z.infer<
  typeof notificationSettingsSchema
>;

export type SecuritySettingsInput = z.infer<
  typeof securitySettingsSchema
>;
