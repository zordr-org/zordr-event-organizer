"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OtpForm() {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const savedMobile = sessionStorage.getItem("organizerMobile");

    if (savedMobile) {
      setMobile(savedMobile);
    }
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((value) => value - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setOtp(value);
    setError("");
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    // Frontend-only for now.
    // Backend OTP verification can be connected later.
    router.push("/onboarding/onboarding");
  };

  const handleResend = () => {
    if (countdown > 0) return;

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
    <div className="w-full">
      {/* Mobile number */}
      <div className="mb-6">
        <p className="text-sm text-slate-500">
          Verification code sent to
        </p>

        <p className="mt-1 text-base font-semibold text-slate-900">
          {formattedMobile}
        </p>
      </div>

      {/* OTP input */}
      <div>
        <label
          htmlFor="otp"
          className="mb-2 block text-sm font-semibold text-slate-800"
        >
          Enter OTP
        </label>

        <input
          id="otp"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          value={otp}
          onChange={handleChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleVerify();
            }
          }}
          maxLength={6}
          placeholder="Enter 6-digit OTP"
          className={`h-14 w-full rounded-xl border px-4 text-center text-xl font-semibold tracking-[8px] text-slate-900 outline-none transition placeholder:tracking-normal placeholder:text-sm placeholder:font-normal ${
            error
              ? "border-red-400 focus:ring-4 focus:ring-red-100"
              : "border-slate-300 focus:border-[#20b27a] focus:ring-4 focus:ring-emerald-100"
          }`}
        />

        {error && (
          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>

      {/* Resend */}
      <div className="mt-4 text-center text-sm text-slate-500">
        Didn&apos;t receive the code?{" "}

        {countdown > 0 ? (
          <span className="font-medium text-slate-400">
            Resend in {countdown}s
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="font-semibold text-[#20a974] hover:underline"
          >
            Resend OTP
          </button>
        )}
      </div>

      {/* Verify */}
      <button
        type="button"
        onClick={handleVerify}
        disabled={otp.length !== 6}
        className="mt-7 h-14 w-full rounded-xl bg-[#20b27a] text-base font-semibold text-white transition hover:bg-[#189b69] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Verify & Continue
      </button>

      {/* Change number */}
      <button
        type="button"
        onClick={() => router.push("/login")}
        className="mt-4 w-full text-center text-sm font-medium text-slate-500 transition hover:text-[#20a974]"
      >
        Change mobile number
      </button>
    </div>
  );
}