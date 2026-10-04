"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ExternalLink,
  HelpCircle,
  LayoutDashboard,
  MapPin,
  Plus,
  QrCode,
  ScanLine,
  Settings,
  Ticket,
  TrendingUp,
  User,
  Users,
  Wallet,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

import {
  getDashboardData,
} from "@/services/dashboard.service";

import {
  getOrganizer,
} from "@/services/settings.service";

import {
  routes,
} from "@/config/routes";

function getStatIcon(
  title: string,
): LucideIcon {
  switch (title) {
    case "Active Events":
      return CalendarDays;

    case "Tickets Sold":
      return Users;

    case "Total Revenue":
      return CircleDollarSign;

    case "Today's Check-ins":
      return QrCode;

    case "Pending Settlement":
      return Wallet;

    default:
      return CalendarDays;
  }
}

function getStatStyle(
  title: string,
): string {
  switch (title) {
    case "Tickets Sold":
      return "blue";

    case "Total Revenue":
      return "purple";

    case "Today's Check-ins":
      return "yellow";

    case "Pending Settlement":
      return "red";

    default:
      return "green";
  }
}

function getActivityIcon(
  title: string,
): LucideIcon {
  if (title.toLowerCase().includes("ticket")) {
    return Ticket;
  }

  if (title.toLowerCase().includes("check-in")) {
    return QrCode;
  }

  if (title.toLowerCase().includes("registration")) {
    return User;
  }

  if (title.toLowerCase().includes("settlement")) {
    return CircleDollarSign;
  }

  return Zap;
}

function getActivityStyle(
  title: string,
): string {
  if (title.toLowerCase().includes("check-in")) {
    return "blue";
  }

  if (title.toLowerCase().includes("registration")) {
    return "purple";
  }

  if (title.toLowerCase().includes("settlement")) {
    return "orange";
  }

  if (title.toLowerCase().includes("updated")) {
    return "gray";
  }

  return "green";
}

function getEventThumbnailStyle(
  title: string,
): string {
  if (
    title
      .toLowerCase()
      .includes("crescendo")
  ) {
    return "pink";
  }

  if (
    title
      .toLowerCase()
      .includes("tech talk")
  ) {
    return "dark";
  }

  return "blue";
}

function getQuickActionIcon(
  title: string,
): LucideIcon {
  switch (title) {
    case "Create Event":
      return Plus;

    case "View My Events":
      return Ticket;

    case "Open Scanner":
      return ScanLine;

    case "View Analytics":
      return TrendingUp;

    default:
      return Plus;
  }
}

function getQuickActionStyle(
  title: string,
): string {
  switch (title) {
    case "View My Events":
      return "blue";

    case "Open Scanner":
      return "purple";

    case "View Analytics":
      return "yellow";

    default:
      return "green";
  }
}

function getQuickActionHref(
  title: string,
): string {
  switch (title) {
    case "Create Event":
      return routes.events.new;

    case "View My Events":
      return routes.events.root;

    case "Open Scanner":
      return routes.scanner;

    case "View Analytics":
      return routes.analytics;

    default:
      return routes.events.root;
  }
}

function getStatClasses(style: string) {
  switch (style) {
    case "blue":
      return {
        card: "border-[#dce8fb] bg-gradient-to-br from-[#f7fbff] to-[#eef5ff]",
        icon: "bg-[#e5efff] text-[#1877f2]",
      };

    case "purple":
      return {
        card: "border-[#e7ddfb] bg-gradient-to-br from-[#fcf9ff] to-[#f6efff]",
        icon: "bg-[#eee2ff] text-[#7135e8]",
      };

    case "yellow":
      return {
        card: "border-[#f4e7c8] bg-gradient-to-br from-[#fffdf6] to-[#fff8e9]",
        icon: "bg-[#fff0c8] text-[#d89a00]",
      };

    case "red":
      return {
        card: "border-[#f4dce0] bg-gradient-to-br from-[#fffafa] to-[#fff2f4]",
        icon: "bg-[#ffe3e8] text-[#e33b50]",
      };

    default:
      return {
        card: "border-[#d9eee5] bg-gradient-to-br from-[#f7fffb] to-[#effaf5]",
        icon: "bg-[#ddf7eb] text-[#0ba96f]",
      };
  }
}

