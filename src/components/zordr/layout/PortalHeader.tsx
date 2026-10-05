"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  ExternalLink,
  Settings,
  User,
  X,
} from "lucide-react";

import { routes } from "@/config/routes";
import { getOrganizer } from "@/services/settings.service";
import {
  getNotifications,
  markNotificationAsRead,
} from "@/services/notifications.service";

export default function PortalHeader() {
  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [
    notifications,
    setNotifications,
  ] = useState(() => getNotifications());

  const notificationRef =
    useRef<HTMLDivElement>(null);

  const profileRef =
    useRef<HTMLDivElement>(null);

  const organizer = getOrganizer();

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent,
    ) => {
      const target = event.target as Node;

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setNotificationsOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(target)
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

  const handleNotificationClick = (
    notificationId: string,
  ) => {
    markNotificationAsRead(notificationId);
    setNotifications(
      getNotifications(),
    );
    setNotificationsOpen(false);
  };

  const unreadCount = notifications.filter(
    (notification) =>
      notification.read !== true,
  ).length;

  return (
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
        {/* Notifications */}
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

            {unreadCount > 0 && (
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
                    {unreadCount}{" "}
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
                  aria-label="Close notifications"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="divide-y divide-[#edf0f2]">
                {notifications.map(
                  (notification) => (
                    <button
                      type="button"
                      key={notification.id}
                      onClick={() =>
                        handleNotificationClick(
                          notification.id,
                        )
                      }
                      className="flex w-full gap-3 px-5 py-4 text-left transition hover:bg-[#f8fbfa]"
                    >
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8f8f1] text-[#0baa70]">
                        <Bell size={16} />
                      </div>

                      <div className="min-w-0">
                        <p
                          className={`text-[13px] ${
                            notification.read
                              ? "font-medium text-[#52627a]"
                              : "font-semibold text-[#172033]"
                          }`}
                        >
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

              setNotificationsOpen(false);
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
                  onClick={closeMenus}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#45556d] transition hover:bg-[#f5f8f8]"
                >
                  <User size={17} />
                  Profile
                </Link>

                <Link
                  href={routes.settings}
                  onClick={closeMenus}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#45556d] transition hover:bg-[#f5f8f8]"
                >
                  <Settings size={17} />
                  Settings
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);

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
  );
}