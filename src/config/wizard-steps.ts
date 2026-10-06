export type WizardStep = {
  step: number;
  title: string;
  description: string;
};

export const eventWizardSteps: WizardStep[] = [
  {
    step: 1,
    title: "Basic Details",
    description:
      "Set your event name, category and description.",
  },

  {
    step: 2,
    title: "Date & Time",
    description:
      "Configure when your event starts and ends.",
  },

  {
    step: 3,
    title: "Venue",
    description:
      "Add the event venue and location details.",
  },

  {
    step: 4,
    title: "Media",
    description:
      "Upload your event banner and media.",
  },

  {
    step: 5,
    title: "Tickets",
    description:
      "Configure tickets, pricing and capacity.",
  },

  {
    step: 6,
    title: "Registration",
    description:
      "Configure individual or team registration.",
  },

  {
    step: 7,
    title: "Review & Publish",
    description:
      "Review your event and publish it.",
  },
];

export function getWizardStep(
  step: number,
): WizardStep | undefined {
  return eventWizardSteps.find(
    (item) => item.step === step,
  );
}

export function isValidWizardStep(
  step: number,
): boolean {
  return eventWizardSteps.some(
    (item) => item.step === step,
  );
}