import {
  ArrowRight,
  BarChart3,
  Heart,
  LockKeyhole,
  Quote,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

import LoginForm from "@/features/auth/login-form";

const features = [
  {
    icon: Zap,
    title: "Easy Event Setup",
    description: "Create and publish in minutes",
  },
  {
    icon: Users,
    title: "Reach More Attendees",
    description: "Built for colleges, communities and local events",
  },
  {
    icon: BarChart3,
    title: "Real-time Insights",
    description: "Track registrations, revenue and engagement",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description: "Trusted payments and protected data",
  },
];

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f7f9fa] p-3 sm:p-4">
      <div className="mx-auto grid min-h-[calc(100vh-24px)] max-w-[1500px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
        
        {/* =========================================================
            LEFT PANEL
        ========================================================= */}
        <section className="relative min-h-[760px] overflow-hidden bg-[#07151d] text-white">
          
          {/* Temporary visual background.
              Replace this with the official Zordr event image
              when the team provides it. */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(70,92,120,0.35),transparent_35%),linear-gradient(135deg,#07151d_0%,#101d29_45%,#241d28_100%)]" />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10 flex h-full min-h-[760px] flex-col px-8 py-8 sm:px-12 sm:py-10 lg:px-16">
            
            {/* Logo / portal */}
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[46px] font-black leading-none tracking-[-3px]">
                  <span className="text-[#32d99c]">Z</span>
                  <span className="text-white">ordr</span>
                </div>

                <p className="mt-1 text-sm text-slate-300">
                  Events. Experiences. Together.
                </p>
              </div>

              <div className="mt-2 hidden items-center gap-4 sm:flex">
                <div className="h-px w-9 bg-slate-400" />
                <span className="text-sm text-slate-200">
                  Organizer Portal
                </span>
              </div>
            </div>

            {/* Hero */}
            <div className="mt-16 max-w-[470px]">
              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
                Turn Your
                <br />
                Events Into
                <br />
                <span className="text-[#49dfa8]">Unforgettable</span>
                <br />
                Experiences
              </h1>

              <p className="mt-5 max-w-[430px] text-lg leading-7 text-slate-200">
                Create, manage, and grow your events with Zordr.
                A simple, powerful platform built for organizers.
              </p>
            </div>

            {/* Features */}
            <div className="mt-10 space-y-6">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="flex items-center gap-5"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 ring-1 ring-emerald-300/10">
                      <Icon
                        size={30}
                        className="text-[#4be0aa]"
                        strokeWidth={2}
                      />
                    </div>

                    <div>
                      <h2 className="text-base font-bold text-white">
                        {feature.title}
                      </h2>

                      <p className="mt-1 max-w-[270px] text-sm leading-5 text-slate-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quote */}
            <div className="mt-auto pt-12">
              <div className="flex gap-3">
                <Quote
                  size={28}
                  className="shrink-0 text-[#38c994]"
                  fill="currentColor"
                />

                <div>
                  <p className="font-serif text-lg italic leading-7 text-slate-200">
                    Great events don&apos;t just happen.
                    <br />
                    They&apos;re built.
                  </p>

                  <p className="mt-3 text-sm text-slate-300">
                    — Team Zordr
                  </p>
                </div>
              </div>

              {/* Bottom indicators */}
              <div className="mt-14 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="h-1 w-7 rounded-full bg-[#4be0aa]" />
                  <span className="h-1 w-7 rounded-full bg-slate-500" />
                  <span className="h-1 w-7 rounded-full bg-slate-500" />
                </div>

                <div className="hidden items-center gap-3 text-sm text-slate-300 sm:flex">
                  <span>Warangal</span>
                  <ArrowRight size={16} />
                  <span>Wider</span>
                  <ArrowRight size={16} />
                  <span>Bigger</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            RIGHT PANEL
        ========================================================= */}
        <section className="relative flex min-h-[760px] flex-col bg-white">
          
          {/* Contact */}
          <div className="flex justify-end px-7 py-8 sm:px-10 lg:px-14">
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">
                New to Zordr?
              </span>

              <button
                type="button"
                className="rounded-lg border border-[#42b98d] px-5 py-2.5 text-sm font-medium text-[#229b6f] transition hover:bg-emerald-50"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Login card */}
          <div className="flex flex-1 items-center justify-center px-6 pb-10 sm:px-10 lg:px-14">
            <div className="w-full max-w-[560px]">
              
              <div className="rounded-[22px] border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] sm:p-10">
                
                {/* Heading */}
                <div className="mb-9">
                  <p className="text-sm font-bold tracking-wide text-[#20a974]">
                    ORGANIZER LOGIN
                  </p>

                  <h2 className="mt-7 text-4xl font-bold tracking-[-1.5px] text-slate-950 sm:text-[42px]">
                    Welcome Back!
                  </h2>

                  <p className="mt-3 max-w-[430px] text-lg leading-7 text-slate-500">
                    Login to your organizer account to manage
                    your events.
                  </p>
                </div>

                <LoginForm />
              </div>
            </div>
          </div>

          {/* Bottom benefits */}
          <div className="px-8 pb-8 sm:px-12 lg:px-16 lg:pb-12">
            <div className="mx-auto grid max-w-[600px] grid-cols-3 gap-4">
              
              <div className="text-center">
                <LockKeyhole
                  className="mx-auto"
                  size={31}
                  strokeWidth={1.8}
                />

                <h3 className="mt-3 text-sm font-semibold text-slate-900">
                  Secure
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Your data is safe
                  <br />
                  with us
                </p>
              </div>

              <div className="text-center">
                <Zap
                  className="mx-auto"
                  size={31}
                  strokeWidth={1.8}
                />

                <h3 className="mt-3 text-sm font-semibold text-slate-900">
                  Fast
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Login in seconds
                </p>
              </div>

              <div className="text-center">
                <Heart
                  className="mx-auto"
                  size={31}
                  strokeWidth={1.8}
                />

                <h3 className="mt-3 text-sm font-semibold text-slate-900">
                  Trusted
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Used by event
                  <br />
                  organizers across
                  <br />
                  Warangal
                </p>
              </div>

            </div>
          </div>
        </section>
      </div>
    </main>
  );
}