function getActivityIconClasses(
  style: string,
) {
  switch (style) {
    case "blue":
      return "bg-[#e8f1ff] text-[#1877f2]";

    case "purple":
      return "bg-[#f0e7ff] text-[#7338e8]";

    case "orange":
      return "bg-[#fff0d9] text-[#ed8b00]";

    case "gray":
      return "bg-[#edf1f5] text-[#708096]";

    default:
      return "bg-[#e1f8ee] text-[#0ba96f]";
  }
}

function getQuickActionClasses(
  style: string,
) {
  switch (style) {
    case "blue":
      return {
        card: "bg-[#f4f8ff] border-[#dce8fb]",
        icon: "bg-[#2679ed] text-white",
        arrow: "text-[#2679ed]",
      };

    case "purple":
      return {
        card: "bg-[#faf6ff] border-[#eadfff]",
        icon: "bg-[#7135e8] text-white",
        arrow: "text-[#7135e8]",
      };

    case "yellow":
      return {
        card: "bg-[#fffaf0] border-[#f4e6c7]",
        icon: "bg-[#f2b400] text-white",
        arrow: "text-[#c68e00]",
      };

    default:
      return {
        card: "bg-[#f2fcf7] border-[#d9eee5]",
        icon: "bg-[#0aae72] text-white",
        arrow: "text-[#0aae72]",
      };
  }
}

