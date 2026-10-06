"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Eye,
  FileText,
  Home,
  Info,
  Landmark,
  MoreVertical,
  Percent,
  Search,
  Settings,
  ShieldCheck,
  Smartphone,
  Users,
  Wallet,
  X,
  History,
  Clock3,
  AlertCircle,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

import {
  getEvents,
} from "@/services/events.service";

import {
  getInvoices,
  getSettlementHistory,
  getSettlementTransactions,
} from "@/services/settlements.service";

import type { EventDetails } from "@/types/event";
import type {
  Invoice,
  SettlementHistoryItem,
  SettlementTransaction,
} from "@/types/settlement";

type TabType =
  | "transactions"
  | "history"
  | "invoices";

type SettlementDisplayStatus =
  | "Settled"
  | "Processing"
  | "Pending"
  | "Completed"
  | "Failed";

type EventSettlementMeta = {
  prefix: string;
  scheduledDate: string;
  payoutTo: string;
  bankAccount: string;
  ifsc: string;
  accountHolder: string;
  settlementCycle: string;
};

const SETTLEMENT_META: Record<
  string,
  EventSettlementMeta
> = {
  "Crescendo Fest 2026": {
    prefix: "CF26",
    scheduledDate: "Oct 14, 2026",
    payoutTo: "KITSW Cultural Club",
    bankAccount: "XXXX1234",
    ifsc: "HDFC0001234",
    accountHolder: "KITSW Cultural Club",
    settlementCycle: "T+2 business days",
  },

  "Tech Talk Series": {
    prefix: "TT26",
    scheduledDate: "Oct 20, 2026",
    payoutTo: "KITSW Cultural Club",
    bankAccount: "XXXX1234",
    ifsc: "HDFC0001234",
    accountHolder: "KITSW Cultural Club",
    settlementCycle: "T+2 business days",
  },

  "Cultural Night": {
    prefix: "CN26",
    scheduledDate: "Nov 04, 2026",
    payoutTo: "KITSW Cultural Club",
    bankAccount: "XXXX1234",
    ifsc: "HDFC0001234",
    accountHolder: "KITSW Cultural Club",
    settlementCycle: "T+2 business days",
  },
};

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

function formatCurrency(
  value: number,
): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

function getDisplayStatus(
  status: SettlementTransaction["status"],
): SettlementDisplayStatus {
  return status;
}

