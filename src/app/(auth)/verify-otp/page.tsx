"use client";

import {
  ArrowLeft,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
} from "react";

import {
  completeOtpSignup,
  sendOtp,
  verifyOtp,
} from "@/services/auth.service";

export default function VerifyOtpPage() {
  const router = useRouter();

  const [otp, setOtp] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [error, setError] =
    useState("");

  const [countdown, setCountdown] =
    useState(30);

  const [verifying, setVerifying] =
    useState(false);

  useEffect(() => {
    const savedMobile =
      sessionStorage.getItem(
        "zordrPendingPhone",
      ) ??
      sessionStorage.getItem(
        "organizerMobile",
      );

    if (savedMobile) {
      setMobile(savedMobile);
    }
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setCountdown(
        (previous) =>
          previous - 1,
      );
    }, 1000);

    return () =>
      clearInterval(timer);
  }, [countdown]);

  const handleOtpChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value =
      event.target.value
        .replace(/\D/g, "")
        .slice(0, 6);

    setOtp(value);
    setError("");
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError(
        "Please enter the 6-digit OTP.",
      );
      return;
    }

    setVerifying(true);
    setError("");

    try {
      const result =
        verifyOtp(otp);

      if (!result.success) {
        setError(
          result.message ??
            "OTP verification failed.",
        );
        return;
      }

      const accountResult =
        await completeOtpSignup();

      if (!accountResult.success) {
        setError(
          accountResult.message ??
            "Unable to create your organizer account.",
        );
        return;
      }

      router.push(
        "/onboarding/onboarding",
      );
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = () => {
    if (countdown > 0) {
      return;
    }

    const result =
      sendOtp(mobile);

    if (!result.success) {
      setError(
        result.message ??
          "Unable to resend OTP.",
      );
      return;
    }

    setOtp("");
    setError("");
    setCountdown(30);
  };

  const formattedMobile = mobile
    ? mobile.startsWith("+91")
      ? mobile
      : `+91 ${mobile}`
    : "+91 XXXXX XXXXX";

  return (
    <main className="min-h-screen bg-[#f7f9fa] p-3 sm:p-4">
      <div className="mx-auto grid min-h-[calc(100vh-24px)] max-w-[1500px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
        {/* LEFT PANEL */}
        <section className="relative hidden min-h-[760px] overflow-hidden bg-[#07151d] text-white lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(70,92,120,0.35),transparent_35%),linear-gradient(135deg,#07151d_0%,#101d29_45%,#241d28_100%)]" />

          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10 flex h-full min-h-[760px] flex-col px-12 py-10 xl:px-16">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[46px] font-black leading-none tracking-[-3px]">
                  <span className="text-[#32d99c]">
                    Z
                  </span>

                  <span className="text-white">
                    ordr
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-300">
                  Events. Experiences.
                  Together.
                </p>
              </div>

              <div className="mt-2 flex items-center gap-4">
                <div className="h-px w-9 bg-slate-400" />

                <span className="text-sm text-slate-200">
                  Organizer Portal
                </span>
              </div>
            </div>

            <div className="mt-24 max-w-[480px]">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/10 ring-1 ring-emerald-300/20">
                <ShieldCheck
                  size={32}
                  className="text-[#4be0aa]"
                  strokeWidth={1.8}
                />
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
                Create Your
                <br />
                Organizer
                <br />
                <span className="text-[#49dfa8]">
                  Account.
                </span>
              </h1>

              <p className="mt-6 max-w-[430px] text-lg leading-7 text-slate-300">
                Verify your mobile number
                to securely activate your
                Zordr organizer account.
              </p>
            </div>

            <div className="mt-auto">
              <div className="flex gap-2">
                <span className="h-1 w-7 rounded-full bg-[#4be0aa]" />
                <span className="h-1 w-7 rounded-full bg-slate-500" />
                <span className="h-1 w-7 rounded-full bg-slate-500" />
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <section className="relative flex min-h-[760px] flex-col bg-white">
          <div className="flex justify-end px-7 py-8 sm:px-10 lg:px-14">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <LockKeyhole size={16} />
              <span>
                Secure Verification
              </span>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center px-6 pb-14 sm:px-10 lg:px-14">
            <div className="w-full max-w-[560px]">
              <div className="rounded-[22px] border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] sm:p-10">
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      "/login",
                    )
                  }
                  className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#20a974]"
                >
                  <ArrowLeft size={18} />
                  Back to account setup
                </button>

                <div>
                  <p className="text-sm font-bold tracking-wide text-[#20a974]">
                    VERIFY MOBILE
                  </p>

                  <h1 className="mt-5 text-4xl font-bold tracking-[-1.5px] text-slate-950 sm:text-[42px]">
                    Check your phone
                  </h1>

                  <p className="mt-3 text-lg leading-7 text-slate-500">
                    We&apos;ve sent a 6-digit
                    verification code to
                  </p>

                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {formattedMobile}
                  </p>
                </div>

                <div className="mt-9">
                  <label
                    htmlFor="otp"
                    className="mb-3 block text-sm font-semibold text-slate-800"
                  >
                    Enter OTP
                  </label>

                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={otp}
                    onChange={
                      handleOtpChange
                    }
                    onKeyDown={(event) => {
                      if (
                        event.key ===
                        "Enter"
                      ) {
                        void handleVerify();
                      }
                    }}
                    placeholder="••••••"
                    className={`h-16 w-full rounded-xl border bg-white px-5 text-center text-3xl font-semibold tracking-[14px] text-slate-900 outline-none transition placeholder:text-slate-300 focus:ring-4 ${
                      error
                        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-300 focus:border-[#20a974] focus:ring-emerald-100"
                    }`}
                  />

                  {error && (
                    <p className="mt-2 text-sm font-medium text-red-500">
                      {error}
                    </p>
                  )}
                </div>

                <div className="mt-5 text-center text-sm text-slate-500">
                  Didn&apos;t receive the code?{" "}
                  {countdown > 0 ? (
                    <span className="font-medium text-slate-400">
                      Resend in{" "}
                      {countdown}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={
                        handleResend
                      }
                      className="font-semibold text-[#20a974] hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    void handleVerify()
                  }
                  disabled={
                    otp.length !== 6 ||
                    verifying
                  }
                  className="mt-8 flex h-14 w-full items-center justify-center rounded-xl bg-[#20b27a] text-base font-semibold text-white shadow-sm transition hover:bg-[#189b69] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {verifying
                    ? "Verifying..."
                    : "Verify & Continue"}
                </button>

                <div className="mt-7 flex items-start gap-3 rounded-xl bg-[#f5faf8] p-4">
                  <ShieldCheck
                    size={20}
                    className="mt-0.5 shrink-0 text-[#20b27a]"
                  />

                  <p className="text-sm leading-5 text-slate-500">
                    Your verification code is
                    private and should not be
                    shared with anyone.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 pb-8 text-center">
            <p className="text-xs text-slate-400">
              © Zordr · Events.
              Experiences. Together.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}