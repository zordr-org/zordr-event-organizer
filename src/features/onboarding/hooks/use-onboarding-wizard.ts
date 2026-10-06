"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

export const ONBOARDING_STEP_COUNT = 5;

export function getOnboardingStepPath(step: number) {
  const safeStep = Math.min(
    Math.max(Math.trunc(step), 1),
    ONBOARDING_STEP_COUNT,
  );

  return `/onboarding/${safeStep}`;
}

export function useOnboardingWizard(currentStep: number) {
  const router = useRouter();

  const step = Math.min(
    Math.max(Math.trunc(currentStep), 1),
    ONBOARDING_STEP_COUNT,
  );

  const canGoPrevious = step > 1;
  const canGoNext = step < ONBOARDING_STEP_COUNT;
  const isReviewStep = step === ONBOARDING_STEP_COUNT;

  const goToStep = useCallback(
    (targetStep: number) => {
      router.push(getOnboardingStepPath(targetStep));
    },
    [router],
  );

  const nextStep = useCallback(() => {
    if (canGoNext) {
      goToStep(step + 1);
    }
  }, [canGoNext, goToStep, step]);

  const previousStep = useCallback(() => {
    if (canGoPrevious) {
      goToStep(step - 1);
    }
  }, [canGoPrevious, goToStep, step]);

  const progress = useMemo(
    () => Math.round((step / ONBOARDING_STEP_COUNT) * 100),
    [step],
  );

  return {
    step,
    progress,
    canGoPrevious,
    canGoNext,
    isReviewStep,
    goToStep,
    nextStep,
    previousStep,
  };
}