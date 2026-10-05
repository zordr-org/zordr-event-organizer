export type OnboardingStepDefinition = {
  number: number;
  title: string;
  description?: string;
  optional?: boolean;
};

export const onboardingSteps: OnboardingStepDefinition[] = [
  {
    number: 1,
    title: "Organization Details",
  },
  {
    number: 2,
    title: "Contact & Address",
  },
  {
    number: 3,
    title: "Payout Details",
  },
  {
    number: 4,
    title: "Documents",
    description: "Optional",
    optional: true,
  },
  {
    number: 5,
    title: "Review & Submit",
  },
];

export const getOnboardingStep = (stepNumber: number) =>
  onboardingSteps.find((step) => step.number === stepNumber);