function getSettlementStatusClass(
  status: SettlementDisplayStatus,
): string {
  switch (status) {
    case "Settled":
      return "bg-emerald-50 text-emerald-600";

    case "Completed":
      return "bg-emerald-50 text-emerald-600";

    case "Processing":
      return "bg-blue-50 text-blue-600";

    case "Pending":
      return "bg-amber-50 text-amber-600";

    case "Failed":
      return "bg-red-50 text-red-600";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

function StatusBadge({
  status,
}: {
  status: SettlementDisplayStatus;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getSettlementStatusClass(
        status,
      )}`}
    >
      {status}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* SIDEBAR                                                                    */
/* -------------------------------------------------------------------------- */

function SidebarItem({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: ReactNode;
  label: ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
        active
          ? "bg-emerald-50 text-slate-900"
          : "text-slate-700 hover:bg-slate-50"
      }`}
    >
      <span
        className={
          active
            ? "text-emerald-600"
            : "text-slate-500"
        }
      >
        {icon}
      </span>

      <span>{label}</span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* SMALL COMPONENTS                                                           */
/* -------------------------------------------------------------------------- */

function EventTag({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <span className="rounded-md bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
      {children}
    </span>
  );
}

function SummaryCard({
  icon,
  title,
  value,
  subtitle,
  variant,
  valueClass = "",
}: {
  icon: ReactNode;
  title: string;
  value: string;
  subtitle: ReactNode;
  variant:
    | "green"
    | "blue"
    | "purple"
    | "orange";
  valueClass?: string;
}) {
  const styles = {
    green: {
      box:
        "bg-gradient-to-br from-emerald-50/70 to-white",
      icon: "bg-emerald-100 text-emerald-600",
    },

    blue: {
      box:
        "bg-gradient-to-br from-blue-50/70 to-white",
      icon: "bg-blue-100 text-blue-600",
    },

    purple: {
      box:
        "bg-gradient-to-br from-purple-50/70 to-white",
      icon: "bg-purple-100 text-purple-600",
    },

    orange: {
      box:
        "bg-gradient-to-br from-amber-50/80 to-white",
      icon: "bg-amber-100 text-amber-600",
    },
  };

  return (
    <div
      className={`rounded-xl border border-slate-200 p-4 ${styles[variant].box}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${styles[variant].icon}`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            {title}

            <Info
              size={15}
              className="text-blue-600"
            />
          </div>

          <div
            className={`mt-1 text-[24px] font-bold leading-none text-slate-950 ${valueClass}`}
          >
            {value}
          </div>

          <div className="mt-2 text-xs text-slate-500">
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  copy = false,
  copied = false,
  onCopy,
}: {
  label: string;
  value: string;
  copy?: boolean;
  copied?: boolean;
  onCopy?: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-1.5">
      <span className="text-xs text-slate-500">
        {label}
      </span>

      <span className="flex items-center gap-2 text-right text-xs font-semibold text-slate-700">
        {value}

        {copy && onCopy && (
          <button
            type="button"
            onClick={onCopy}
            className="text-slate-400 hover:text-slate-700"
            aria-label={`Copy ${label}`}
          >
            {copied ? (
              <Check size={14} />
            ) : (
              <Copy size={14} />
            )}
          </button>
        )}
      </span>
    </div>
  );
}

function InfoCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          {icon}
        </div>

        <h3 className="text-sm font-bold text-slate-900">
          {title}
        </h3>
      </div>

      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN PAGE                                                                  */
/* -------------------------------------------------------------------------- */

export default function SettlementsContent() {
  const organizerEvents = useMemo(
    () =>
      getEvents().filter(
        (event) =>
          SETTLEMENT_META[event.title] !==
          undefined,
      ),
    [],
  );

  const [selectedEventName, setSelectedEventName] =
    useState<string>(
      organizerEvents[0]?.title ??
        "Crescendo Fest 2026",
    );

  const [eventOpen, setEventOpen] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState<TabType>("transactions");

  const [statusOpen, setStatusOpen] =
    useState(false);

  const [dateOpen, setDateOpen] =
    useState(false);

  const [pageSizeOpen, setPageSizeOpen] =
    useState(false);

  const [selectedStatus, setSelectedStatus] =
    useState("All Statuses");

  const [selectedDate, setSelectedDate] =
    useState("All Dates");

  const [search, setSearch] = useState("");

  const [page, setPage] =
    useState<number>(1);

  const [pageSize, setPageSize] =
    useState<number>(10);

  const [selectedTransaction, setSelectedTransaction] =
    useState<SettlementTransaction | null>(
      null,
    );

  const [transactionMenu, setTransactionMenu] =
    useState<string | null>(null);

  const [showAllSettlements, setShowAllSettlements] =
    useState(false);

  const [showInvoice, setShowInvoice] =
    useState<Invoice | null>(null);

  const [copiedField, setCopiedField] =
    useState("");

  const [showExportMessage, setShowExportMessage] =
    useState(false);

  const currentEvent: EventDetails =
    organizerEvents.find(
      (event) =>
        event.title === selectedEventName,
    ) ??
    organizerEvents[0] ??
    getEvents()[0];

  const settlementMeta =
    SETTLEMENT_META[currentEvent.title] ??
    SETTLEMENT_META["Crescendo Fest 2026"];

  /* ---------------------------------------------------------------------- */
  /* SERVICE DATA                                                           */
  /* ---------------------------------------------------------------------- */

  const allSettlementTransactions =
    useMemo(
      () => getSettlementTransactions(),
      [],
    );

  const allSettlementHistory =
    useMemo(
      () => getSettlementHistory(),
      [],
    );

  const allInvoices =
    useMemo(() => getInvoices(), []);

  const eventTransactions =
    useMemo(() => {
      const prefix =
        settlementMeta.prefix.toLowerCase();

      return allSettlementTransactions.filter(
        (transaction) =>
          transaction.orderId
            .toLowerCase()
            .includes(prefix),
      );
    }, [
      allSettlementTransactions,
      settlementMeta.prefix,
    ]);

  /*
   * The current settlements service exposes a shared
   * transaction ledger rather than an eventId parameter.
   * We therefore use the order prefix associated with
   * the selected event to select its transactions.
   */

  const collection =
    useMemo(
      () =>
        eventTransactions
          .filter(
            (transaction) =>
              transaction.status !==
              "Failed",
          )
          .reduce(
            (total, transaction) =>
              total + transaction.amount,
            0,
          ),
      [eventTransactions],
    );

  const tickets =
    eventTransactions.length;

  const platformFee =
    Math.round(collection * 0.02);

  const netSettlement =
    Math.max(
      collection - platformFee,
      0,
    );

  const settlementStatus =
    useMemo<SettlementDisplayStatus>(() => {
      const hasProcessing =
        eventTransactions.some(
          (transaction) =>
            transaction.status ===
            "Processing",
        );

      const hasPending =
        eventTransactions.some(
          (transaction) =>
            transaction.status ===
            "Pending",
        );

      if (hasProcessing) {
        return "Processing";
      }

      if (hasPending) {
        return "Pending";
      }

      if (
        eventTransactions.length > 0 &&
        eventTransactions.every(
          (transaction) =>
            transaction.status ===
              "Completed" ||
            transaction.status ===
              "Settled",
        )
      ) {
        return "Completed";
      }

      return "Pending";
    }, [eventTransactions]);

  /* ---------------------------------------------------------------------- */
  /* HISTORY / INVOICES                                                     */
  /* ---------------------------------------------------------------------- */

  const settlementHistory =
    useMemo<SettlementHistoryItem[]>(
      () => allSettlementHistory,
      [allSettlementHistory],
    );

  const invoices =
    useMemo<Invoice[]>(
      () => allInvoices,
      [allInvoices],
    );

  /* ---------------------------------------------------------------------- */
  /* FILTERS                                                                */
  /* ---------------------------------------------------------------------- */

  const filteredTransactions =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return eventTransactions.filter(
        (transaction) => {
          const matchesSearch =
            !query ||
            transaction.orderId
              .toLowerCase()
              .includes(query) ||
            transaction.name
              .toLowerCase()
              .includes(query) ||
            transaction.ticketType
              .toLowerCase()
              .includes(query) ||
            transaction.paymentMethod
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            selectedStatus ===
              "All Statuses" ||
            transaction.status ===
              selectedStatus;

          const matchesDate =
            selectedDate === "All Dates" ||
            transaction.date.includes(
              selectedDate,
            );

          return (
            matchesSearch &&
            matchesStatus &&
            matchesDate
          );
        },
      );
    }, [
      eventTransactions,
      search,
      selectedStatus,
      selectedDate,
    ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredTransactions.length /
        pageSize,
    ),
  );

  const safePage = Math.min(
    page,
    totalPages,
  );

  const visibleTransactions =
    filteredTransactions.slice(
      (safePage - 1) * pageSize,
      safePage * pageSize,
    );

  /* ---------------------------------------------------------------------- */
  /* EVENT HANDLING                                                         */
  /* ---------------------------------------------------------------------- */

  function changeEvent(
    eventName: string,
  ) {
    setSelectedEventName(eventName);
    setEventOpen(false);
    setPage(1);
    setSearch("");
    setSelectedStatus(
      "All Statuses",
    );
    setSelectedDate("All Dates");
    setActiveTab("transactions");
    setTransactionMenu(null);
  }

  function changePage(
    nextPage: number,
  ) {
    if (
      nextPage < 1 ||
      nextPage > totalPages
    ) {
      return;
    }

    setPage(nextPage);
    setTransactionMenu(null);
  }

  function changePageSize(
    size: number,
  ) {
    setPageSize(size);
    setPage(1);
    setPageSizeOpen(false);
  }

  /* ---------------------------------------------------------------------- */
  /* EXPORT                                                                 */
  /* ---------------------------------------------------------------------- */

  function exportTransactions() {
    const rows =
      filteredTransactions.map(
        (transaction) => [
          transaction.orderId,
          transaction.name,
          transaction.ticketType,
          transaction.amount,
          transaction.paymentMethod,
          transaction.status,
          transaction.date,
          transaction.time,
        ],
      );

    const csvRows = [
      [
        "Order ID",
        "Name",
        "Ticket Type",
        "Amount",
        "Payment Method",
        "Status",
        "Date",
        "Time",
      ],
      ...rows,
    ];

    const csv = csvRows
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(value).replace(
                /"/g,
                '""',
              )}"`,
          )
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = `${settlementMeta.prefix}-settlements.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setShowExportMessage(true);

    window.setTimeout(() => {
      setShowExportMessage(false);
    }, 2500);
  }

  /* ---------------------------------------------------------------------- */
  /* COPY                                                                    */
  /* ---------------------------------------------------------------------- */

  async function copyValue(
    value: string,
    field: string,
  ) {
    try {
      await navigator.clipboard.writeText(
        value,
      );

      setCopiedField(field);

      window.setTimeout(() => {
        setCopiedField("");
      }, 1500);
    } catch {
      setCopiedField("");
    }
  }

  /* ---------------------------------------------------------------------- */
  /* PAGINATION                                                             */
  /* ---------------------------------------------------------------------- */

  const paginationItems: Array<
    number | "ellipsis"
  > = [];

  if (totalPages <= 7) {
    for (
      let i = 1;
      i <= totalPages;
      i += 1
    ) {
      paginationItems.push(i);
    }
  } else {
    paginationItems.push(
      1,
      2,
      3,
      4,
      5,
    );

    paginationItems.push(
      "ellipsis",
    );

    paginationItems.push(
      totalPages,
    );
  }

  /* ---------------------------------------------------------------------- */
  /* RENDER                                                                  */
  /* ---------------------------------------------------------------------- */

  
  return (
    <>


        <div className="px-5 pb-8 pt-5 xl:px-6">
          {/* Back */}
          <Link
            href="/events"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            Back to Events
          </Link>

          {/* Title row */}
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[29px] font-bold leading-tight tracking-[-1px] text-slate-950">
                Settlements
              </h1>

              <p className="mt-0.5 text-[17px] text-slate-500">
                Track payments, settlements and payouts for your event.
              </p>
            </div>

            {/* Event dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setEventOpen(
                    (value) => !value,
                  );
                  setStatusOpen(false);
                  setDateOpen(false);
                  setPageSizeOpen(false);
                }}
                className="flex min-w-[196px] items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm"
              >
                <span>
                  {currentEvent.title}
                </span>

                <ChevronDown
                  size={17}
                  className="text-slate-500"
                />
              </button>

              {eventOpen && (
                <div className="absolute right-0 z-50 mt-2 w-[230px] overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                  {organizerEvents.map(
                    (event) => (
                      <button
                        type="button"
                        key={event.id}
                        onClick={() =>
                          changeEvent(
                            event.title,
                          )
                        }
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                          currentEvent.title ===
                          event.title
                            ? "bg-emerald-50 font-semibold text-emerald-700"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span>
                          {event.title}
                        </span>

                        {currentEvent.title ===
                          event.title && (
                          <Check size={16} />
                        )}
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* EVENT CARD                                                       */}
          {/* ---------------------------------------------------------------- */}

          <section className="mb-4 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm">
            <div className="flex items-center gap-4">
              <div
                className={`relative flex h-[96px] w-[220px] shrink-0 items-center justify-center overflow-hidden rounded-lg ${currentEvent.gradient}`}
              >
                <div className="absolute inset-0 bg-black/15" />

                <div className="relative px-4 text-center">
                  <div className="text-[22px] font-black uppercase italic leading-none tracking-tight text-white drop-shadow-md">
                    {currentEvent.title}
                  </div>

                  <div className="mt-2 text-[10px] font-bold uppercase tracking-[3px] text-white/90">
                    KITSW EVENT
                  </div>
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-[17px] font-bold text-slate-950">
                  {currentEvent.title}
                </h2>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  <span>
                    {currentEvent.date}
                  </span>

                  <span>•</span>

                  <span>
                    {currentEvent.venue}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {currentEvent.tags.map(
                    (tag) => (
                      <EventTag key={tag}>
                        {tag}
                      </EventTag>
                    ),
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Live
                </span>

                <Link
                  href="/events"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  View Event
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------------- */}
          {/* KPI CARDS                                                        */}
          {/* ---------------------------------------------------------------- */}

          <section className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              icon={<Wallet size={22} />}
              title="Total Collection"
              value={formatCurrency(
                collection,
              )}
              subtitle={`From ${tickets} tickets`}
              variant="green"
            />

            <SummaryCard
              icon={<Percent size={23} />}
              title="Platform Fee (2%)"
              value={`- ${formatCurrency(
                platformFee,
              )}`}
              subtitle="Deducted automatically"
              variant="blue"
            />

            <SummaryCard
              icon={<Landmark size={22} />}
              title="Net Settlement"
              value={formatCurrency(
                netSettlement,
              )}
              subtitle="To be transferred"
              variant="purple"
            />

            <SummaryCard
              icon={<Clock3 size={22} />}
              title="Settlement Status"
              value={settlementStatus}
              subtitle={
                <>
                  Scheduled on
                  <br />
                  {settlementMeta.scheduledDate}
                </>
              }
              variant="orange"
              valueClass="text-orange-500"
            />
          </section>

          {/* ---------------------------------------------------------------- */}
          {/* CONTENT GRID                                                     */}
          {/* ---------------------------------------------------------------- */}

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_270px]">
            {/* LEFT */}
            <section className="min-w-0">
              {/* Tabs */}
              <div className="flex border-b border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab(
                      "transactions",
                    );
                    setPage(1);
                  }}
                  className={`relative px-5 py-3 text-sm font-semibold ${
                    activeTab === "transactions"
                      ? "text-emerald-600"
                      : "text-slate-600"
                  }`}
                >
                  Transactions

                  {activeTab ===
                    "transactions" && (
                    <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-emerald-500" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab(
                      "history",
                    );
                    setPage(1);
                  }}
                  className={`relative px-5 py-3 text-sm font-semibold ${
                    activeTab === "history"
                      ? "text-emerald-600"
                      : "text-slate-600"
                  }`}
                >
                  Settlement History

                  {activeTab ===
                    "history" && (
                    <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-emerald-500" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab(
                      "invoices",
                    );
                    setPage(1);
                  }}
                  className={`relative px-5 py-3 text-sm font-semibold ${
                    activeTab === "invoices"
                      ? "text-emerald-600"
                      : "text-slate-600"
                  }`}
                >
                  Invoices

                  {activeTab ===
                    "invoices" && (
                    <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-emerald-500" />
                  )}
                </button>
              </div>

              {/* ------------------------------------------------------------ */}
              {/* TRANSACTIONS                                                 */}
              {/* ------------------------------------------------------------ */}

              {activeTab ===
                "transactions" && (
                <>
                  <div className="flex flex-wrap items-center gap-3 py-4">
                    <div className="relative min-w-[260px] flex-1">
                      <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        value={search}
                        onChange={(event) => {
                          setSearch(
                            event.target
                              .value,
                          );
                          setPage(1);
                        }}
                        placeholder="Search by order ID, name, email..."
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-emerald-400"
                      />
                    </div>

                    {/* Status */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setStatusOpen(
                            (value) =>
                              !value,
                          );
                          setDateOpen(false);
                          setPageSizeOpen(
                            false,
                          );
                          setEventOpen(false);
                        }}
                        className="flex h-10 min-w-[130px] items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700"
                      >
                        {selectedStatus}
                        <ChevronDown size={15} />
                      </button>

                      {statusOpen && (
                        <div className="absolute left-0 z-40 mt-2 w-[160px] rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                          {[
                            "All Statuses",
                            "Settled",
                            "Processing",
                            "Pending",
                            "Completed",
                            "Failed",
                          ].map(
                            (status) => (
                              <button
                                type="button"
                                key={status}
                                onClick={() => {
                                  setSelectedStatus(
                                    status,
                                  );
                                  setStatusOpen(
                                    false,
                                  );
                                  setPage(1);
                                }}
                                className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                                  selectedStatus ===
                                  status
                                    ? "bg-emerald-50 font-semibold text-emerald-700"
                                    : "text-slate-700 hover:bg-slate-50"
                                }`}
                              >
                                {status}
                              </button>
                            ),
                          )}
                        </div>
                      )}
                    </div>

                    {/* Date */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setDateOpen(
                            (value) =>
                              !value,
                          );
                          setStatusOpen(
                            false,
                          );
                          setPageSizeOpen(
                            false,
                          );
                          setEventOpen(false);
                        }}
                        className="flex h-10 min-w-[145px] items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700"
                      >
                        <span className="flex items-center gap-2">
                          <CalendarDays size={15} />
                          {selectedDate}
                        </span>

                        <ChevronDown size={15} />
                      </button>

                      {dateOpen && (
                        <div className="absolute left-0 z-40 mt-2 w-[160px] rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                          {[
                            "All Dates",
                            "Oct 5",
                            "Oct 10",
                            "Oct 15",
                            "Oct 20",
                          ].map(
                            (date) => (
                              <button
                                type="button"
                                key={date}
                                onClick={() => {
                                  setSelectedDate(
                                    date,
                                  );
                                  setDateOpen(
                                    false,
                                  );
                                  setPage(1);
                                }}
                                className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                                  selectedDate ===
                                  date
                                    ? "bg-emerald-50 font-semibold text-emerald-700"
                                    : "text-slate-700 hover:bg-slate-50"
                                }`}
                              >
                                {date}
                              </button>
                            ),
                          )}
                        </div>
                      )}
                    </div>

                    {/* Export */}
                    <button
                      type="button"
                      onClick={
                        exportTransactions
                      }
                      className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      <Download size={17} />
                      Export
                    </button>
                  </div>

                  {showExportMessage && (
                    <div className="mb-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700">
                      <Check size={16} />
                      Settlement CSV exported successfully.
                    </div>
                  )}

                  <div className="overflow-hidden rounded-xl border border-slate-100">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[850px] border-collapse text-left">
                        <thead>
                          <tr className="bg-slate-50 text-xs font-semibold text-slate-600">
                            <th className="px-3 py-3">
                              #
                            </th>

                            <th className="px-3 py-3">
                              Order ID
                            </th>

                            <th className="px-3 py-3">
                              Name
                            </th>

                            <th className="px-3 py-3">
                              Ticket Type
                            </th>

                            <th className="px-3 py-3">
                              Amount
                            </th>

                            <th className="px-3 py-3">
                              Payment Method
                            </th>

                            <th className="px-3 py-3">
                              Status
                            </th>

                            <th className="px-3 py-3">
                              Date & Time
                            </th>

                            <th className="w-10 px-2 py-3" />
                          </tr>
                        </thead>

                        <tbody>
                          {visibleTransactions.map(
                            (
                              transaction,
                              index,
                            ) => (
                              <tr
                                key={
                                  transaction.id
                                }
                                className="border-t border-slate-100 text-sm"
                              >
                                <td className="px-3 py-3 text-slate-600">
                                  {(safePage -
                                    1) *
                                    pageSize +
                                    index +
                                    1}
                                </td>

                                <td className="px-3 py-3 font-semibold text-blue-600">
                                  {
                                    transaction.orderId
                                  }
                                </td>

                                <td className="px-3 py-3 font-medium text-slate-700">
                                  {
                                    transaction.name
                                  }
                                </td>

                                <td className="px-3 py-3 text-slate-700">
                                  {
                                    transaction.ticketType
                                  }
                                </td>

                                <td className="px-3 py-3 font-semibold text-slate-700">
                                  {formatCurrency(
                                    transaction.amount,
                                  )}
                                </td>

                                <td className="px-3 py-3 text-slate-700">
                                  {
                                    transaction.paymentMethod
                                  }
                                </td>

                                <td className="px-3 py-3">
                                  <StatusBadge
                                    status={getDisplayStatus(
                                      transaction.status,
                                    )}
                                  />
                                </td>

                                <td className="px-3 py-3 text-slate-600">
                                  <div>
                                    {
                                      transaction.date
                                    }
                                  </div>

                                  <div>
                                    {
                                      transaction.time
                                    }
                                  </div>
                                </td>

                                <td className="relative px-2 py-3">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setTransactionMenu(
                                        transactionMenu ===
                                          transaction.id
                                          ? null
                                          : transaction.id,
                                      )
                                    }
                                    className="rounded-md p-1 text-slate-600 hover:bg-slate-100"
                                  >
                                    <MoreVertical
                                      size={
                                        17
                                      }
                                    />
                                  </button>

                                  {transactionMenu ===
                                    transaction.id && (
                                    <div className="absolute right-2 top-10 z-40 w-[160px] rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setSelectedTransaction(
                                            transaction,
                                          );
                                          setTransactionMenu(
                                            null,
                                          );
                                        }}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                                      >
                                        <Eye size={15} />
                                        View Details
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => {
                                          copyValue(
                                            transaction.orderId,
                                            `order-${transaction.id}`,
                                          );
                                          setTransactionMenu(
                                            null,
                                          );
                                        }}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                                      >
                                        <Copy size={15} />
                                        Copy Order ID
                                      </button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ),
                          )}

                          {visibleTransactions.length ===
                            0 && (
                            <tr>
                              <td
                                colSpan={9}
                                className="px-5 py-12 text-center text-sm text-slate-500"
                              >
                                No settlement transactions found for this event.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 py-4">
                    <div className="text-sm text-slate-500">
                      Showing{" "}
                      {filteredTransactions.length ===
                      0
                        ? 0
                        : (safePage -
                            1) *
                            pageSize +
                          1}
                      -
                      {Math.min(
                        safePage *
                          pageSize,
                        filteredTransactions.length,
                      )}{" "}
                      of{" "}
                      {
                        filteredTransactions.length
                      }{" "}
                      transactions
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={
                          safePage === 1
                        }
                        onClick={() =>
                          changePage(
                            safePage - 1,
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      {paginationItems.map(
                        (
                          item,
                          index,
                        ) => {
                          if (
                            item ===
                            "ellipsis"
                          ) {
                            return (
                              <span
                                key={`ellipsis-${index}`}
                                className="px-1.5 text-sm text-slate-500"
                              >
                                ...
                              </span>
                            );
                          }

                          return (
                            <button
                              type="button"
                              key={item}
                              onClick={() =>
                                changePage(
                                  item,
                                )
                              }
                              className={`flex h-8 min-w-8 items-center justify-center rounded-lg border px-2 text-sm font-medium ${
                                safePage ===
                                item
                                  ? "border-emerald-500 bg-emerald-500 text-white"
                                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                              }`}
                            >
                              {item}
                            </button>
                          );
                        },
                      )}

                      <button
                        type="button"
                        disabled={
                          safePage ===
                          totalPages
                        }
                        onClick={() =>
                          changePage(
                            safePage + 1,
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronRight size={16} />
                      </button>

                      <div className="relative ml-3">
                        <button
                          type="button"
                          onClick={() => {
                            setPageSizeOpen(
                              (value) =>
                                !value,
                            );
                            setEventOpen(
                              false,
                            );
                            setStatusOpen(
                              false,
                            );
                            setDateOpen(
                              false,
                            );
                          }}
                          className="flex h-8 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700"
                        >
                          {pageSize} per page
                          <ChevronDown size={14} />
                        </button>

                        {pageSizeOpen && (
                          <div className="absolute bottom-10 right-0 z-40 w-[130px] rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                            {[10, 20, 50].map(
                              (
                                size,
                              ) => (
                                <button
                                  type="button"
                                  key={size}
                                  onClick={() =>
                                    changePageSize(
                                      size,
                                    )
                                  }
                                  className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                                    pageSize ===
                                    size
                                      ? "bg-emerald-50 font-semibold text-emerald-700"
                                      : "text-slate-700 hover:bg-slate-50"
                                  }`}
                                >
                                  {size} per page
                                </button>
                              ),
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ------------------------------------------------------------ */}
              {/* HISTORY                                                       */}
              {/* ------------------------------------------------------------ */}

              {activeTab ===
                "history" && (
                <div className="py-4">
                  <div className="overflow-hidden rounded-xl border border-slate-200">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 text-xs font-semibold text-slate-600">
                        <tr>
                          <th className="px-4 py-3">
                            Settlement Date
                          </th>

                          <th className="px-4 py-3">
                            Amount
                          </th>

                          <th className="px-4 py-3">
                            Status
                          </th>

                          <th className="px-4 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {settlementHistory.map(
                          (
                            settlement,
                          ) => (
                            <tr
                              key={`${settlement.date}-${settlement.amount}`}
                              className="border-t border-slate-100 text-sm"
                            >
                              <td className="px-4 py-4 text-slate-700">
                                {
                                  settlement.date
                                }
                              </td>

                              <td className="px-4 py-4 font-semibold text-slate-900">
                                {formatCurrency(
                                  settlement.amount,
                                )}
                              </td>

                              <td className="px-4 py-4">
                                <StatusBadge
                                  status={
                                    settlement.status as SettlementDisplayStatus
                                  }
                                />
                              </td>

                              <td className="px-4 py-4">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowAllSettlements(
                                      true,
                                    )
                                  }
                                  className="font-semibold text-emerald-600 hover:underline"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          ),
                        )}

                        {settlementHistory.length ===
                          0 && (
                          <tr>
                            <td
                              colSpan={4}
                              className="px-5 py-12 text-center text-sm text-slate-500"
                            >
                              No settlement history available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------ */}
              {/* INVOICES                                                      */}
              {/* ------------------------------------------------------------ */}

              {activeTab ===
                "invoices" && (
                <div className="py-4">
                  <div className="overflow-hidden rounded-xl border border-slate-200">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 text-xs font-semibold text-slate-600">
                        <tr>
                          <th className="px-4 py-3">
                            Invoice
                          </th>

                          <th className="px-4 py-3">
                            Date
                          </th>

                          <th className="px-4 py-3">
                            Amount
                          </th>

                          <th className="px-4 py-3">
                            Status
                          </th>

                          <th className="px-4 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {invoices.map(
                          (invoice) => (
                            <tr
                              key={invoice.id}
                              className="border-t border-slate-100 text-sm"
                            >
                              <td className="px-4 py-4 font-semibold text-blue-600">
                                {invoice.id}
                              </td>

                              <td className="px-4 py-4 text-slate-700">
                                {invoice.date}
                              </td>

                              <td className="px-4 py-4 font-semibold text-slate-900">
                                {formatCurrency(
                                  invoice.amount,
                                )}
                              </td>

                              <td className="px-4 py-4">
                                <span
                                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                    invoice.status ===
                                      "Paid" ||
                                    invoice.status ===
                                      "Completed"
                                      ? "bg-emerald-50 text-emerald-600"
                                      : invoice.status ===
                                            "Failed"
                                        ? "bg-red-50 text-red-600"
                                        : "bg-amber-50 text-amber-600"
                                  }`}
                                >
                                  {invoice.status}
                                </span>
                              </td>

                              <td className="px-4 py-4">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowInvoice(
                                      invoice,
                                    )
                                  }
                                  className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 hover:underline"
                                >
                                  <Eye size={14} />
                                  View Invoice
                                </button>
                              </td>
                            </tr>
                          ),
                        )}

                        {invoices.length ===
                          0 && (
                          <tr>
                            <td
                              colSpan={5}
                              className="px-5 py-12 text-center text-sm text-slate-500"
                            >
                              No invoices available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>

            {/* ---------------------------------------------------------------- */}
            {/* RIGHT SIDEBAR                                                    */}
            {/* ---------------------------------------------------------------- */}

            <aside className="space-y-3">
              <InfoCard
                title="Settlement Details"
                icon={<Landmark size={18} />}
              >
                <DetailRow
                  label="Payout To"
                  value={
                    settlementMeta.payoutTo
                  }
                />

                <DetailRow
                  label="Bank Account"
                  value={
                    settlementMeta.bankAccount
                  }
                  copy
                  copied={
                    copiedField ===
                    "bank"
                  }
                  onCopy={() =>
                    copyValue(
                      settlementMeta.bankAccount,
                      "bank",
                    )
                  }
                />

                <DetailRow
                  label="IFSC Code"
                  value={
                    settlementMeta.ifsc
                  }
                  copy
                  copied={
                    copiedField === "ifsc"
                  }
                  onCopy={() =>
                    copyValue(
                      settlementMeta.ifsc,
                      "ifsc",
                    )
                  }
                />

                <DetailRow
                  label="Account Holder"
                  value={
                    settlementMeta.accountHolder
                  }
                />

                <DetailRow
                  label="Settlement Cycle"
                  value={
                    settlementMeta.settlementCycle
                  }
                />
              </InfoCard>

              <InfoCard
                title="Upcoming Settlement"
                icon={<CalendarDays size={18} />}
              >
                <DetailRow
                  label="Amount"
                  value={formatCurrency(
                    netSettlement,
                  )}
                />

                <DetailRow
                  label="Scheduled Date"
                  value={
                    settlementMeta.scheduledDate
                  }
                />

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-xs text-slate-500">
                    Status
                  </span>

                  <StatusBadge
                    status={
                      settlementStatus
                    }
                  />
                </div>
              </InfoCard>

              <InfoCard
                title="Past Settlements"
                icon={<History size={18} />}
              >
                {settlementHistory
                  .slice(0, 3)
                  .map(
                    (settlement) => (
                      <div
                        key={`${settlement.date}-${settlement.amount}`}
                        className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 pt-1 text-xs last:border-0 last:pb-0"
                      >
                        <span className="text-slate-500">
                          {settlement.date}
                        </span>

                        <span className="font-semibold text-slate-700">
                          {formatCurrency(
                            settlement.amount,
                          )}
                        </span>

                        <span
                          className={`rounded-full px-2 py-1 font-semibold ${getSettlementStatusClass(
                            settlement.status as SettlementDisplayStatus,
                          )}`}
                        >
                          {settlement.status}
                        </span>
                      </div>
                    ),
                  )}

                {settlementHistory.length ===
                  0 && (
                  <p className="text-xs text-slate-500">
                    No previous settlements.
                  </p>
                )}

                <button
                  type="button"
                  onClick={() =>
                    setShowAllSettlements(
                      true,
                    )
                  }
                  className="mt-4 flex w-full items-center justify-center gap-2 text-sm font-semibold text-emerald-600 hover:underline"
                >
                  View All Settlements
                  <ArrowRight size={16} />
                </button>
              </InfoCard>

              <div className="rounded-xl border border-slate-200 bg-blue-50/50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <AlertCircle size={18} />
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">
                    Need help with settlements?
                  </h3>
                </div>

                <p className="text-xs leading-5 text-slate-500">
                  For any payout or payment related queries, reach out to our support team.
                </p>

                <button
                  type="button"
                  className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-600 underline"
                >
                  Contact Support
                  <ArrowRight size={13} />
                </button>
              </div>
            </aside>
          </div>
        </div>
{/* -------------------------------------------------------------------- */}
      {/* TRANSACTION MODAL                                                    */}
      {/* -------------------------------------------------------------------- */}

      {selectedTransaction && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h3 className="font-bold text-slate-900">
                  Transaction Details
                </h3>

                <p className="mt-0.5 text-xs text-slate-500">
                  {
                    selectedTransaction.orderId
                  }
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedTransaction(
                    null,
                  )
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 px-5 py-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">
                    Name
                  </div>

                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {
                      selectedTransaction.name
                    }
                  </div>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">
                    Ticket Type
                  </div>

                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {
                      selectedTransaction.ticketType
                    }
                  </div>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">
                    Amount
                  </div>

                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {formatCurrency(
                      selectedTransaction.amount,
                    )}
                  </div>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">
                    Status
                  </div>

                  <div className="mt-2">
                    <StatusBadge
                      status={getDisplayStatus(
                        selectedTransaction.status,
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-xs text-slate-500">
                  Payment Method
                </div>

                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {
                    selectedTransaction.paymentMethod
                  }
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-xs text-slate-500">
                  Date & Time
                </div>

                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {
                    selectedTransaction.date
                  }{" "}
                  {
                    selectedTransaction.time
                  }
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-100 px-5 py-4">
              <button
                type="button"
                onClick={() =>
                  setSelectedTransaction(
                    null,
                  )
                }
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* ALL SETTLEMENTS MODAL                                                */}
      {/* -------------------------------------------------------------------- */}

      {showAllSettlements && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h3 className="font-bold text-slate-900">
                  Settlement History
                </h3>

                <p className="mt-0.5 text-xs text-slate-500">
                  {currentEvent.title}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAllSettlements(
                    false,
                  )
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto px-5 py-4">
              <div className="space-y-3">
                {settlementHistory.map(
                  (settlement) => (
                    <div
                      key={`${settlement.date}-${settlement.amount}`}
                      className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
                    >
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {
                            settlement.date
                          }
                        </div>

                        <div className="mt-1 text-xs text-slate-500">
                          Settlement record for{" "}
                          {
                            currentEvent.title
                          }
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-slate-900">
                          {formatCurrency(
                            settlement.amount,
                          )}
                        </div>

                        <div className="mt-1">
                          <StatusBadge
                            status={
                              settlement.status as SettlementDisplayStatus
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ),
                )}

                {settlementHistory.length ===
                  0 && (
                  <div className="py-12 text-center text-sm text-slate-500">
                    No settlement history available.
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-100 px-5 py-4">
              <button
                type="button"
                onClick={() =>
                  setShowAllSettlements(
                    false,
                  )
                }
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* INVOICE MODAL                                                        */}
      {/* -------------------------------------------------------------------- */}

      {showInvoice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h3 className="font-bold text-slate-900">
                  Invoice
                </h3>

                <p className="mt-0.5 text-xs text-slate-500">
                  {showInvoice.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowInvoice(null)
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 px-5 py-5">
              <div className="flex items-center justify-center rounded-xl bg-slate-50 py-8">
                <div className="text-center">
                  <FileText
                    size={42}
                    className="mx-auto text-blue-500"
                  />

                  <div className="mt-3 text-sm font-bold text-slate-900">
                    {showInvoice.id}
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    {currentEvent.title}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Invoice Date
                </span>

                <span className="font-semibold text-slate-800">
                  {showInvoice.date}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Amount
                </span>

                <span className="font-bold text-slate-900">
                  {formatCurrency(
                    showInvoice.amount,
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Status
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    showInvoice.status ===
                      "Paid" ||
                    showInvoice.status ===
                      "Completed"
                      ? "bg-emerald-50 text-emerald-600"
                      : showInvoice.status ===
                          "Failed"
                        ? "bg-red-50 text-red-600"
                        : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {showInvoice.status}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4">
              <button
                type="button"
                onClick={() =>
                  setShowInvoice(null)
                }
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  const invoiceText =
                    [
                      `Invoice: ${showInvoice.id}`,
                      `Event: ${currentEvent.title}`,
                      `Date: ${showInvoice.date}`,
                      `Amount: ${formatCurrency(
                        showInvoice.amount,
                      )}`,
                      `Status: ${showInvoice.status}`,
                    ].join("\n");

                  const blob = new Blob(
                    [invoiceText],
                    {
                      type: "text/plain;charset=utf-8",
                    },
                  );

                  const url =
                    URL.createObjectURL(
                      blob,
                    );

                  const link =
                    document.createElement(
                      "a",
                    );

                  link.href = url;
                  link.download = `${showInvoice.id}.txt`;

                  document.body.appendChild(
                    link,
                  );

                  link.click();

                  document.body.removeChild(
                    link,
                  );

                  URL.revokeObjectURL(
                    url,
                  );
                }}
                className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white"
              >
                <Download size={15} />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

