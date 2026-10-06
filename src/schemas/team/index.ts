import { z } from "zod";

export const teamRoleSchema = z.enum([
  "Owner",
  "Team Member",
  "Event Manager",
  "Scanner Operator",
  "Finance Viewer",
]);

export const teamMemberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is required."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  role: teamRoleSchema,

  eventIds: z.array(z.string()).default([]),
});

export const teamInviteSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  role: teamRoleSchema,

  eventIds: z.array(z.string()).default([]),
});

export type TeamMemberInput = z.infer<
  typeof teamMemberSchema
>;

export type TeamInviteInput = z.infer<
  typeof teamInviteSchema
>;
