"use client";

import type { ReactNode } from "react";

import AuthGuardProvider from "./auth-guard-provider";
import QueryProvider from "./query-provider";
import ToastProvider from "./toast-provider";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({
  children,
}: ProvidersProps) {
  return (
    <QueryProvider>
      <AuthGuardProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </AuthGuardProvider>
    </QueryProvider>
  );
}