"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  HelpCircle,
  LayoutDashboard,
  QrCode,
  Settings,
  Wallet,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { routes } from "@/config/routes";
import { getOrganizer } from "@/services/settings.service";

const navigation = [
  {
    label: "Dashboard",
    href: routes.dashboard,
    icon: LayoutDashboard,
  },
  {
    label: "Events",
    href: routes.events.root,
    icon: CalendarDays,
  },
  {
    label: "Scanner",
    href: routes.scanner,
    icon: QrCode,
  },
  {
    label: "Settlements",
    href: routes.settlements,
    icon: Wallet,
  },
  {
    label: "Settings",
    href: routes.settings,
    icon: Settings,
  },
];

function isNavigationActive(
  pathname: string,
  href: string,
): boolean {
  if (href === routes.dashboard) {
    return pathname === href;
  }

  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const organizer = getOrganizer();

  return (
    <aside className="hidden w-[244px] shrink-0 border-r border-[#e8edf0] bg-white lg:flex lg:flex-col">
      {/* Logo */}
      <div className="px-8 pb-8 pt-7">
        <div className="flex items-center">
          <span className="text-[39px] font-black leading-none tracking-[-3px] text-[#21bb80]">
            Z
          </span>

          <span className="text-[39px] font-black leading-none tracking-[-3px] text-[#111827]">
            ordr
          </span>
        </div>

        <p className="mt-1 text-[12px] text-[#4b5b73]">
          Events. Experiences. Together.
        </p>
      </div>

      {/* Organizer */}
      <div className="mx-4 mb-7 rounded-xl bg-[#f0faf6] p-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#111c2b] text-sm font-bold text-white">
            KC
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#172033]">
              {organizer.name}
            </p>

            <p className="mt-0.5 text-xs text-[#718096]">
              Organizer
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <div className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isNavigationActive(
              pathname,
              item.href,
            );

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group flex items-center gap-4 rounded-xl px-4 py-3.5 text-[15px] font-medium transition ${
                  active
                    ? "bg-[#e6f8f1] text-[#0baa70]"
                    : "text-[#53627a] hover:bg-[#f5f8f8] hover:text-[#172033]"
                }`}
              >
                <Icon
                  size={21}
                  strokeWidth={
                    active ? 2.3 : 1.9
                  }
                />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Help */}
      <div className="p-6">
        <div className="rounded-xl bg-[#f1faf6] p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0baa70] shadow-sm">
            <HelpCircle size={20} />
          </div>

          <p className="mt-3 text-sm font-bold text-[#172033]">
            Need help?
          </p>

          <p className="mt-1 text-xs leading-5 text-[#66758b]">
            Our team is here to help you succeed.
          </p>

          <button
            type="button"
            onClick={() =>
              alert(
                "Support contact will be available soon.",
              )
            }
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#079866] underline underline-offset-2"
          >
            Contact Support
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </aside>
  );
}