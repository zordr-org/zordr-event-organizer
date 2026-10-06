"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  EllipsisVertical,
  Filter,
  LayoutDashboard,
  MapPin,
  Plus,
  QrCode,
  Search,
  Settings,
  Ticket,
  TrendingUp,
  WalletCards,
  Eye,
  Pencil,
} from "lucide-react";

import {
  getEvents,
} from "@/services/events.service";

import type {
  EventStatus,
} from "@/types/common";

import type {
  EventDetails,
} from "@/types/event";

function formatCurrency(
  value: number,
) {
  return `â‚¹${value.toLocaleString(
    "en-IN",
  )}`;
}

function getStatusStyles(
  status: EventStatus,
) {
  switch (status) {
    case "On Sale":
      return "bg-emerald-50 text-emerald-700 border-emerald-100";

    case "Upcoming":
      return "bg-blue-50 text-blue-700 border-blue-100";

    case "Ongoing":
      return "bg-violet-50 text-violet-700 border-violet-100";

    case "Completed":
      return "bg-slate-100 text-slate-600 border-slate-200";

    case "Draft":
      return "bg-amber-50 text-amber-700 border-amber-100";

    case "Cancelled":
      return "bg-red-50 text-red-600 border-red-100";

    default:
      return "bg-slate-100 text-slate-600 border-slate-200";
  }
}

function getFilterStatus(
  value: string,
): EventStatus | null {
  if (value === "All Events") {
    return null;
  }

  return value as EventStatus;
}

