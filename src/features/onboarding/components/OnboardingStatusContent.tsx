"use client";

import {
  CheckCircle2,
  Clock3,
  FileText,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  markOnboardingCompleted,
} from "@/services/auth.service";

export default function OnboardingStatusContent() {
  const router = useRouter();

  useEffect(() => {
    markOnboardingCompleted();
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f9fa]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[280px] shrink-0 bg-[#07151d] text-white lg:flex lg:flex-col">
          <div className="px-8 pt-9">
            <div className="text-[42px] font-black leading-none tracking-[-3px]">
              <span className="text-[#32d99c]">
                Z
              </span>

              <span className="text-white">
                ordr
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-400">
              Organizer Portal
            </p>
          </div>

          <div className="mt-16 px-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Getting Started
            </p>

            <div className="mt-6 space-y-6">
              <StatusStep
                number="1"
                title="Organization Details"
                completed
              />

              <StatusStep
                number="2"
                title="Contact & Address"
                completed
              />

              <StatusStep
                number="3"
                title="Payout Details"
                completed
              />

              <StatusStep
                number="4"
                title="Documents"
                completed
              />

              <StatusStep
                number="5"
                title="Review & Submit"
                active
              />
            </div>
          </div>

          <div className="mt-auto px-8 pb-8">
            <p className="text-xs leading-5 text-slate-500">
              Complete your organizer profile
              to start creating and managing
              events.
            </p>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col bg-white">
          <header className="border-b border-slate-200 px-6 py-5 sm:px-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#20a974]">
                  ORGANIZER ONBOARDING
                </p>

                <h1 className="mt-1 text-xl font-bold text-[#182143]">
                  Application Status
                </h1>
              </div>

              <span className="hidden text-sm text-slate-500 sm:block">
                Step 5 of 5
              </span>
            </div>
          </header>

          <div className="flex flex-1 items-center justify-center px-5 py-12 sm:px-10">
            <div className="w-full max-w-[700px]">
              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.05)] sm:p-10">
                <div className="flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e5f9f1]">
                    <Clock3
                      size={38}
                      strokeWidth={1.8}
                      className="text-[#16b978]"
                    />
                  </div>
                </div>

                <div className="mt-7 text-center">
                  <h2 className="text-3xl font-bold tracking-[-0.8px] text-[#182143]">
                    Application Under Review
                  </h2>

                  <p className="mx-auto mt-3 max-w-[530px] text-base leading-6 text-[#64749a]">
                    Your organizer application has
                    been submitted successfully and
                    is currently being reviewed.
                  </p>
                </div>

                <div className="mt-8 rounded-xl border border-[#bcebd9] bg-[#f2fcf8] p-5">
                  <div className="flex items-start gap-4">
                    <CheckCircle2
                      size={23}
                      className="mt-0.5 shrink-0 text-[#16b978]"
                    />

                    <div>
                      <p className="font-semibold text-[#182143]">
                        Application submitted
                      </p>

                      <p className="mt-1 text-sm leading-5 text-[#64749a]">
                        We have received your
                        organizer details and
                        documents.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-sm font-bold text-[#182143]">
                    Onboarding Progress
                  </p>

                  <div className="mt-4 space-y-3">
                    <ProgressRow
                      icon={
                        <CheckCircle2
                          size={18}
                        />
                      }
                      title="Organization details"
                    />

                    <ProgressRow
                      icon={
                        <CheckCircle2
                          size={18}
                        />
                      }
                      title="Contact & address"
                    />

                    <ProgressRow
                      icon={
                        <CheckCircle2
                          size={18}
                        />
                      }
                      title="Payout details"
                    />

                    <ProgressRow
                      icon={
                        <CheckCircle2
                          size={18}
                        />
                      }
                      title="Documents"
                    />

                    <ProgressRow
                      icon={
                        <Clock3 size={18} />
                      }
                      title="Application review"
                      pending
                    />
                  </div>
                </div>

                <div className="mt-8 rounded-xl bg-[#f7f9fc] p-4">
                  <div className="flex gap-3">
                    <FileText
                      size={19}
                      className="mt-0.5 shrink-0 text-[#536b9d]"
                    />

                    <p className="text-sm leading-5 text-[#64749a]">
                      Your organizer account setup is
                      complete. You can return to the
                      login page and sign in using the
                      email and password you created.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    router.push("/login")
                  }
                  className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#20b27a] text-sm font-semibold text-white transition hover:bg-[#189b69]"
                >
                  Back to Login
                  <ArrowRight size={17} />
                </button>
              </div>

              <p className="mt-6 text-center text-xs text-slate-400">
                Zordr Â· Events.
                Experiences. Together.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatusStep({
  number,
  title,
  completed = false,
  active = false,
}: {
  number: string;
  title: string;
  completed?: boolean;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
          completed
            ? "bg-[#20b27a] text-white"
            : active
              ? "border border-[#20b27a] text-[#20b27a]"
              : "border border-slate-600 text-slate-500"
        }`}
      >
        {completed ? "âœ“" : number}
      </div>

      <span
        className={`text-sm ${
          active
            ? "font-semibold text-white"
            : completed
              ? "text-slate-300"
              : "text-slate-500"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

function ProgressRow({
  icon,
  title,
  pending = false,
}: {
  icon: React.ReactNode;
  title: string;
  pending?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-100 px-4 py-3">
      <span
        className={
          pending
            ? "text-[#f0a43c]"
            : "text-[#16b978]"
        }
      >
        {icon}
      </span>

      <span className="text-sm font-medium text-[#354466]">
        {title}
      </span>

      <span className="ml-auto text-xs font-semibold">
        {pending ? (
          <span className="text-[#d68b20]">
            Pending
          </span>
        ) : (
          <span className="text-[#16b978]">
            Completed
          </span>
        )}
      </span>
    </div>
  );
}