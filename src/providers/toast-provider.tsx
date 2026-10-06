"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ToastVariant = "success" | "error" | "info";

type ToastItem = {
  id: number;
  message: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  showToast: (
    message: string,
    variant?: ToastVariant,
  ) => void;
  dismissToast: (id: number) => void;
};

const ToastContext =
  createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast must be used inside ToastProvider.",
    );
  }

  return context;
}

type ToastProviderProps = {
  children: ReactNode;
};

export default function ToastProvider({
  children,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) =>
      current.filter((toast) => toast.id !== id),
    );
  }, []);

  const showToast = useCallback(
    (
      message: string,
      variant: ToastVariant = "info",
    ) => {
      const id = Date.now() + Math.floor(Math.random() * 1000);

      setToasts((current) => [
        ...current,
        {
          id,
          message,
          variant,
        },
      ]);

      window.setTimeout(() => {
        dismissToast(id);
      }, 3500);
    },
    [dismissToast],
  );

  const value = useMemo(
    () => ({
      showToast,
      dismissToast,
    }),
    [dismissToast, showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-3"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-lg"
          >
            <div className="flex items-start gap-3">
              <span
                className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                  toast.variant === "success"
                    ? "bg-emerald-500"
                    : toast.variant === "error"
                      ? "bg-red-500"
                      : "bg-blue-500"
                }`}
              />

              <p className="min-w-0 flex-1 text-slate-700">
                {toast.message}
              </p>

              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="shrink-0 text-slate-400 hover:text-slate-700"
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}