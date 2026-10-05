"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import {
  forgotPassword,
  loginWithPassword,
  startSignup,
} from "@/services/auth.service";

type Mode =
  | "login"
  | "signup"
  | "forgot";

export default function LoginForm() {
  const router = useRouter();

  const [mode, setMode] =
    useState<Mode>("login");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleModeChange = (
    nextMode: Mode,
  ) => {
    setMode(nextMode);
    setError("");
    setMessage("");
  };

  const handleLogin = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const result =
        await loginWithPassword(
          email,
          password,
        );

      if (!result.success) {
        setError(
          result.message ??
            "Unable to login.",
        );
        return;
      }

      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount =
    async () => {
      setError("");
      setMessage("");
      setLoading(true);

      try {
        const result =
          await startSignup(
            email,
            password,
            confirmPassword,
          );

        if (!result.success) {
          setError(
            result.message ??
              "Unable to create your account.",
          );
          return;
        }

        router.push(
          "/onboarding",
        );
      } finally {
        setLoading(false);
      }
    };

  const handleForgotPassword =
    async () => {
      setError("");
      setMessage("");
      setLoading(true);

      try {
        const result =
          await forgotPassword(
            email,
            password,
            confirmPassword,
          );

        if (!result.success) {
          setError(
            result.message ??
              "Unable to reset your password.",
          );
          return;
        }

        setPassword("");
        setConfirmPassword("");
        setMode("login");
        setMessage(
          "Password updated successfully. Please sign in.",
        );
      } finally {
        setLoading(false);
      }
    };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (mode === "login") {
      void handleLogin();
      return;
    }

    if (mode === "signup") {
      void handleCreateAccount();
      return;
    }

    void handleForgotPassword();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-6"
    >
      {mode !== "forgot" && (
        <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() =>
              handleModeChange("login")
            }
            className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
              mode === "login"
                ? "bg-white text-[#20a974] shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() =>
              handleModeChange("signup")
            }
            className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
              mode === "signup"
                ? "bg-white text-[#20a974] shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Create Account
          </button>
        </div>
      )}

      {mode === "forgot" && (
        <button
          type="button"
          onClick={() =>
            handleModeChange("login")
          }
          className="text-sm font-semibold text-[#20a974] hover:underline"
        >
          Back to Sign In
        </button>
      )}

      {mode === "login" && (
        <>
          <div>
            <label
              htmlFor="login-email"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              Email Address
            </label>

            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(
                  event.target.value,
                );
                setError("");
                setMessage("");
              }}
              placeholder="Enter your organizer email"
              className="h-[58px] w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#20a974] focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => {
                  setPassword(
                    event.target.value,
                  );
                  setError("");
                  setMessage("");
                }}
                placeholder="Enter your password"
                className="h-[58px] w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#20a974] focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                handleModeChange("forgot")
              }
              className="mt-3 text-sm font-semibold text-[#20a974] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {message && (
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {message}
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex h-[60px] w-full items-center justify-center gap-3 rounded-2xl bg-[#25ad7a] text-base font-semibold text-white shadow-sm transition hover:bg-[#209d6e] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span>
              {loading
                ? "Signing In..."
                : "Sign In"}
            </span>

            {!loading && (
              <ArrowRight size={21} />
            )}
          </button>

          <div className="flex w-full gap-4 rounded-2xl bg-[#eef5f4] p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d8f5e9] text-[#20aa77]">
              <ShieldCheck size={25} />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900">
                Returning Organizer
              </h3>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                Use the email and password
                you created when setting up
                your organizer account.
              </p>
            </div>
          </div>
        </>
      )}

      {mode === "signup" && (
        <>
          <div>
            <label
              htmlFor="signup-email"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              Email Address
            </label>

            <input
              id="signup-email"
              name="signup-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(
                  event.target.value,
                );
                setError("");
              }}
              placeholder="Enter your organizer email"
              className="h-[56px] w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#20a974] focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              Create Password
            </label>

            <input
              id="signup-password"
              name="signup-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => {
                setPassword(
                  event.target.value,
                );
                setError("");
              }}
              placeholder="At least 6 characters"
              className="h-[56px] w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#20a974] focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label
              htmlFor="signup-confirm-password"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              Confirm Password
            </label>

            <input
              id="signup-confirm-password"
              name="signup-confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(
                  event.target.value,
                );
                setError("");
              }}
              placeholder="Re-enter your password"
              className="h-[56px] w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#20a974] focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex h-[60px] w-full items-center justify-center gap-3 rounded-2xl bg-[#25ad7a] text-base font-semibold text-white shadow-sm transition hover:bg-[#209d6e] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span>
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </span>

            {!loading && (
              <ArrowRight size={21} />
            )}
          </button>

          <div className="flex w-full gap-4 rounded-2xl bg-[#eef5f4] p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d8f5e9] text-[#20aa77]">
              <ShieldCheck size={25} />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900">
                Secure Account Setup
              </h3>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                Your organizer account is
                created using your email and
                password, then you can continue
                with onboarding.
              </p>
            </div>
          </div>
        </>
      )}

      {mode === "forgot" && (
        <>
          <div>
            <p className="text-sm font-bold tracking-wide text-[#20a974]">
              PASSWORD RESET
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              Reset your password
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Enter your organizer email and
              choose a new password.
            </p>
          </div>

          <div>
            <label
              htmlFor="forgot-email"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              Email Address
            </label>

            <input
              id="forgot-email"
              name="forgot-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(
                  event.target.value,
                );
                setError("");
                setMessage("");
              }}
              placeholder="Enter your organizer email"
              className="h-[56px] w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#20a974] focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label
              htmlFor="forgot-new-password"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              New Password
            </label>

            <input
              id="forgot-new-password"
              name="forgot-new-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => {
                setPassword(
                  event.target.value,
                );
                setError("");
              }}
              placeholder="At least 6 characters"
              className="h-[56px] w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#20a974] focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label
              htmlFor="forgot-confirm-password"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              Confirm New Password
            </label>

            <input
              id="forgot-confirm-password"
              name="forgot-confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(
                  event.target.value,
                );
                setError("");
              }}
              placeholder="Re-enter your new password"
              className="h-[56px] w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#20a974] focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex h-[60px] w-full items-center justify-center gap-3 rounded-2xl bg-[#25ad7a] text-base font-semibold text-white shadow-sm transition hover:bg-[#209d6e] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span>
              {loading
                ? "Updating Password..."
                : "Reset Password"}
            </span>

            {!loading && (
              <ArrowRight size={21} />
            )}
          </button>
        </>
      )}
    </form>
  );
}