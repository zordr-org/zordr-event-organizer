"use client";

import { useCallback, useState } from "react";

export const CREATE_EVENT_STEP_COUNT = 7;

export function useCreateEventWizard(
  initialStep = 1,
) {
  const [activeStep, setActiveStep] =
    useState(() =>
      Math.min(
        CREATE_EVENT_STEP_COUNT,
        Math.max(1, initialStep),
      ),
    );

  const openStep = useCallback(
    (step: number) => {
      setActiveStep(
        Math.min(
          CREATE_EVENT_STEP_COUNT,
          Math.max(1, step),
        ),
      );
    },
    [],
  );

  const nextStep = useCallback(() => {
    setActiveStep((current) =>
      Math.min(
        CREATE_EVENT_STEP_COUNT,
        current + 1,
      ),
    );
  }, []);

  const previousStep = useCallback(() => {
    setActiveStep((current) =>
      Math.max(1, current - 1),
    );
  }, []);

  return {
    activeStep,
    setActiveStep,
    openStep,
    nextStep,
    previousStep,
  };
}
