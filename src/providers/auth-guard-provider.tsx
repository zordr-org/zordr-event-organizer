"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

import { useAuthStore } from "@/stores/auth-store";

type AuthGuardProviderProps = {
  children: ReactNode;
};

export default function AuthGuardProvider({
  children,
}: AuthGuardProviderProps) {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <>{children}</>;
}