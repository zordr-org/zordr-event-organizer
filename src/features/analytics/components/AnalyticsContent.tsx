"use client";

import {
  BarChart3,
  CalendarDays,
  IndianRupee,
  Ticket,
  Users,
} from "lucide-react";

export default function AnalyticsContent() {
  const stats = [
    {
      title: "Total Revenue",
      value: "â‚¹0",
      icon: IndianRupee,
    },
    {
      title: "Tickets Sold",
      value: "0",
      icon: Ticket,
    },
    {
      title: "Total Attendees",
      value: "0",
      icon: Users,
    },
    {
      title: "Total Events",
      value: "0",
      icon: CalendarDays,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Organizer Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Analytics
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track your event performance and organizer insights.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">
          <BarChart3 size={18} />
          Overview
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    {stat.value}
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#20a974]">
                  <Icon size={21} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Revenue Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your revenue performance will appear here.
            </p>
          </div>

          <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
            <div className="text-center">
              <BarChart3
                size={40}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-sm font-medium text-slate-500">
                No analytics data yet
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Create and publish events to see your performance.
              </p>
            </div>
          </div>
        </div>

        {/* Event Performance */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Event Performance
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Compare your events and attendee activity.
            </p>
          </div>

          <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
            <div className="text-center">
              <Users
                size={40}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-sm font-medium text-slate-500">
                No event data available
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Analytics will appear once events have activity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}