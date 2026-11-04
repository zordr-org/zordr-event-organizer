"use client";

import { useCallback } from "react";
import { create } from "zustand";

type Errors = Record<string, string>;
type Draft = {
  values: Record<string, string>;
  errors: Errors;
  setValue: (key: string, value: string) => void;
  setErrors: (next: Errors | ((current: Errors) => Errors)) => void;
};

// Keep the draft through step-page remounts without persisting payout details
// to browser storage. File objects are retained by the upload store separately.
export const useOnboardingDraft = create<Draft>((set) => ({
  values: {},
  errors: {},
  setValue: (key, value) => set((state) => ({ values: { ...state.values, [key]: value } })),
  setErrors: (next) => set((state) => ({ errors: typeof next === "function" ? next(state.errors) : next })),
}));

export function useOnboardingValue(key: string, initial: string): [string, (value: string) => void] {
  const value = useOnboardingDraft((state) => state.values[key] ?? initial);
  const setValue = useOnboardingDraft((state) => state.setValue);
  const update = useCallback((next: string) => setValue(key, next), [key, setValue]);
  return [value, update];
}
