"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import {
  PhoneInput,
  defaultCountries,
} from "react-international-phone";
import "react-international-phone/style.css";

import {
  loginWithPassword,
  sendOtp,
  startSignup,
} from "@/services/auth.service";

type Mode =
  | "login"
  | "signup";

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

  const [phone, setPhone] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleModeChange = (
    nextMode: Mode,
  ) => {
    setMode(nextMode);
    setError("");
  };

  const handleLogin = async () => {
    setError("");
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

  const handleCreateAccount = () => {
    setError("");

    const signupResult =
      startSignup(
        email,
        password,
        confirmPassword,
        phone,
      );

    if (!signupResult.success) {
      setError(
        signupResult.message ??
          "Unable to create your account.",
      );
      return;
    }

    const otpResult =
      sendOtp(phone);

    if (!otpResult.success) {
      setError(
        otpResult.message ??
          "Unable to send OTP.",
      );
      return;
    }

    router.push("/verify-otp");
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (mode === "login") {
      void handleLogin();
      return;
    }

    handleCreateAccount();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-6"
    >
      {/* MODE SWITCH */}
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

      {/* =========================
          RETURNING ORGANIZER
      ========================= */}

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
                }}
                placeholder="Enter your password"
                className="h-[58px] w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#20a974] focus:ring-4 focus:ring-emerald-100"
              />
            </div>
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

      {/* =========================
          NEW ORGANIZER
      ========================= */}

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

          <div>
            <label
              htmlFor="signup-mobile"
              className="mb-2 block text-sm font-semibold text-slate-900"
            >
              Mobile Number
            </label>

            <div
              className={`zordr-phone-wrapper w-full ${
                error
                  ? "zordr-phone-error"
                  : ""
              }`}
            >
              <PhoneInput
                defaultCountry="in"
                countries={
                  defaultCountries
                }
                value={phone}
                onChange={(value) => {
                  setPhone(value);
                  setError("");
                }}
                inputProps={{
                  id: "signup-mobile",
                  name: "signup-mobile",
                  type: "tel",
                  autoComplete:
                    "tel",
                  placeholder:
                    "Enter your mobile number",
                }}
                className="zordr-phone-input"
              />
            </div>
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
              Create Account & Send OTP
            </span>

            <ArrowRight size={21} />
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
                Your email and password are
                created first. Your mobile number
                is then verified using a 6-digit OTP.
              </p>
            </div>
          </div>
        </>
      )}
    </form>
  );
}