export default function MyEventsPage() {
  const [activeFilter, setActiveFilter] =
    useState("All Events");

  const [search, setSearch] =
    useState("");

  const [showFilterPanel, setShowFilterPanel] =
    useState(false);

  const [openMenu, setOpenMenu] =
    useState<string | null>(null);

  /*
   * Centralized event data.
   *
   * The page no longer owns a hardcoded
   * events array. The data comes from:
   *
   * mock/db.ts
   *      â†“
   * events.service.ts
   *      â†“
   * this page
   */
  const events: EventDetails[] =
    getEvents();

  /*
   * Filter counts are derived from the
   * same centralized event collection.
   */
  const filters = useMemo(
    () => {
      return [
        {
          label: "All Events",
          value: "All Events",
          count: events.length,
        },
        {
          label: "Upcoming",
          value: "Upcoming",
          count: events.filter(
            (event) =>
              event.status === "Upcoming",
          ).length,
        },
        {
          label: "Ongoing",
          value: "Ongoing",
          count: events.filter(
            (event) =>
              event.status === "Ongoing",
          ).length,
        },
        {
          label: "Completed",
          value: "Completed",
          count: events.filter(
            (event) =>
              event.status === "Completed",
          ).length,
        },
        {
          label: "Drafts",
          value: "Draft",
          count: events.filter(
            (event) =>
              event.status === "Draft",
          ).length,
        },
        {
          label: "Cancelled",
          value: "Cancelled",
          count: events.filter(
            (event) =>
              event.status === "Cancelled",
          ).length,
        },
      ];
    },
    [events],
  );

  const filteredEvents =
    useMemo(() => {
      const status =
        getFilterStatus(
          activeFilter,
        );

      return events.filter(
        (event) => {
          const matchesStatus =
            status
              ? event.status === status
              : true;

          const searchValue =
            search
              .toLowerCase()
              .trim();

          const matchesSearch =
            !searchValue ||
            event.title
              .toLowerCase()
              .includes(searchValue) ||
            event.venue
              .toLowerCase()
              .includes(searchValue) ||
            event.category
              .toLowerCase()
              .includes(searchValue) ||
            event.tags.some(
              (tag) =>
                tag
                  .toLowerCase()
                  .includes(
                    searchValue,
                  ),
            );

          return (
            matchesStatus &&
            matchesSearch
          );
        },
      );
    }, [
      activeFilter,
      search,
      events,
    ]);

  return (
          <div className="px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
            {/* Page Heading */}
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold text-[#1ea874]">
                  Events
                </p>

                <h1 className="text-3xl font-bold tracking-[-1px] text-slate-950 sm:text-[36px]">
                  My Events
                </h1>

                <p className="mt-2 text-sm text-slate-500 sm:text-base">
                  Create, manage and grow your
                  events. Keep the good times
                  coming!
                </p>
              </div>

              <Link
                href="/events/new"
                className="inline-flex h-12 items-center justify-center gap-2 self-start rounded-xl bg-[#24ad79] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1f9d6d] xl:self-auto"
              >
                <Plus size={19} />
                Create Event
              </Link>
            </div>

            {/* Filter Tabs */}
            <div className="mt-8 overflow-x-auto border-b border-slate-200">
              <div className="flex min-w-max gap-7">
                {filters.map(
                  (filter) => {
                    const isActive =
                      activeFilter ===
                      filter.value;

                    return (
                      <button
                        key={
                          filter.value
                        }
                        type="button"
                        onClick={() =>
                          setActiveFilter(
                            filter.value,
                          )
                        }
                        className={`relative flex h-12 items-center gap-2 text-sm font-medium transition ${
                          isActive
                            ? "font-semibold text-[#14966a]"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        <span>
                          {filter.label}
                        </span>

                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                            isActive
                              ? "bg-[#dff7ed] text-[#14966a]"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {filter.count}
                        </span>

                        {isActive && (
                          <span className="absolute inset-x-0 bottom-[-1px] h-[2px] rounded-full bg-[#22ad78]" />
                        )}
                      </button>
                    );
                  },
                )}
              </div>
            </div>

            {/* Search / Filter */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value,
                    )
                  }
                  placeholder="Search events..."
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#38bd8c] focus:ring-4 focus:ring-emerald-50"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowFilterPanel(
                    (value) =>
                      !value,
                  )
                }
                className={`flex h-12 items-center justify-center gap-2 rounded-xl border px-5 text-sm font-medium transition ${
                  showFilterPanel
                    ? "border-[#34b989] bg-[#ecfaf5] text-[#159568]"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <Filter size={17} />
                Filter
              </button>
            </div>

            {showFilterPanel && (
              <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Status
                </span>

                {filters.map(
                  (filter) => (
                    <button
                      key={
                        filter.value
                      }
                      type="button"
                      onClick={() => {
                        setActiveFilter(
                          filter.value,
                        );

                        setShowFilterPanel(
                          false,
                        );
                      }}
                      className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                        activeFilter ===
                        filter.value
                          ? "bg-[#dff7ed] text-[#159568]"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ),
                )}
              </div>
            )}

            {/* Events Table */}
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.02)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px] border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-[#fbfcfc]">
                      <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">
                        Event
                      </th>

                      <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">
                        Date & Venue
                      </th>

                      <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">
                        Status
                      </th>

                      <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">
                        Tickets Sold
                      </th>

                      <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">
                        Revenue
                      </th>

                      <th className="px-5 py-4 text-right text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map(
                        (event) => {
                          const percentage =
                            event.capacity >
                            0
                              ? Math.round(
                                  (event.sold /
                                    event.capacity) *
                                    100,
                                )
                              : 0;

                          return (
                            <tr
                              key={
                                event.id
                              }
                              className="group border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60"
                            >
                              {/* Event */}
                              <td className="px-6 py-4">
                                <div className="flex min-w-[250px] items-center gap-4">
                                  <div
                                    className="relative h-[58px] w-[82px] shrink-0 overflow-hidden rounded-xl"
                                    style={{
                                      background:
                                        event.gradient,
                                    }}
                                  >
                                    <div className="absolute inset-0 bg-black/10" />

                                    <div className="absolute bottom-2 left-2 right-2">
                                      <div className="h-1 rounded-full bg-white/30">
                                        <div className="h-1 w-1/2 rounded-full bg-white/80" />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-slate-900">
                                      {
                                        event.title
                                      }
                                    </p>

                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                      {event.tags.map(
                                        (
                                          tag,
                                        ) => (
                                          <span
                                            key={
                                              tag
                                            }
                                            className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500"
                                          >
                                            {
                                              tag
                                            }
                                          </span>
                                        ),
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Date & Venue */}
                              <td className="px-5 py-4">
                                <div className="min-w-[205px]">
                                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                    <CalendarDays
                                      size={
                                        15
                                      }
                                      className="shrink-0 text-slate-400"
                                    />

                                    <span>
                                      {
                                        event.date
                                      }{" "}
                                      â€¢{" "}
                                      {
                                        event.time
                                      }
                                    </span>
                                  </div>

                                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                                    <MapPin
                                      size={
                                        14
                                      }
                                      className="shrink-0"
                                    />

                                    <span className="truncate">
                                      {
                                        event.venue
                                      }
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Status */}
                              <td className="px-5 py-4">
                                <span
                                  className={`inline-flex whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyles(
                                    event.status,
                                  )}`}
                                >
                                  {
                                    event.status
                                  }
                                </span>
                              </td>

                              {/* Tickets */}
                              <td className="px-5 py-4">
                                <div className="min-w-[125px]">
                                  <div className="flex items-center justify-between gap-3">
                                    <span className="text-sm font-semibold text-slate-800">
                                      {event.sold.toLocaleString(
                                        "en-IN",
                                      )}
                                    </span>

                                    <span className="text-xs text-slate-400">
                                      /{" "}
                                      {event.capacity.toLocaleString(
                                        "en-IN",
                                      )}
                                    </span>
                                  </div>

                                  <div className="mt-2 flex items-center gap-2">
                                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                                      <div
                                        className="h-full rounded-full bg-[#32bb89]"
                                        style={{
                                          width: `${Math.min(
                                            percentage,
                                            100,
                                          )}%`,
                                        }}
                                      />
                                    </div>

                                    <span className="text-[11px] font-medium text-slate-400">
                                      {percentage}
                                      %
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Revenue */}
                              <td className="px-5 py-4">
                                <span className="whitespace-nowrap text-sm font-bold text-slate-800">
                                  {formatCurrency(
                                    event.revenue,
                                  )}
                                </span>
                              </td>

                              {/* Actions */}
                              <td className="px-5 py-4">
                                <div className="relative flex items-center justify-end gap-2">

                                  {/* MORE MENU */}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setOpenMenu(
                                        openMenu ===
                                          event.id
                                          ? null
                                          : event.id,
                                      )
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                    aria-label={`More actions for ${event.title}`}
                                  >
                                    <EllipsisVertical
                                      size={
                                        18
                                      }
                                    />
                                  </button>

                                  {openMenu ===
                                    event.id && (
                                    <div className="absolute right-0 top-11 z-20 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">

                                      {/* EDIT EVENT */}
                                      <Link
                                        href={`/events/${event.id}/edit/1`}
                                        className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                                        onClick={() =>
                                          setOpenMenu(
                                            null,
                                          )
                                        }
                                      >
                                        <Pencil
                                          size={
                                            14
                                          }
                                        />

                                        Edit Event
                                      </Link>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        },
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-16 text-center"
                        >
                          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                            <Search
                              size={20}
                              className="text-slate-400"
                            />
                          </div>

                          <h3 className="mt-4 text-sm font-semibold text-slate-900">
                            No events found
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            Try changing
                            your search or
                            selected filter.
                          </p>

                          <button
                            type="button"
                            onClick={() => {
                              setSearch(
                                "",
                              );

                              setActiveFilter(
                                "All Events",
                              );
                            }}
                            className="mt-4 text-sm font-semibold text-[#159568] hover:underline"
                          >
                            Clear filters
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="flex flex-col gap-4 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500">
                  Showing{" "}
                  <span className="font-semibold text-slate-700">
                    {filteredEvents.length >
                    0
                      ? 1
                      : 0}
                    â€“
                    {
                      filteredEvents.length
                    }
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-700">
                    {
                      filteredEvents.length
                    }
                  </span>{" "}
                  events
                </p>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-300"
                  >
                    <ChevronLeft
                      size={16}
                    />
                  </button>

                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#25ad7a] text-xs font-semibold text-white"
                  >
                    1
                  </button>

                  <button
                    type="button"
                    disabled
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-300"
                  >
                    <ChevronRight
                      size={16}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Small bottom note */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
              <Clock3 size={14} />

              <span>
                Event data updates in real time
              </span>

              <TrendingUp
                size={14}
              />
            </div>
          </div>
  );
}
