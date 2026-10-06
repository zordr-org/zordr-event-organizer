import { z } from "zod";

export const eventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Event name is required."),

  category: z
    .string()
    .trim()
    .min(1, "Event category is required."),

  shortDescription: z
    .string()
    .trim()
    .min(1, "Short description is required.")
    .max(300, "Short description cannot exceed 300 characters."),

  detailedDescription: z
    .string()
    .max(2000, "Detailed description cannot exceed 2000 characters.")
    .optional(),

  eventMode: z.enum([
    "offline",
    "online",
    "hybrid",
  ]),

  startDate: z.string().min(1, "Start date is required."),
  startTime: z.string().min(1, "Start time is required."),
  endTime: z.string().min(1, "End time is required."),

  publishMode: z.enum([
    "now",
    "schedule",
    "draft",
  ]),

  publishDate: z.string().optional(),
});

export type EventInput = z.infer<typeof eventSchema>;
