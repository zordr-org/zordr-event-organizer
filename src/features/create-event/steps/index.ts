export type CreateEventStepId =
  | "basic-info"
  | "venue"
  | "schedule"
  | "media"
  | "tickets"
  | "registration"
  | "publish";

export type CreateEventStep = {
  number: number;
  id: CreateEventStepId;
  title: string;
  description: string;
};

export const CREATE_EVENT_STEPS: CreateEventStep[] = [
  {
    number: 1,
    id: "basic-info",
    title: "Basic Info",
    description: "Name, description, category",
  },
  {
    number: 2,
    id: "venue",
    title: "Venue",
    description: "Location and mode",
  },
  {
    number: 3,
    id: "schedule",
    title: "Schedule",
    description: "Date and time",
  },
  {
    number: 4,
    id: "media",
    title: "Media",
    description: "Images and banner",
  },
  {
    number: 5,
    id: "tickets",
    title: "Tickets",
    description: "Ticket types and pricing",
  },
  {
    number: 6,
    id: "registration",
    title: "Registration",
    description: "Attendee information",
  },
  {
    number: 7,
    id: "publish",
    title: "Publish",
    description: "Review and go live",
  },
];
