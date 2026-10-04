"use client";

import Link from "next/link";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Eye,
  Filter,
  ScanLine,
  Search,
  Settings2,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import {
  useMemo,
  useState,
} from "react";

import {
  getEvents,
  getEventById,
} from "@/services/events.service";

import {
  getOrdersByEvent,
} from "@/services/orders.service";

import type {
  Order,
} from "@/types/order";

import type {
  OrderStatus,
} from "@/types/common";

type PageToken = number | "...";

const sidebarItems = [
  {
    label: "Dashboard",
    icon: CalendarDays,
    href: "/dashboard",
  },
  {
    label: "Events",
    icon: CalendarDays,
    href: "/events",
  },
  {
    label: "Scanner",
    icon: ScanLine,
    href: "/scanner",
  },
  {
    label: "Settlements",
    icon: WalletCards,
    href: "/settlements",
  },
  {
    label: "Orders & Registrations",
    icon: Users,
    href: "/orders",
    active: true,
  },
  {
    label: "Settings",
    icon: Settings2,
    href: "/settings",
  },
];

export default function OrdersPage() {
  /*
   * Centralized event source.
   *
   * mock/db.ts
   *     ↓
   * events.service.ts
   *     ↓
   * this page
   */
  const organizerEvents = getEvents();

  /*
   * Only show events that currently
   * have order data.
   */
  const eventOptions = useMemo(() => {
    return organizerEvents.filter(
      (event) =>
        getOrdersByEvent(event.id).length > 0,
    );
  }, [organizerEvents]);

  const [selectedEventId, setSelectedEventId] =
    useState("1");

  const [eventDropdownOpen, setEventDropdownOpen] =
    useState(false);

  const [activeTab, setActiveTab] = useState<
    "All Orders" | "Registrations" | "Checked In"
  >("All Orders");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<"All Status" | OrderStatus>(
      "All Status",
    );

  const [ticketFilter, setTicketFilter] =
    useState("All Ticket Types");

  const [statusDropdownOpen, setStatusDropdownOpen] =
    useState(false);

  const [ticketDropdownOpen, setTicketDropdownOpen] =
    useState(false);

  const [filtersOpen, setFiltersOpen] =
    useState(false);

  const [paymentFilter, setPaymentFilter] =
    useState("All Payments");

  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] = useState(10);

  const [pageSizeOpen, setPageSizeOpen] =
    useState(false);

  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [
    registrationDetailsOpen,
    setRegistrationDetailsOpen,
  ] = useState(false);

  const [copiedOrderId, setCopiedOrderId] =
    useState("");

  const [toast, setToast] = useState("");

  const currentEvent =
    getEventById(selectedEventId) ??
    eventOptions[0];

  const currentOrders: Order[] =
    currentEvent
      ? getOrdersByEvent(currentEvent.id)
      : [];

  const selectedEventName =
    currentEvent?.title ??
    "No Event Selected";

  const ticketTypes = useMemo(() => {
    return [
      "All Ticket Types",
      ...Array.from(
        new Set(
          currentOrders.map(
            (order) => order.ticket,
          ),
        ),
      ),
    ];
  }, [currentOrders]);

  const paymentTypes = useMemo(() => {
    return [
      "All Payments",
      ...Array.from(
        new Set(
          currentOrders.map(
            (order) => order.payment,
          ),
        ),
      ),
    ];
  }, [currentOrders]);

  const filteredOrders = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return currentOrders.filter(
      (order) => {
        const matchesTab =
          activeTab === "All Orders"
            ? true
            : activeTab === "Registrations"
              ? order.status !== "Cancelled"
              : order.checkedIn;

        const matchesSearch =
          query.length === 0 ||
          order.id
            .toLowerCase()
            .includes(query) ||
          order.name
            .toLowerCase()
            .includes(query) ||
          order.email
            .toLowerCase()
            .includes(query) ||
          order.ticket
            .toLowerCase()
            .includes(query);

        const matchesStatus =
          statusFilter === "All Status" ||
          order.status === statusFilter;

        const matchesTicket =
          ticketFilter === "All Ticket Types" ||
          order.ticket === ticketFilter;

        const matchesPayment =
          paymentFilter === "All Payments" ||
          order.payment === paymentFilter;

        return (
          matchesTab &&
          matchesSearch &&
          matchesStatus &&
          matchesTicket &&
          matchesPayment
        );
      },
    );
  }, [
    currentOrders,
    activeTab,
    search,
    statusFilter,
    ticketFilter,
    paymentFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredOrders.length / pageSize,
    ),
  );

  const safePage = Math.min(
    page,
    totalPages,
  );

  const visibleOrders = useMemo(() => {
    const start =
      (safePage - 1) * pageSize;

    return filteredOrders.slice(
      start,
      start + pageSize,
    );
  }, [
    filteredOrders,
    safePage,
    pageSize,
  ]);

  const pageTokens =
    useMemo<PageToken[]>(() => {
      if (totalPages <= 7) {
        return Array.from(
          {
            length: totalPages,
          },
          (_, index) => index + 1,
        );
      }

      if (safePage <= 4) {
        return [
          1,
          2,
          3,
          4,
          5,
          "...",
          totalPages,
        ];
      }

      if (safePage >= totalPages - 3) {
        return [
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      }

      return [
        1,
        "...",
        safePage - 1,
        safePage,
        safePage + 1,
        "...",
        totalPages,
      ];
    }, [
      totalPages,
      safePage,
    ]);

  const from =
    filteredOrders.length === 0
      ? 0
      : (safePage - 1) * pageSize + 1;

  const to = Math.min(
    safePage * pageSize,
    filteredOrders.length,
  );

  const showToast = (
    message: string,
  ) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2200);
  };

  const handleEventChange = (
    eventId: string,
  ) => {
    setSelectedEventId(eventId);
    setEventDropdownOpen(false);
    setPage(1);
    setSearch("");
    setStatusFilter("All Status");
    setTicketFilter("All Ticket Types");
    setPaymentFilter("All Payments");
    setActiveTab("All Orders");
  };

  const handleTabChange = (
    tab:
      | "All Orders"
      | "Registrations"
      | "Checked In",
  ) => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleStatusChange = (
    status:
      | "All Status"
      | OrderStatus,
  ) => {
    setStatusFilter(status);
    setStatusDropdownOpen(false);
    setPage(1);
  };

  const handleTicketChange = (
    ticket: string,
  ) => {
    setTicketFilter(ticket);
    setTicketDropdownOpen(false);
    setPage(1);
  };

  const handlePaymentChange = (
    payment: string,
  ) => {
    setPaymentFilter(payment);
    setPage(1);
  };

  const handlePageChange = (
    newPage: number,
  ) => {
    if (
      newPage < 1 ||
      newPage > totalPages
    ) {
      return;
    }

    setPage(newPage);
  };

  const handlePageSizeChange = (
    size: number,
  ) => {
    setPageSize(size);
    setPage(1);
    setPageSizeOpen(false);
  };

  const handleCopyOrderId = async (
    orderId: string,
  ) => {
    try {
      await navigator.clipboard.writeText(
        orderId,
      );

      setCopiedOrderId(orderId);

      showToast(
        `${orderId} copied`,
      );

      window.setTimeout(() => {
        setCopiedOrderId("");
      }, 1500);
    } catch {
      showToast(
        "Unable to copy Order ID",
      );
    }
  };

  const handleExport = () => {
    if (filteredOrders.length === 0) {
      showToast(
        "No orders to export",
      );

      return;
    }

    const headers = [
      "Order ID",
      "Attendee",
      "Email",
      "Ticket Type",
      "Quantity",
      "Amount",
      "Payment",
      "Status",
      "Date",
      "Time",
      "Checked In",
    ];

    const rows =
      filteredOrders.map(
        (order) => [
          order.id,
          order.name,
          order.email,
          order.ticket,
          order.quantity,
          `₹${order.amount.toLocaleString(
            "en-IN",
          )}`,
          order.payment,
          order.status,
          order.date,
          order.time,
          order.checkedIn
            ? "Yes"
            : "No",
        ],
      );

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(
                value,
              ).replace(
                /"/g,
                '""',
              )}"`,
          )
          .join(","),
      )
      .join("\n");

    const blob = new Blob(
      [csv],
      {
        type:
          "text/csv;charset=utf-8;",
      },
    );

    const url =
      URL.createObjectURL(blob);

    const anchor =
      document.createElement("a");

    anchor.href = url;

    anchor.download =
      `${currentEvent?.title
        .replace(/\s+/g, "-")
        .toLowerCase()}-orders.csv`;

    document.body.appendChild(
      anchor,
    );

    anchor.click();

    anchor.remove();

    URL.revokeObjectURL(url);

    showToast(
      "Orders exported successfully",
    );
  };

  const openOrder = (
    order: Order,
  ) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All Status");
    setTicketFilter("All Ticket Types");
    setPaymentFilter("All Payments");
    setFiltersOpen(false);
    setPage(1);
  };

  const totalRegistrations =
    currentEvent?.orderMetrics
      .registrations ?? 0;

  const ticketsSold =
    currentEvent?.orderMetrics
      .ticketsSold ?? 0;

  const pending =
    currentEvent?.orderMetrics
      .pending ?? 0;

  const checkedIn =
    currentEvent?.orderMetrics
      .checkedIn ?? 0;

  return (
    <div className="min-h-screen bg-white text-[#182143]">
      {/* Toast */}
      {toast && (
        <div className="fixed right-6 top-6 z-[100] rounded-lg bg-[#182143] px-5 py-3 text-sm font-semibold text-white shadow-xl">
          {toast}
        </div>
      )}

      <div className="flex min-h-screen">
        {/* ================= SIDEBAR ================= */}
        <aside className="hidden w-[205px] shrink-0 border-r border-slate-100 bg-[#f9fffd] lg:block">
          <div className="sticky top-0 flex h-screen flex-col">
            {/* Logo */}
            <div className="px-7 pb-7 pt-5">
              <div className="text-[39px] font-black leading-none tracking-[-3px]">
                <span className="text-[#2bc993]">
                  Z
                </span>

                <span className="text-[#151b3b]">
                  ordr
                </span>
              </div>

              <p className="mt-1 text-[11px] font-medium text-[#53658f]">
                Events. Experiences. Together.
              </p>
            </div>

            {/* Navigation */}
            <nav className="px-3">
              {sidebarItems.map(
                (item) => {
                  const Icon =
                    item.icon;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`mb-1 flex min-h-[47px] items-center gap-4 rounded-lg px-4 text-[15px] font-semibold transition ${
                        item.active
                          ? "bg-[#e2f8ef] text-[#17203f]"
                          : "text-[#4d5e89] hover:bg-[#eef9f5]"
                      }`}
                    >
                      <Icon
                        size={21}
                        strokeWidth={1.9}
                        className={
                          item.active
                            ? "text-[#10b978]"
                            : "text-[#52638d]"
                        }
                      />

                      <span>
                        {item.label}
                      </span>
                    </Link>
                  );
                },
              )}
            </nav>

            {/* Help Card */}
            <div className="mx-5 mt-8 rounded-lg bg-[#e7faf3] p-4">
              <div className="flex items-start gap-3">
                <div className="text-[#0bb978]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 11.5a8.5 8.5 0 0 1-12.9 7.2L4 20l1.3-3.1A8.5 8.5 0 1 1 20 11.5Z" />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-bold">
                    Need help?
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#53658f]">
                    Our team is here to help
                    <br />
                    you succeed.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  showToast(
                    "Support request opened",
                  )
                }
                className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#0aab6b] underline"
              >
                Contact Support
                <span>→</span>
              </button>
            </div>
          </div>
        </aside>

        {/* ================= MAIN ================= */}
        <main className="min-w-0 flex-1">
          {/* TOP HEADER */}
          <header className="flex h-[51px] items-center justify-end border-b border-slate-100 px-6 sm:px-8">
            <div className="flex items-center gap-7">
              <button
                type="button"
                onClick={() =>
                  showToast(
                    "No new notifications",
                  )
                }
                className="relative"
                title="Notifications"
              >
                <Bell
                  size={22}
                  className="text-[#435681]"
                />

                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
              </button>

              <button
                type="button"
                onClick={() =>
                  showToast(
                    "Organizer profile",
                  )
                }
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
                  <span className="text-lg">
                    ⚡
                  </span>
                </div>

                <div className="hidden text-left sm:block">
                  <p className="text-sm font-bold leading-4">
                    KITSW Cultural Club
                  </p>

                  <p className="text-xs text-[#66769b]">
                    Organizer
                  </p>
                </div>

                <ChevronDown
                  size={17}
                  className="text-[#42547f]"
                />
              </button>
            </div>
          </header>

          {/* CONTENT */}
          <div className="px-5 pb-10 pt-8 sm:px-8 lg:px-6">
            {/* TITLE */}
            <div className="flex items-start justify-between gap-5">
              <div>
                <h1 className="text-[32px] font-bold leading-9 tracking-[-1px] text-[#101733]">
                  Orders &
                  Registrations
                </h1>

                <p className="mt-1 text-[18px] leading-6 text-[#536b9d]">
                  Manage ticket orders and attendee
                  registrations.
                </p>
              </div>

              {/* EVENT DROPDOWN */}
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() =>
                    setEventDropdownOpen(
                      (open) => !open,
                    )
                  }
                  className="flex h-[42px] min-w-[198px] items-center justify-between rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold shadow-sm"
                >
                  {selectedEventName}

                  <ChevronDown
                    size={17}
                    className={`transition ${
                      eventDropdownOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {eventDropdownOpen && (
                  <DropdownPanel className="right-0 top-[48px] w-[240px]">
                    {eventOptions.map(
                      (event) => (
                        <button
                          key={event.id}
                          type="button"
                          onClick={() =>
                            handleEventChange(
                              event.id,
                            )
                          }
                          className={`w-full rounded-md px-3 py-2.5 text-left text-sm transition hover:bg-[#eef9f5] ${
                            selectedEventId ===
                            event.id
                              ? "bg-[#e3f9ef] font-semibold text-[#079f67]"
                              : "text-[#405276]"
                          }`}
                        >
                          {event.title}
                        </button>
                      ),
                    )}
                  </DropdownPanel>
                )}
              </div>
            </div>

            {/* EVENT SUMMARY */}
            {currentEvent && (
              <section className="mt-5 rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-5">
                  <div className="flex items-center gap-4">
                    {/* Banner */}
                    <div
                      className="flex h-[82px] w-[155px] shrink-0 items-center justify-center overflow-hidden rounded-lg"
                      style={{
                        background:
                          currentEvent.gradient,
                      }}
                    >
                      <div className="text-center text-white">
                        <p className="text-[18px] font-black italic">
                          {currentEvent.title
                            .split(" ")
                            .slice(0, 1)
                            .join(" ")
                            .toUpperCase()}
                        </p>

                        <p className="text-[16px] font-black italic">
                          {currentEvent.title
                            .split(" ")
                            .slice(1)
                            .join(" ")
                            .toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-[16px] font-bold">
                        {currentEvent.title}
                      </h2>

                      <p className="mt-1 text-sm text-[#53658f]">
                        {currentEvent.date}
                        &nbsp; • &nbsp;
                        {currentEvent.venue}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {currentEvent.tags.map(
                          (tag) => (
                            <Tag key={tag}>
                              {tag}
                            </Tag>
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-2 rounded-md bg-[#e3f9ef] px-3 py-2 text-sm font-semibold text-[#079f67]">
                      <span className="h-2 w-2 rounded-full bg-[#0bb978]" />
                      Live
                    </span>

                    <Link
                      href="/events"
                      className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-50"
                    >
                      View Event →
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* STAT CARDS */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                icon={<Users size={23} />}
                title="Total Registrations"
                value={totalRegistrations.toLocaleString(
                  "en-IN",
                )}
                subtitle="All registered attendees"
                iconClass="bg-[#e7f1ff] text-[#1874e8]"
              />

              <StatCard
                icon={
                  <WalletCards size={23} />
                }
                title="Tickets Sold"
                value={ticketsSold.toLocaleString(
                  "en-IN",
                )}
                subtitle={`${totalRegistrations > 0 ? Math.round(
                  (ticketsSold /
                    totalRegistrations) *
                    100,
                ) : 0}% of total registrations`}
                iconClass="bg-[#e4faf0] text-[#08ad70]"
              />

              <StatCard
                icon={
                  <CalendarDays size={23} />
                }
                title="Pending"
                value={pending.toLocaleString(
                  "en-IN",
                )}
                subtitle={`${totalRegistrations > 0 ? Math.round(
                  (pending /
                    totalRegistrations) *
                    100,
                ) : 0}% registrations pending`}
                iconClass="bg-[#fff2df] text-[#f19a21]"
              />

              <StatCard
                icon={<ScanLine size={23} />}
                title="Checked In"
                value={checkedIn.toLocaleString(
                  "en-IN",
                )}
                subtitle="Attendees checked in"
                iconClass="bg-[#f0e9ff] text-[#7547e8]"
              />
            </div>

            {/* MAIN CARD */}
            <section className="mt-5 rounded-lg border border-slate-200 bg-white">
              {/* TABS */}
              <div className="flex border-b border-slate-200 px-5">
                {(
                  [
                    "All Orders",
                    "Registrations",
                    "Checked In",
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() =>
                      handleTabChange(tab)
                    }
                    className={`border-b-2 px-4 py-4 text-sm font-semibold transition ${
                      activeTab === tab
                        ? "border-[#11b978] text-[#079f67]"
                        : "border-transparent text-[#53658f] hover:text-[#079f67]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* FILTERS */}
              <div className="flex flex-col gap-3 p-5 xl:flex-row">
                <div className="relative flex-1">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6c7da0]"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => {
                      setSearch(
                        event.target.value,
                      );

                      setPage(1);
                    }}
                    placeholder="Search by order ID, name, email..."
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none placeholder:text-[#8190ae] focus:border-[#12b978]"
                  />
                </div>

                {/* STATUS */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setStatusDropdownOpen(
                        (open) => !open,
                      );

                      setTicketDropdownOpen(
                        false,
                      );

                      setFiltersOpen(false);
                    }}
                    className="flex h-10 min-w-[145px] items-center justify-between gap-6 rounded-lg border border-slate-200 px-4 text-sm font-medium text-[#405276]"
                  >
                    {statusFilter}

                    <ChevronDown
                      size={16}
                      className={`transition ${
                        statusDropdownOpen
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  {statusDropdownOpen && (
                    <DropdownPanel className="left-0 top-[48px] w-[170px]">
                      {(
                        [
                          "All Status",
                          "Confirmed",
                          "Pending",
                          "Cancelled",
                        ] as const
                      ).map(
                        (status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() =>
                              handleStatusChange(
                                status,
                              )
                            }
                            className={`w-full rounded-md px-3 py-2.5 text-left text-sm hover:bg-[#eef9f5] ${
                              statusFilter ===
                              status
                                ? "bg-[#e3f9ef] font-semibold text-[#079f67]"
                                : "text-[#405276]"
                            }`}
                          >
                            {status}
                          </button>
                        ),
                      )}
                    </DropdownPanel>
                  )}
                </div>

                {/* TICKET TYPE */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setTicketDropdownOpen(
                        (open) => !open,
                      );

                      setStatusDropdownOpen(
                        false,
                      );

                      setFiltersOpen(false);
                    }}
                    className="flex h-10 min-w-[170px] items-center justify-between gap-6 rounded-lg border border-slate-200 px-4 text-sm font-medium text-[#405276]"
                  >
                    {ticketFilter}

                    <ChevronDown
                      size={16}
                      className={`transition ${
                        ticketDropdownOpen
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  {ticketDropdownOpen && (
                    <DropdownPanel className="left-0 top-[48px] w-[190px]">
                      {ticketTypes.map(
                        (ticket) => (
                          <button
                            key={ticket}
                            type="button"
                            onClick={() =>
                              handleTicketChange(
                                ticket,
                              )
                            }
                            className={`w-full rounded-md px-3 py-2.5 text-left text-sm hover:bg-[#eef9f5] ${
                              ticketFilter ===
                              ticket
                                ? "bg-[#e3f9ef] font-semibold text-[#079f67]"
                                : "text-[#405276]"
                            }`}
                          >
                            {ticket}
                          </button>
                        ),
                      )}
                    </DropdownPanel>
                  )}
                </div>

                {/* FILTERS */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setFiltersOpen(
                        (open) => !open,
                      );

                      setStatusDropdownOpen(
                        false,
                      );

                      setTicketDropdownOpen(
                        false,
                      );
                    }}
                    className={`flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition ${
                      paymentFilter !==
                      "All Payments"
                        ? "border-[#10b978] bg-[#e7faf3] text-[#079f67]"
                        : "border-slate-200 text-[#405276]"
                    }`}
                  >
                    <Filter size={16} />
                    Filters
                  </button>

                  {filtersOpen && (
                    <DropdownPanel className="right-0 top-[48px] w-[240px]">
                      <div className="mb-2 px-3 pt-1 text-xs font-bold uppercase tracking-wide text-[#7b89a5]">
                        Payment Method
                      </div>

                      {paymentTypes.map(
                        (payment) => (
                          <button
                            key={payment}
                            type="button"
                            onClick={() =>
                              handlePaymentChange(
                                payment,
                              )
                            }
                            className={`w-full rounded-md px-3 py-2.5 text-left text-sm hover:bg-[#eef9f5] ${
                              paymentFilter ===
                              payment
                                ? "bg-[#e3f9ef] font-semibold text-[#079f67]"
                                : "text-[#405276]"
                            }`}
                          >
                            {payment}
                          </button>
                        ),
                      )}

                      <div className="mt-2 border-t border-slate-100 pt-2">
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-red-500 hover:bg-red-50"
                        >
                          Clear All Filters
                        </button>
                      </div>
                    </DropdownPanel>
                  )}
                </div>

                {/* EXPORT */}
                <button
                  type="button"
                  onClick={handleExport}
                  className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-[#405276] transition hover:bg-slate-50"
                >
                  <Download size={16} />
                  Export
                </button>
              </div>

              {/* ACTIVE FILTER INFO */}
              {(search ||
                statusFilter !==
                  "All Status" ||
                ticketFilter !==
                  "All Ticket Types" ||
                paymentFilter !==
                  "All Payments") && (
                <div className="mx-5 mb-3 flex flex-wrap items-center gap-2 rounded-lg bg-[#f7fafc] px-4 py-3">
                  <span className="text-xs font-semibold text-[#53658f]">
                    Active filters:
                  </span>

                  {search && (
                    <FilterChip
                      label={`Search: ${search}`}
                      onRemove={() => {
                        setSearch("");
                        setPage(1);
                      }}
                    />
                  )}

                  {statusFilter !==
                    "All Status" && (
                    <FilterChip
                      label={statusFilter}
                      onRemove={() =>
                        handleStatusChange(
                          "All Status",
                        )
                      }
                    />
                  )}

                  {ticketFilter !==
                    "All Ticket Types" && (
                    <FilterChip
                      label={ticketFilter}
                      onRemove={() =>
                        handleTicketChange(
                          "All Ticket Types",
                        )
                      }
                    />
                  )}

                  {paymentFilter !==
                    "All Payments" && (
                    <FilterChip
                      label={paymentFilter}
                      onRemove={() =>
                        handlePaymentChange(
                          "All Payments",
                        )
                      }
                    />
                  )}

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="ml-1 text-xs font-semibold text-red-500 hover:underline"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* TABLE */}
              <div className="overflow-x-auto px-5">
                <table className="w-full min-w-[950px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#f7f9fc] text-left text-[#405276]">
                      <th className="rounded-l-lg px-3 py-3 font-semibold">
                        #
                      </th>

                      <th className="px-3 py-3 font-semibold">
                        Order ID
                      </th>

                      <th className="px-3 py-3 font-semibold">
                        Attendee
                      </th>

                      <th className="px-3 py-3 font-semibold">
                        Ticket Type
                      </th>

                      <th className="px-3 py-3 font-semibold">
                        Qty
                      </th>

                      <th className="px-3 py-3 font-semibold">
                        Amount
                      </th>

                      <th className="px-3 py-3 font-semibold">
                        Payment
                      </th>

                      <th className="px-3 py-3 font-semibold">
                        Status
                      </th>

                      <th className="px-3 py-3 font-semibold">
                        Date & Time
                      </th>

                      <th className="rounded-r-lg px-3 py-3 text-center font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {visibleOrders.length >
                    0 ? (
                      visibleOrders.map(
                        (
                          order,
                          index,
                        ) => (
                          <tr
                            key={order.id}
                            className="border-b border-slate-100 transition hover:bg-[#fbfdfd]"
                          >
                            <td className="px-3 py-4 text-[#52638d]">
                              {(safePage -
                                1) *
                                pageSize +
                                index +
                                1}
                            </td>

                            <td className="px-3 py-4">
                              <button
                                type="button"
                                onClick={() =>
                                  openOrder(
                                    order,
                                  )
                                }
                                className="font-semibold text-[#1767dc] hover:underline"
                              >
                                {order.id}
                              </button>
                            </td>

                            <td className="px-3 py-4">
                              <button
                                type="button"
                                onClick={() =>
                                  openOrder(
                                    order,
                                  )
                                }
                                className="text-left"
                              >
                                <p className="font-semibold text-[#182143]">
                                  {order.name}
                                </p>

                                <p className="mt-0.5 text-xs text-[#7383a3]">
                                  {order.email}
                                </p>
                              </button>
                            </td>

                            <td className="px-3 py-4">
                              {order.ticket}
                            </td>

                            <td className="px-3 py-4">
                              {order.quantity}
                            </td>

                            <td className="px-3 py-4 font-semibold">
                              ₹
                              {order.amount.toLocaleString(
                                "en-IN",
                              )}
                            </td>

                            <td className="px-3 py-4">
                              {order.payment}
                            </td>

                            <td className="px-3 py-4">
                              <StatusBadge
                                status={order.status}
                              />
                            </td>

                            <td className="px-3 py-4 text-[#53658f]">
                              <p>
                                {order.date}
                              </p>

                              <p>
                                {order.time}
                              </p>
                            </td>

                            <td className="px-3 py-4">
                              <div className="flex items-center justify-center gap-3">
                                <button
                                  type="button"
                                  onClick={() =>
                                    openOrder(
                                      order,
                                    )
                                  }
                                  className="rounded-md bg-[#eef4ff] p-2 text-[#1767dc] transition hover:bg-[#dfeaff]"
                                  title="View"
                                >
                                  <Eye size={16} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleCopyOrderId(
                                      order.id,
                                    )
                                  }
                                  className="rounded-md p-2 text-[#596989] transition hover:bg-slate-100"
                                  title="Copy Order ID"
                                >
                                  <Copy size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ),
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan={10}
                          className="px-5 py-16 text-center"
                        >
                          <div className="flex flex-col items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef9f5] text-[#0bb978]">
                              <Search size={21} />
                            </div>

                            <p className="mt-3 font-semibold text-[#182143]">
                              No orders found
                            </p>

                            <p className="mt-1 text-sm text-[#71809f]">
                              Try changing your
                              search or filters.
                            </p>

                            <button
                              type="button"
                              onClick={resetFilters}
                              className="mt-4 rounded-lg bg-[#10b978] px-4 py-2 text-sm font-semibold text-white"
                            >
                              Clear Filters
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}
              <div className="flex flex-col items-center justify-between gap-4 px-5 py-5 sm:flex-row">
                <p className="text-sm text-[#53658f]">
                  Showing{" "}
                  <strong>
                    {from}–{to}
                  </strong>{" "}
                  of{" "}
                  <strong>
                    {filteredOrders.length}
                  </strong>{" "}
                  orders
                </p>

                <div className="flex items-center gap-1">
                  {/* PREVIOUS */}
                  <button
                    type="button"
                    disabled={safePage === 1}
                    onClick={() =>
                      handlePageChange(
                        safePage - 1,
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-[#7a89a7] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={17} />
                  </button>

                  {/* PAGE NUMBERS */}
                  {pageTokens.map(
                    (token, index) =>
                      token === "..." ? (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-2 text-[#71809f]"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={token}
                          type="button"
                          onClick={() =>
                            handlePageChange(
                              token,
                            )
                          }
                          className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-semibold transition ${
                            safePage === token
                              ? "bg-[#10b978] text-white"
                              : "border border-slate-200 text-[#405276] hover:bg-slate-50"
                          }`}
                        >
                          {token}
                        </button>
                      ),
                  )}

                  {/* NEXT */}
                  <button
                    type="button"
                    disabled={
                      safePage === totalPages
                    }
                    onClick={() =>
                      handlePageChange(
                        safePage + 1,
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>

                {/* PAGE SIZE */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setPageSizeOpen(
                        (open) => !open,
                      )
                    }
                    className="flex items-center gap-3 rounded-md border border-slate-200 px-3 py-2 text-sm"
                  >
                    {pageSize} per page

                    <ChevronDown
                      size={15}
                      className={`transition ${
                        pageSizeOpen
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  {pageSizeOpen && (
                    <DropdownPanel className="bottom-[46px] right-0 w-[140px]">
                      {[10, 20, 50].map(
                        (size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() =>
                              handlePageSizeChange(
                                size,
                              )
                            }
                            className={`w-full rounded-md px-3 py-2.5 text-left text-sm hover:bg-[#eef9f5] ${
                              pageSize === size
                                ? "bg-[#e3f9ef] font-semibold text-[#079f67]"
                                : "text-[#405276]"
                            }`}
                          >
                            {size} per page
                          </button>
                        ),
                      )}
                    </DropdownPanel>
                  )}
                </div>
              </div>
            </section>

            {/* FOOT NOTE */}
            <div className="mt-5 flex items-center justify-between rounded-lg bg-[#f5f9ff] px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-[#182143]">
                  Registration overview
                </p>

                <p className="mt-1 text-xs text-[#617195]">
                  All order and registration
                  information for{" "}
                  {currentEvent?.title}.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setRegistrationDetailsOpen(
                    true,
                  )
                }
                className="hidden items-center gap-2 text-sm font-semibold text-[#1767dc] transition hover:underline sm:flex"
              >
                View Registration Details
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* ================= ORDER DETAILS MODAL ================= */}
      {detailsOpen &&
        selectedOrder && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div>
                  <p className="text-lg font-bold text-[#182143]">
                    Order Details
                  </p>

                  <p className="mt-1 text-xs text-[#71809f]">
                    {selectedOrder.id}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setDetailsOpen(false)
                  }
                  className="rounded-lg p-2 text-[#64728f] hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5 p-6">
                <div className="flex items-center justify-between rounded-lg bg-[#f7fafc] p-4">
                  <div>
                    <p className="text-xs text-[#71809f]">
                      Status
                    </p>

                    <div className="mt-2">
                      <StatusBadge
                        status={
                          selectedOrder.status
                        }
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopyOrderId(
                        selectedOrder.id,
                      )
                    }
                    className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-[#405276]"
                  >
                    <Copy size={14} />

                    {copiedOrderId ===
                    selectedOrder.id
                      ? "Copied"
                      : "Copy ID"}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <DetailItem
                    label="Attendee"
                    value={
                      selectedOrder.name
                    }
                  />

                  <DetailItem
                    label="Email"
                    value={
                      selectedOrder.email
                    }
                  />

                  <DetailItem
                    label="Ticket Type"
                    value={
                      selectedOrder.ticket
                    }
                  />

                  <DetailItem
                    label="Quantity"
                    value={String(
                      selectedOrder.quantity,
                    )}
                  />

                  <DetailItem
                    label="Amount"
                    value={`₹${selectedOrder.amount.toLocaleString(
                      "en-IN",
                    )}`}
                  />

                  <DetailItem
                    label="Payment"
                    value={
                      selectedOrder.payment
                    }
                  />

                  <DetailItem
                    label="Date"
                    value={
                      selectedOrder.date
                    }
                  />

                  <DetailItem
                    label="Time"
                    value={
                      selectedOrder.time
                    }
                  />
                </div>

                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="text-xs text-[#71809f]">
                    Check-in Status
                  </p>

                  <p
                    className={`mt-1 font-semibold ${
                      selectedOrder.checkedIn
                        ? "text-[#079f67]"
                        : "text-[#f19a21]"
                    }`}
                  >
                    {selectedOrder.checkedIn
                      ? "Checked In"
                      : "Not Checked In"}
                  </p>
                </div>
              </div>

              <div className="flex justify-end border-t border-slate-100 px-6 py-4">
                <button
                  type="button"
                  onClick={() =>
                    setDetailsOpen(false)
                  }
                  className="rounded-lg bg-[#10b978] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      {/* ================= REGISTRATION DETAILS MODAL ================= */}
      {registrationDetailsOpen &&
        currentEvent && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-xl rounded-xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div>
                  <p className="text-lg font-bold text-[#182143]">
                    Registration Overview
                  </p>

                  <p className="mt-1 text-xs text-[#71809f]">
                    {currentEvent.title}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setRegistrationDetailsOpen(
                      false,
                    )
                  }
                  className="rounded-lg p-2 text-[#64728f] hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-4">
                <SummaryItem
                  label="Registrations"
                  value={
                    totalRegistrations
                  }
                />

                <SummaryItem
                  label="Tickets Sold"
                  value={ticketsSold}
                />

                <SummaryItem
                  label="Pending"
                  value={pending}
                />

                <SummaryItem
                  label="Checked In"
                  value={checkedIn}
                />
              </div>

              <div className="mx-6 mb-6 rounded-lg bg-[#f5f9ff] p-4">
                <p className="text-sm font-semibold text-[#182143]">
                  Event
                </p>

                <p className="mt-1 text-sm text-[#53658f]">
                  {currentEvent.date} •{" "}
                  {currentEvent.venue}
                </p>
              </div>

              <div className="flex justify-end border-t border-slate-100 px-6 py-4">
                <button
                  type="button"
                  onClick={() =>
                    setRegistrationDetailsOpen(
                      false,
                    )
                  }
                  className="rounded-lg bg-[#10b978] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Tag({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="rounded-md bg-[#eef0ff] px-3 py-1.5 text-xs font-semibold text-[#2736c9]">
      {children}
    </span>
  );
}

function StatCard({
  icon,
  title,
  value,
  subtitle,
  iconClass,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  iconClass: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full ${iconClass}`}
        >
          {icon}
        </div>

        <div>
          <p className="text-xs font-medium text-[#53658f]">
            {title}
          </p>

          <p className="mt-1 text-[24px] font-bold leading-6 text-[#182143]">
            {value}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-[#65769a]">
        {subtitle}
      </p>
    </div>
  );
}

function DropdownPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute z-50 rounded-lg border border-slate-200 bg-white p-2 shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: OrderStatus;
}) {
  const classes =
    status === "Confirmed"
      ? "bg-[#e3f9ef] text-[#079f67]"
      : status === "Pending"
        ? "bg-[#fff3df] text-[#dc8a0d]"
        : "bg-[#ffe9e9] text-[#d34b4b]";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${classes}`}
    >
      {status}
    </span>
  );
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#405276] shadow-sm ring-1 ring-slate-200">
      {label}

      <button
        type="button"
        onClick={onRemove}
        className="text-[#71809f] hover:text-red-500"
      >
        <X size={13} />
      </button>
    </span>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-[#71809f]">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-[#182143]">
        {value}
      </p>
    </div>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <p className="text-xs text-[#71809f]">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold text-[#182143]">
        {value.toLocaleString(
          "en-IN",
        )}
      </p>
    </div>
  );
}