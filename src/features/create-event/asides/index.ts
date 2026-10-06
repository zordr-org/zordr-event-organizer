export type CreateEventAside = {
  id: "stepper" | "preview";
  title: string;
};

export const CREATE_EVENT_ASIDES: CreateEventAside[] = [
  {
    id: "stepper",
    title: "Event Steps",
  },
  {
    id: "preview",
    title: "Live Preview",
  },
];