function EventThumbnail({
  style,
  title,
}: {
  style: string;
  title: string;
}) {
  const background =
    style === "pink"
      ? "bg-gradient-to-br from-[#46152d] via-[#b73571] to-[#ff9b4a]"
      : style === "dark"
        ? "bg-gradient-to-br from-[#101c30] via-[#234c70] to-[#6c91ac]"
        : "bg-gradient-to-br from-[#25227a] via-[#4f38cf] to-[#e24c91]";

  return (
    <div
      className={`flex h-[72px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-xl ${background}`}
      aria-label={`${title} event image`}
    >
      <div className="text-center text-white">
        <div className="mx-auto mb-1 h-6 w-6 rounded-full border-2 border-white/80" />

        <p className="text-[7px] font-bold uppercase tracking-wider">
          {style === "pink"
            ? "Festival"
            : style === "dark"
              ? "Talk"
              : "Inferno"}
        </p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [activityOpen, setActivityOpen] =
    useState(false);

  const notificationRef =
    useRef<HTMLDivElement>(null);

  const profileRef =
    useRef<HTMLDivElement>(null);

  const dashboardData =
    getDashboardData();

  const organizer =
    getOrganizer();

  const stats =
    dashboardData.stats;

  const recentActivity =
    dashboardData.recentActivity;

  const upcomingEvents =
    dashboardData.upcomingEvents;

  const quickActions =
    dashboardData.quickActions;

  const notifications =
    dashboardData.notifications;

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent,
    ) => {
      const target =
        event.target as Node;

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          target,
        )
      ) {
        setNotificationsOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(
          target,
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  const closeMenus = () => {
    setNotificationsOpen(false);
    setProfileOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#f8fafb] text-[#111827]">
      <div className="flex min-h-screen">
        {/* =========================================================
            SIDEBAR
        ========================================================= */}
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
              <Link
                href={routes.dashboard}
                className="group flex items-center gap-4 rounded-xl bg-[#e6f8f1] px-4 py-3.5 text-[15px] font-medium text-[#0baa70]"
              >
                <LayoutDashboard
                  size={21}
                  strokeWidth={2.3}
                />

                <span>Dashboard</span>
              </Link>

              <Link
                href={routes.events.root}
                className="group flex items-center gap-4 rounded-xl px-4 py-3.5 text-[15px] font-medium text-[#53627a] transition hover:bg-[#f5f8f8] hover:text-[#172033]"
              >
                <CalendarDays
                  size={21}
                  strokeWidth={1.9}
                />

                <span>Events</span>
              </Link>

              <Link
                href={routes.scanner}
                className="group flex items-center gap-4 rounded-xl px-4 py-3.5 text-[15px] font-medium text-[#53627a] transition hover:bg-[#f5f8f8] hover:text-[#172033]"
              >
                <QrCode
                  size={21}
                  strokeWidth={1.9}
                />

                <span>Scanner</span>
              </Link>

              <Link
                href={routes.settlements}
                className="group flex items-center gap-4 rounded-xl px-4 py-3.5 text-[15px] font-medium text-[#53627a] transition hover:bg-[#f5f8f8] hover:text-[#172033]"
              >
                <Wallet
                  size={21}
                  strokeWidth={1.9}
                />

                <span>Settlements</span>
              </Link>

              <Link
                href={routes.settings}
                className="group flex items-center gap-4 rounded-xl px-4 py-3.5 text-[15px] font-medium text-[#53627a] transition hover:bg-[#f5f8f8] hover:text-[#172033]"
              >
                <Settings
                  size={21}
                  strokeWidth={1.9}
                />

                <span>Settings</span>
              </Link>
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

        {/* =========================================================
            MAIN AREA
        ========================================================= */}
        <section className="min-w-0 flex-1">
          {/* Top Header */}
          <header className="flex h-[68px] items-center justify-between border-b border-[#e7ecef] bg-white px-5 sm:px-8 lg:px-10">
            <div>
              <p className="text-[12px] font-medium text-[#5d6d85]">
                Organizer Portal
              </p>

              <p className="mt-0.5 text-[13px] text-[#77859a]">
                Welcome back,{" "}
                {organizer.name}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Notification */}
              <div
                className="relative"
                ref={notificationRef}
              >
                <button
                  type="button"
                  onClick={() => {
                    setNotificationsOpen(
                      (value) => !value,
                    );

                    setProfileOpen(false);
                  }}
                  aria-label="Notifications"
                  aria-expanded={
                    notificationsOpen
                  }
                  className={`relative flex h-10 w-10 items-center justify-center rounded-full border text-[#52627a] transition ${
                    notificationsOpen
                      ? "border-[#bfe5d6] bg-[#f0faf6]"
                      : "border-[#e2e8ec] bg-white hover:bg-[#f7f9fa]"
                  }`}
                >
                  <Bell
                    size={19}
                    strokeWidth={1.8}
                  />

                  {notifications.length > 0 && (
                    <span className="absolute right-[7px] top-[7px] h-2.5 w-2.5 rounded-full bg-[#ef5350] ring-2 ring-white" />
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 top-12 z-50 w-[350px] overflow-hidden rounded-2xl border border-[#e2e8ed] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.15)]">
                    <div className="flex items-center justify-between border-b border-[#edf0f2] px-5 py-4">
                      <div>
                        <h3 className="text-sm font-bold text-[#172033]">
                          Notifications
                        </h3>

                        <p className="mt-0.5 text-[11px] text-[#7b8799]">
                          You have{" "}
                          {notifications.length}{" "}
                          new notifications
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setNotificationsOpen(
                            false,
                          )
                        }
                        className="text-[#8a96a7] hover:text-[#172033]"
                      >
                        <X size={17} />
                      </button>
                    </div>

                    <div className="divide-y divide-[#edf0f2]">
                      {notifications.map(
                        (notification) => (
                          <button
                            type="button"
                            key={`${notification.title}-${notification.time}`}
                            onClick={() =>
                              setNotificationsOpen(
                                false,
                              )
                            }
                            className="flex w-full gap-3 px-5 py-4 text-left transition hover:bg-[#f8fbfa]"
                          >
                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8f8f1] text-[#0baa70]">
                              <Bell size={16} />
                            </div>

                            <div className="min-w-0">
                              <p className="text-[13px] font-semibold text-[#172033]">
                                {
                                  notification.title
                                }
                              </p>

                              <p className="mt-1 text-[11px] leading-4 text-[#728096]">
                                {
                                  notification.description
                                }
                              </p>

                              <p className="mt-1 text-[10px] text-[#a0aaba]">
                                {
                                  notification.time
                                }
                              </p>
                            </div>
                          </button>
                        ),
                      )}
                    </div>

                    <div className="border-t border-[#edf0f2] p-3">
                      <button
                        type="button"
                        onClick={() => {
                          setNotificationsOpen(
                            false,
                          );

                          setActivityOpen(true);
                        }}
                        className="w-full rounded-lg py-2 text-xs font-semibold text-[#0a9b6a] transition hover:bg-[#effaf5]"
                      >
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div
                className="relative"
                ref={profileRef}
              >
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(
                      (value) => !value,
                    );

                    setNotificationsOpen(
                      false,
                    );
                  }}
                  aria-expanded={profileOpen}
                  className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition hover:bg-[#f6f8f9]"
                >
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#111c2b] text-xs font-bold text-white">
                    KC
                  </div>

                  <div className="hidden text-left sm:block">
                    <p className="text-[14px] font-semibold text-[#172033]">
                      {organizer.name}
                    </p>

                    <p className="text-[11px] text-[#7b8799]">
                      Organizer
                    </p>
                  </div>

                  <ChevronDown
                    size={17}
                    className={`hidden text-[#607089] transition sm:block ${
                      profileOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-12 z-50 w-[245px] overflow-hidden rounded-2xl border border-[#e2e8ed] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.15)]">
                    <div className="border-b border-[#edf0f2] px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111c2b] text-xs font-bold text-white">
                          KC
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-[#172033]">
                            {organizer.name}
                          </p>

                          <p className="mt-0.5 text-[11px] text-[#7b8799]">
                            Organizer
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2">
                      <Link
                        href={routes.settings}
                        onClick={
                          closeMenus
                        }
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#45556d] transition hover:bg-[#f5f8f8]"
                      >
                        <User size={17} />
                        Profile
                      </Link>

                      <Link
                        href={routes.settings}
                        onClick={
                          closeMenus
                        }
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#45556d] transition hover:bg-[#f5f8f8]"
                      >
                        <Settings size={17} />
                        Settings
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(
                            false,
                          );

                          alert(
                            "Logout action will be connected to authentication.",
                          );
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-[#d64b59] transition hover:bg-[#fff5f6]"
                      >
                        <ExternalLink size={17} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* =========================================================
              CONTENT
          ========================================================= */}
          <div className="mx-auto max-w-[1260px] px-5 py-7 sm:px-8 lg:px-10 lg:py-8">
            {/* Page heading */}
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-[14px] font-medium text-[#53647d]">
                  Good evening,
                </p>

                <h1 className="mt-1 text-3xl font-bold tracking-[-1.2px] text-[#101827] sm:text-[38px]">
                  Welcome back,{" "}
                  {organizer.name}!
                </h1>

                <p className="mt-1.5 text-base text-[#697991]">
                  Here&apos;s what&apos;s happening
                  with your events.
                </p>
              </div>

              <Link
                href={routes.events.new}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0db77a] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#08a96f]"
              >
                <Plus size={19} />
                Create Event
              </Link>
            </div>

            {/* =====================================================
                STATS
            ===================================================== */}
            <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {stats.map((stat) => {
                const Icon =
                  getStatIcon(
                    stat.title,
                  );

                const classes =
                  getStatClasses(
                    getStatStyle(
                      stat.title,
                    ),
                  );

                return (
                  <div
                    key={stat.title}
                    className={`rounded-2xl border p-5 ${classes.card}`}
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${classes.icon}`}
                      >
                        <Icon
                          size={21}
                          strokeWidth={1.9}
                        />
                      </div>

                      <ArrowUpRight
                        size={17}
                        className="text-[#a0acbb]"
                      />
                    </div>

                    <p className="mt-5 text-[14px] font-medium text-[#52627a]">
                      {stat.title}
                    </p>

                    <p className="mt-1 text-[29px] font-bold tracking-[-1px] text-[#111827]">
                      {stat.value}
                    </p>

                    <p
                      className={`mt-1.5 text-[13px] font-medium ${
                        getStatStyle(
                          stat.title,
                        ) === "red"
                          ? "text-[#6b7280]"
                          : "text-[#079c68]"
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* =====================================================
                RECENT ACTIVITY + UPCOMING EVENTS
            ===================================================== */}
            <div className="mt-7 grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
              {/* Recent Activity */}
              <section className="rounded-2xl border border-[#e2e8ed] bg-white">
                <div className="flex items-center justify-between border-b border-[#edf0f2] px-5 py-5 sm:px-6">
                  <div>
                    <h2 className="text-[18px] font-bold text-[#111827]">
                      Recent Activity
                    </h2>

                    <p className="mt-1 text-[13px] text-[#75839a]">
                      Latest updates from
                      your events
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setActivityOpen(true)
                    }
                    className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#079c68] underline underline-offset-2"
                  >
                    View all
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="divide-y divide-[#edf0f2]">
                  {recentActivity.map(
                    (activity) => {
                      const Icon =
                        getActivityIcon(
                          activity.title,
                        );

                      const style =
                        getActivityStyle(
                          activity.title,
                        );

                      return (
                        <button
                          type="button"
                          key={`${activity.title}-${activity.time}`}
                          onClick={() =>
                            setActivityOpen(
                              true,
                            )
                          }
                          className="flex w-full gap-4 px-5 py-4 text-left transition hover:bg-[#fafcfb] sm:px-6"
                        >
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getActivityIconClasses(
                              style,
                            )}`}
                          >
                            <Icon size={18} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col justify-between gap-1 sm:flex-row">
                              <p className="text-[14px] font-semibold text-[#1d2939]">
                                {
                                  activity.title
                                }
                              </p>

                              <span className="shrink-0 text-[11px] text-[#97a3b5]">
                                {
                                  activity.time
                                }
                              </span>
                            </div>

                            <p className="mt-1 text-[12px] text-[#748199]">
                              {
                                activity.description
                              }
                            </p>
                          </div>
                        </button>
                      );
                    },
                  )}
                </div>
              </section>

              {/* Upcoming Events */}
              <section className="rounded-2xl border border-[#e2e8ed] bg-white">
                <div className="flex items-center justify-between border-b border-[#edf0f2] px-5 py-5 sm:px-6">
                  <div>
                    <h2 className="text-[18px] font-bold text-[#111827]">
                      Upcoming Events
                    </h2>

                    <p className="mt-1 text-[13px] text-[#75839a]">
                      Your next events at
                      a glance
                    </p>
                  </div>

                  <Link
                    href={routes.events.root}
                    className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#079c68] underline underline-offset-2"
                  >
                    View all
                    <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="divide-y divide-[#edf0f2]">
                  {upcomingEvents.map(
                    (event) => {
                      const thumbnailStyle =
                        getEventThumbnailStyle(
                          event.title,
                        );

                      return (
                        <Link
                          href={
                            routes.events.root
                          }
                          key={event.title}
                          className="flex gap-4 px-5 py-4 transition hover:bg-[#fafcfb] sm:px-6"
                        >
                          <EventThumbnail
                            style={
                              thumbnailStyle
                            }
                            title={
                              event.title
                            }
                          />

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div>
                                <h3 className="text-[15px] font-bold text-[#182233]">
                                  {
                                    event.title
                                  }
                                </h3>

                                <p className="mt-1 text-[12px] text-[#738098]">
                                  {
                                    event.month
                                  }{" "}
                                  {
                                    event.date
                                  }
                                  , 2026 •{" "}
                                  {
                                    event.time
                                  }
                                </p>
                              </div>

                              <span
                                className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                                  event.status ===
                                  "On Sale"
                                    ? "bg-[#dff7eb] text-[#079c68]"
                                    : "bg-[#e9f2ff] text-[#3378d8]"
                                }`}
                              >
                                {
                                  event.status
                                }
                              </span>
                            </div>

                            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                              <span className="flex items-center gap-1.5 text-[11px] text-[#738098]">
                                <MapPin
                                  size={12}
                                />

                                {
                                  event.location
                                }
                              </span>

                              <span className="text-[12px] font-semibold text-[#182233]">
                                {
                                  event.tickets
                                }

                                <span className="ml-1 font-normal text-[#7b8799]">
                                  tickets
                                  sold
                                </span>
                              </span>
                            </div>
                          </div>

                          <ChevronRight
                            size={19}
                            className="hidden self-center text-[#718096] sm:block"
                          />
                        </Link>
                      );
                    },
                  )}
                </div>
              </section>
            </div>

            {/* =====================================================
                QUICK ACTIONS
            ===================================================== */}
            <section className="mt-7 rounded-2xl border border-[#dcefe7] bg-gradient-to-r from-[#f1fbf7] via-white to-[#f7fbff] p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-[18px] font-bold text-[#111827]">
                    Quick Actions
                  </h2>

                  <p className="mt-1 text-[13px] text-[#718098]">
                    Everything you need,
                    right here.
                  </p>
                </div>

                <div className="hidden items-center gap-2 text-[13px] text-[#52627a] sm:flex">
                  <Zap
                    size={17}
                    className="text-[#0aae72]"
                  />

                  Create. Manage. Grow.
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {quickActions.map(
                  (action) => {
                    const Icon =
                      getQuickActionIcon(
                        action.title,
                      );

                    const classes =
                      getQuickActionClasses(
                        getQuickActionStyle(
                          action.title,
                        ),
                      );

                    return (
                      <Link
                        key={action.title}
                        href={
                          action.href ||
                          getQuickActionHref(
                            action.title,
                          )
                        }
                        className={`group flex items-center gap-4 rounded-xl border p-4 transition hover:-translate-y-0.5 hover:shadow-sm ${classes.card}`}
                      >
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${classes.icon}`}
                        >
                          <Icon size={21} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-[14px] font-bold text-[#172033]">
                            {
                              action.title
                            }
                          </p>

                          <p className="mt-1 text-[11px] text-[#738098]">
                            {
                              action.description
                            }
                          </p>
                        </div>

                        <ArrowRight
                          size={18}
                          className={`${classes.arrow} transition group-hover:translate-x-1`}
                        />
                      </Link>
                    );
                  },
                )}
              </div>
            </section>

            {/* =====================================================
                HELP CARD
            ===================================================== */}
            <section className="mt-7 rounded-2xl bg-[#10272d] px-6 py-6 text-white sm:px-8">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1c4142] text-[#45d9a4]">
                    <HelpCircle size={22} />
                  </div>

                  <div>
                    <h2 className="text-[16px] font-bold">
                      Need help with your
                      events?
                    </h2>

                    <p className="mt-1 text-[12px] text-[#a9b9ba]">
                      Our support team is
                      ready to help you get
                      the most out of Zordr.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "Support contact will be available soon.",
                    )
                  }
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-white px-5 text-xs font-bold text-[#172033] transition hover:bg-[#edf5f3]"
                >
                  Contact Support
                  <ExternalLink size={14} />
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>

      {/* =========================================================
          RECENT ACTIVITY MODAL
      ========================================================= */}
      {activityOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101827]/35 px-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setActivityOpen(false);
            }
          }}
        >
          <div className="w-full max-w-[620px] overflow-hidden rounded-2xl border border-[#e1e7ec] bg-white shadow-[0_25px_80px_rgba(15,23,42,0.2)]">
            <div className="flex items-center justify-between border-b border-[#edf0f2] px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-[#111827]">
                  Recent Activity
                </h2>

                <p className="mt-1 text-xs text-[#75839a]">
                  All recent updates from
                  your organizer account
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setActivityOpen(false)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#75839a] hover:bg-[#f4f7f8]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto divide-y divide-[#edf0f2]">
              {recentActivity.map(
                (activity) => {
                  const Icon =
                    getActivityIcon(
                      activity.title,
                    );

                  const style =
                    getActivityStyle(
                      activity.title,
                    );

                  return (
                    <div
                      key={`modal-${activity.title}-${activity.time}`}
                      className="flex gap-4 px-6 py-5"
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getActivityIconClasses(
                          style,
                        )}`}
                      >
                        <Icon size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <p className="text-sm font-semibold text-[#172033]">
                            {
                              activity.title
                            }
                          </p>

                          <span className="shrink-0 text-[11px] text-[#9aa5b5]">
                            {
                              activity.time
                            }
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-[#718098]">
                          {
                            activity.description
                          }
                        </p>
                      </div>
                    </div>
                  );
                },
              )}
            </div>

            <div className="border-t border-[#edf0f2] bg-[#fafcfc] px-6 py-4 text-right">
              <button
                type="button"
                onClick={() =>
                  setActivityOpen(false)
                }
                className="rounded-lg bg-[#0db77a] px-4 py-2 text-xs font-semibold text-white hover:bg-[#08a96f]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}