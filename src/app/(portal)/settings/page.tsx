"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  ChevronDown,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  FileImage,
  Info,
  Link2,
  ScanLine,
  Settings2,
  ShieldCheck,
  Trash2,
  Users,
  WalletCards,
  X,
  Zap,
  Check,
  UserPlus,
  Mail,
  Smartphone,
  Lock,
  Globe,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

/* =========================================================
   TYPES
========================================================= */

type TabName =
  | "General"
  | "Team"
  | "Notifications"
  | "Payment & Payouts"
  | "Integrations"
  | "Security";

type ModalType =
  | "event"
  | "organizer"
  | "branding"
  | "additional"
  | "team"
  | "notifications"
  | "payment"
  | "integrations"
  | "security"
  | "archive"
  | "cancel"
  | "delete"
  | "duplicate"
  | "support"
  | null;

/* =========================================================
   NAVIGATION
========================================================= */

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
  },
  {
    label: "Settings",
    icon: Settings2,
    href: "/settings",
    active: true,
  },
];

const tabs: {
  label: TabName;
  icon: typeof Settings2;
}[] = [
  { label: "General", icon: Settings2 },
  { label: "Team", icon: Users },
  { label: "Notifications", icon: Bell },
  { label: "Payment & Payouts", icon: CreditCard },
  { label: "Integrations", icon: Link2 },
  { label: "Security", icon: ShieldCheck },
];

/* =========================================================
   EVENT DATA
========================================================= */

const eventOptions = [
  "Crescendo Fest 2026",
  "Tech Talk Series",
  "Cultural Night",
];

const initialEvents = {
  "Crescendo Fest 2026": {
    name: "Crescendo Fest 2026",
    date: "Oct 12, 2026, 4:00 PM – 10:00 PM",
    venue: "Main Auditorium, KITSW",
    location: "Warangal, Telangana 506015",
    description:
      "A celebration of music, culture and creativity. Join us for a day of unforgettable performances, food, and fun!",
    categories: ["Music", "Cultural", "College Event"],
    status: "Live",
    visibility: "Public",
    organization: "KITSW Cultural Club",
    email: "cultural@kitsw.ac.in",
    phone: "+91 98765 43210",
    website: "https://kitsw.ac.in/cultural",
    eventLink: "https://zordr.in/e/crescendo-2026",
  },

  "Tech Talk Series": {
    name: "Tech Talk Series",
    date: "Nov 08, 2026, 10:00 AM – 4:00 PM",
    venue: "Seminar Hall, KITSW",
    location: "Warangal, Telangana 506015",
    description:
      "An engaging technology event featuring industry speakers, technical sessions and student interaction.",
    categories: ["Technology", "Workshop", "College Event"],
    status: "Live",
    visibility: "Public",
    organization: "KITSW Tech Club",
    email: "techclub@kitsw.ac.in",
    phone: "+91 98765 43210",
    website: "https://kitsw.ac.in/tech",
    eventLink: "https://zordr.in/e/tech-talk-2026",
  },

  "Cultural Night": {
    name: "Cultural Night",
    date: "Dec 05, 2026, 5:00 PM – 10:00 PM",
    venue: "Open Air Theatre, KITSW",
    location: "Warangal, Telangana 506015",
    description:
      "An evening celebrating student talent, culture, music, dance and unforgettable performances.",
    categories: ["Cultural", "Music", "College Event"],
    status: "Live",
    visibility: "Public",
    organization: "KITSW Cultural Club",
    email: "cultural@kitsw.ac.in",
    phone: "+91 98765 43210",
    website: "https://kitsw.ac.in/cultural",
    eventLink: "https://zordr.in/e/cultural-night-2026",
  },
};

/* =========================================================
   TOAST
========================================================= */

function Toast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed right-6 top-6 z-[100] flex max-w-[360px] items-center gap-3 rounded-xl border border-[#bdeed9] bg-white px-4 py-3 shadow-[0_12px_40px_rgba(15,40,80,0.15)]">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e3f9ef]">
        <Check size={17} className="text-[#08a96c]" />
      </div>

      <p className="flex-1 text-sm font-semibold text-[#182143]">
        {message}
      </p>

      <button
        type="button"
        onClick={onClose}
        className="text-[#71809f] hover:text-[#182143]"
      >
        <X size={17} />
      </button>
    </div>
  );
}

/* =========================================================
   MODAL
========================================================= */

function Modal({
  title,
  subtitle,
  children,
  onClose,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0b1735]/35 p-5 backdrop-blur-[2px]">
      <div className="max-h-[90vh] w-full max-w-[620px] overflow-y-auto rounded-2xl bg-white shadow-[0_25px_80px_rgba(10,30,70,0.22)]">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-100 bg-white px-6 py-5">
          <div>
            <h2 className="text-[19px] font-bold text-[#182143]">
              {title}
            </h2>

            {subtitle && (
              <p className="mt-1 text-sm text-[#65769a]">
                {subtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#65769a] hover:bg-slate-100 hover:text-[#182143]"
          >
            <X size={19} />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

/* =========================================================
   INPUT
========================================================= */

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#182143]">
        {label}
      </span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-[#182143] outline-none transition focus:border-[#12b978] focus:ring-2 focus:ring-[#12b978]/10"
      />
    </label>
  );
}

/* =========================================================
   BUTTONS
========================================================= */

function PrimaryButton({
  children,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#10b978] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0ca76d]"
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#182143] transition hover:bg-slate-50"
    >
      {children}
    </button>
  );
}

/* =========================================================
   TOGGLE
========================================================= */

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        enabled ? "bg-[#16b978]" : "bg-slate-300"
      }`}
    >
      <div
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

/* =========================================================
   EDIT BUTTON
========================================================= */

function EditButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#182143] hover:bg-slate-50"
    >
      Edit
    </button>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function SettingsPage() {
  const [selectedEvent, setSelectedEvent] = useState(
    "Crescendo Fest 2026",
  );

  const [eventDropdownOpen, setEventDropdownOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<TabName>("General");

  const [modal, setModal] = useState<ModalType>(null);

  const [toast, setToast] = useState("");

  const [eventData, setEventData] = useState(initialEvents);

  const currentEvent = eventData[selectedEvent as keyof typeof eventData];

  /* SETTINGS TOGGLES */

  const [allowWaitlist, setAllowWaitlist] = useState(true);
  const [ageRestriction, setAgeRestriction] = useState(false);
  const [showAttendeeList, setShowAttendeeList] = useState(true);
  const [termsAndConditions, setTermsAndConditions] = useState(true);

  /* NOTIFICATIONS */

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [registrationNotifications, setRegistrationNotifications] =
    useState(true);
  const [paymentNotifications, setPaymentNotifications] = useState(true);

  /* SECURITY */

  const [twoFactor, setTwoFactor] = useState(false);

  /* EDIT FORM STATES */

  const [eventName, setEventName] = useState(currentEvent.name);
  const [eventDescription, setEventDescription] = useState(
    currentEvent.description,
  );
  const [organizationName, setOrganizationName] = useState(
    currentEvent.organization,
  );
  const [contactEmail, setContactEmail] = useState(currentEvent.email);
  const [contactPhone, setContactPhone] = useState(currentEvent.phone);
  const [website, setWebsite] = useState(currentEvent.website);

  /* =========================================================
     HELPERS
  ========================================================= */

  const showToast = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const openEditEvent = () => {
    setEventName(currentEvent.name);
    setEventDescription(currentEvent.description);
    setModal("event");
  };

  const openEditOrganizer = () => {
    setOrganizationName(currentEvent.organization);
    setContactEmail(currentEvent.email);
    setContactPhone(currentEvent.phone);
    setWebsite(currentEvent.website);
    setModal("organizer");
  };

  const saveEventInformation = () => {
    setEventData((previous) => ({
      ...previous,
      [selectedEvent]: {
        ...previous[selectedEvent as keyof typeof previous],
        name: eventName,
        description: eventDescription,
      },
    }));

    setModal(null);
    showToast("Event information updated successfully.");
  };

  const saveOrganizerInformation = () => {
    setEventData((previous) => ({
      ...previous,
      [selectedEvent]: {
        ...previous[selectedEvent as keyof typeof previous],
        organization: organizationName,
        email: contactEmail,
        phone: contactPhone,
        website,
      },
    }));

    setModal(null);
    showToast("Organizer information updated successfully.");
  };

  const handleEventChange = (eventNameValue: string) => {
    setSelectedEvent(eventNameValue);
    setEventDropdownOpen(false);

    const selected =
      eventData[eventNameValue as keyof typeof eventData];

    setEventName(selected.name);
    setEventDescription(selected.description);
    setOrganizationName(selected.organization);
    setContactEmail(selected.email);
    setContactPhone(selected.phone);
    setWebsite(selected.website);

    showToast(`${eventNameValue} selected.`);
  };

  const copyEventLink = async () => {
    try {
      await navigator.clipboard.writeText(currentEvent.eventLink);
      showToast("Event link copied to clipboard.");
    } catch {
      showToast("Event link copied.");
    }
  };

  const openEventPage = () => {
    window.open("/events/1", "_blank", "noopener,noreferrer");
  };

  const downloadQRCode = () => {
    const qrSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
        <rect width="500" height="500" fill="white"/>
        <rect x="30" y="30" width="440" height="440" rx="20" fill="#f7f9fc" stroke="#10b978" stroke-width="6"/>
        <text x="250" y="115" text-anchor="middle" font-family="Arial" font-size="28" font-weight="700" fill="#182143">
          Zordr Event
        </text>
        <text x="250" y="155" text-anchor="middle" font-family="Arial" font-size="21" fill="#53658f">
          ${currentEvent.name}
        </text>
        <g fill="#182143">
          <rect x="90" y="210" width="80" height="80"/>
          <rect x="330" y="210" width="80" height="80"/>
          <rect x="90" y="330" width="80" height="80"/>
          <rect x="200" y="210" width="35" height="35"/>
          <rect x="250" y="260" width="35" height="35"/>
          <rect x="200" y="320" width="35" height="35"/>
          <rect x="260" y="370" width="35" height="35"/>
          <rect x="320" y="330" width="35" height="35"/>
        </g>
        <text x="250" y="450" text-anchor="middle" font-family="Arial" font-size="16" fill="#53658f">
          Scan to view event
        </text>
      </svg>
    `;

    const blob = new Blob([qrSvg], {
      type: "image/svg+xml",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${currentEvent.name
      .replace(/\s+/g, "-")
      .toLowerCase()}-qr-code.svg`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    showToast("QR code downloaded.");
  };

  const duplicateEvent = () => {
    const duplicateName = `${currentEvent.name} Copy`;

    setEventData((previous) => ({
      ...previous,
      [duplicateName]: {
        ...previous[selectedEvent as keyof typeof previous],
        name: duplicateName,
      },
    }));

    setSelectedEvent(duplicateName);
    setModal(null);

    showToast("Event duplicated successfully.");
  };

  const archiveEvent = () => {
    setEventData((previous) => ({
      ...previous,
      [selectedEvent]: {
        ...previous[selectedEvent as keyof typeof previous],
        status: "Archived",
      },
    }));

    setModal(null);
    showToast("Event archived successfully.");
  };

  const cancelEvent = () => {
    setEventData((previous) => ({
      ...previous,
      [selectedEvent]: {
        ...previous[selectedEvent as keyof typeof previous],
        status: "Cancelled",
      },
    }));

    setModal(null);
    showToast("Event cancelled successfully.");
  };

  const deleteEvent = () => {
    const remainingEvents = Object.keys(eventData).filter(
      (event) => event !== selectedEvent,
    );

    if (remainingEvents.length === 0) {
      showToast("At least one event must remain.");
      setModal(null);
      return;
    }

    const nextEvent = remainingEvents[0];

    const copiedEvents = {
      ...eventData,
    };

    delete copiedEvents[selectedEvent as keyof typeof copiedEvents];

    setEventData(copiedEvents);
    setSelectedEvent(nextEvent);
    setModal(null);

    showToast("Event deleted successfully.");
  };

  const handleSupport = () => {
    window.location.href =
      "mailto:support@zordr.in?subject=Settings%20Support";
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-screen bg-white text-[#182143]">
      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast("")}
        />
      )}

      <div className="flex min-h-screen">
        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        <aside className="hidden w-[205px] shrink-0 border-r border-slate-100 bg-[#f9fffd] lg:block">
          <div className="sticky top-0 flex h-screen flex-col">
            {/* Logo */}

            <div className="px-7 pb-7 pt-5">
              <div className="text-[39px] font-black leading-none tracking-[-3px]">
                <span className="text-[#2bc993]">Z</span>
                <span className="text-[#151b3b]">ordr</span>
              </div>

              <p className="mt-1 text-[11px] font-medium text-[#53658f]">
                Events. Experiences. Together.
              </p>
            </div>

            {/* Navigation */}

            <nav className="px-3">
              {sidebarItems.map((item) => {
                const Icon = item.icon;

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

                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Help */}

            <div className="mx-5 mt-8 rounded-lg bg-[#e7faf3] p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-[#0bb978]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 11.5a8.5 8.5 0 0 1-12.9 7.2L4 20l1.3-3.1A8.5 8.5 0 1 1 20 11.5Z" />
                    <path d="M8.5 12.5c1.1 1.4 2.3 2 3.7 2.1" />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-bold text-[#182143]">
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
                onClick={handleSupport}
                className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#0aab6b] underline"
              >
                Contact Support
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </aside>

        {/* =====================================================
            MAIN
        ===================================================== */}

        <main className="min-w-0 flex-1">
          {/* TOP HEADER */}

          <header className="flex h-[51px] items-center justify-end border-b border-slate-100 px-6 sm:px-8 lg:px-10">
            <div className="flex items-center gap-7">
              <button
                type="button"
                onClick={() =>
                  showToast("You have no new notifications.")
                }
                className="relative rounded-lg p-1 hover:bg-slate-50"
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
                  showToast("Organizer profile menu.")
                }
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-black">
                  <span className="text-lg">⚡</span>
                </div>

                <div className="hidden text-left sm:block">
                  <p className="text-sm font-bold leading-4 text-[#182143]">
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

          <div className="px-5 pb-10 pt-8 sm:px-8 lg:px-6 xl:px-6">
            {/* TITLE */}

            <div className="mb-5 flex items-start justify-between gap-5">
              <div>
                <h1 className="text-[32px] font-bold leading-9 tracking-[-1px] text-[#101733]">
                  Settings
                </h1>

                <p className="mt-1 text-[18px] leading-6 text-[#536b9d]">
                  Manage your event settings, preferences and team
                  members.
                </p>
              </div>

              {/* EVENT DROPDOWN */}

              <div className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() =>
                    setEventDropdownOpen(
                      !eventDropdownOpen,
                    )
                  }
                  className="flex h-[42px] min-w-[198px] items-center justify-between rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-[#182143] shadow-sm"
                >
                  {selectedEvent}

                  <ChevronDown
                    size={17}
                    className={`text-[#42547f] transition ${
                      eventDropdownOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {eventDropdownOpen && (
                  <div className="absolute right-0 top-[48px] z-50 w-[250px] overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_15px_45px_rgba(20,40,80,0.16)]">
                    {Object.keys(eventData).map(
                      (eventName) => (
                        <button
                          key={eventName}
                          type="button"
                          onClick={() =>
                            handleEventChange(eventName)
                          }
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition hover:bg-[#eef9f5] ${
                            eventName === selectedEvent
                              ? "bg-[#e7faf3] text-[#079f67]"
                              : "text-[#34446d]"
                          }`}
                        >
                          <span>{eventName}</span>

                          {eventName === selectedEvent && (
                            <Check size={16} />
                          )}
                        </button>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* =================================================
                TABS
            ================================================= */}

            <div className="mb-5 flex overflow-x-auto border-b border-slate-200">
              {tabs.map((tab) => {
                const Icon = tab.icon;

                const active =
                  activeTab === tab.label;

                return (
                  <button
                    type="button"
                    key={tab.label}
                    onClick={() =>
                      setActiveTab(tab.label)
                    }
                    className={`flex min-w-max items-center gap-2 px-5 pb-3 pt-1 text-[14px] font-semibold transition ${
                      active
                        ? "border-b-2 border-[#11b978] text-[#079f67]"
                        : "text-[#465780] hover:text-[#182143]"
                    }`}
                  >
                    <Icon
                      size={18}
                      strokeWidth={2}
                    />

                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* =================================================
                GENERAL TAB
            ================================================= */}

            {activeTab === "General" && (
              <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_288px]">
                {/* LEFT */}

                <div className="space-y-4">
                  {/* EVENT INFORMATION */}

                  <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_1px_5px_rgba(20,40,80,0.03)]">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eaf2ff]">
                          <CalendarDays
                            size={23}
                            className="text-[#1671e8]"
                          />
                        </div>

                        <div>
                          <h2 className="text-[16px] font-bold">
                            Event Information
                          </h2>

                          <p className="text-sm text-[#53658f]">
                            Update your event details and basic
                            information.
                          </p>
                        </div>
                      </div>

                      <EditButton
                        onClick={openEditEvent}
                      />
                    </div>

                    <div className="mt-5 grid gap-5 md:grid-cols-[1.5fr_1fr]">
                      <div>
                        <InfoRow
                          label="Event Name"
                          value={currentEvent.name}
                        />

                        <div className="mt-4">
                          <InfoRow
                            label="Description"
                            value={currentEvent.description}
                          />
                        </div>

                        <div className="mt-4">
                          <p className="text-sm font-bold">
                            Category
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2">
                            {currentEvent.categories.map(
                              (category) => (
                                <Tag key={category}>
                                  {category}
                                </Tag>
                              ),
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <InfoRow
                          label="Event Date"
                          value={currentEvent.date}
                        />

                        <div className="mt-4">
                          <InfoRow
                            label="Venue"
                            value={
                              <>
                                {currentEvent.venue}
                                <br />
                                {currentEvent.location}
                              </>
                            }
                          />
                        </div>

                        <div className="mt-4">
                          <p className="text-sm font-bold">
                            Event Status
                          </p>

                          <div
                            className={`mt-1 inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm font-semibold ${
                              currentEvent.status ===
                              "Live"
                                ? "bg-[#e3f9ef] text-[#079f67]"
                                : currentEvent.status ===
                                    "Archived"
                                  ? "bg-slate-100 text-slate-600"
                                  : "bg-red-50 text-red-500"
                            }`}
                          >
                            <span
                              className={`h-2 w-2 rounded-full ${
                                currentEvent.status ===
                                "Live"
                                  ? "bg-[#0bb978]"
                                  : currentEvent.status ===
                                      "Archived"
                                    ? "bg-slate-500"
                                    : "bg-red-500"
                              }`}
                            />

                            {currentEvent.status}
                          </div>
                        </div>

                        <div className="mt-3">
                          <InfoRow
                            label="Visibility"
                            value={currentEvent.visibility}
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* ORGANIZER INFORMATION */}

                  <section className="rounded-lg border border-slate-200 bg-white p-5">
                    <div className="flex items-start justify-between">
                      <SectionHeader
                        icon={
                          <Users
                            size={23}
                            className="text-[#176ce5]"
                          />
                        }
                        title="Organizer Information"
                        subtitle="Manage organizer details and contact information."
                      />

                      <EditButton
                        onClick={openEditOrganizer}
                      />
                    </div>

                    <div className="mt-5 grid gap-5 md:grid-cols-2">
                      <div>
                        <InfoRow
                          label="Organization Name"
                          value={
                            currentEvent.organization
                          }
                        />

                        <div className="mt-4">
                          <InfoRow
                            label="Contact Email"
                            value={currentEvent.email}
                          />
                        </div>
                      </div>

                      <div>
                        <InfoRow
                          label="Contact Phone"
                          value={currentEvent.phone}
                        />

                        <div className="mt-4">
                          <InfoRow
                            label="Website (Optional)"
                            value={currentEvent.website}
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* EVENT BRANDING */}

                  <section className="rounded-lg border border-slate-200 bg-white p-5">
                    <div className="flex items-start justify-between">
                      <SectionHeader
                        icon={
                          <FileImage
                            size={23}
                            className="text-[#176ce5]"
                          />
                        }
                        title="Event Branding"
                        subtitle="Manage your event's visual identity."
                      />

                      <EditButton
                        onClick={() =>
                          setModal("branding")
                        }
                      />
                    </div>

                    <div className="mt-5 grid gap-6 md:grid-cols-[270px_1fr]">
                      <div>
                        <p className="text-sm font-bold">
                          Event Banner
                        </p>

                        <div className="mt-2 flex h-[78px] w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#30104f] via-[#8d1eaf] to-[#ef32bc]">
                          <div className="text-center text-white">
                            <p className="text-[20px] font-black italic">
                              CRESCENDO
                            </p>

                            <p className="text-[18px] font-black italic">
                              FEST 2026
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-bold">
                          Banner Guidelines
                        </p>

                        <div className="mt-2 space-y-2 text-sm text-[#53658f]">
                          <p>
                            <span className="mr-2 font-bold text-[#0bb978]">
                              ✓
                            </span>
                            Recommended size: 1920 × 1080 px
                          </p>

                          <p>
                            <span className="mr-2 font-bold text-[#0bb978]">
                              ✓
                            </span>
                            JPG or PNG (max 5 MB)
                          </p>

                          <p>
                            <span className="mr-2 font-bold text-[#0bb978]">
                              ✓
                            </span>
                            Keep important content in center
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* ADDITIONAL SETTINGS */}

                  <section className="rounded-lg border border-slate-200 bg-white p-5">
                    <div className="flex items-start justify-between">
                      <SectionHeader
                        icon={
                          <Settings2
                            size={23}
                            className="text-[#176ce5]"
                          />
                        }
                        title="Additional Settings"
                        subtitle="Configure other event preferences."
                      />

                      <EditButton
                        onClick={() =>
                          setModal("additional")
                        }
                      />
                    </div>

                    <div className="mt-5 grid gap-x-12 gap-y-5 md:grid-cols-2">
                      <SettingToggle
                        label="Allow Waitlist"
                        description="Allow users to join a waitlist when tickets are sold out."
                        enabled={allowWaitlist}
                        onChange={() =>
                          setAllowWaitlist(
                            !allowWaitlist,
                          )
                        }
                      />

                      <SettingToggle
                        label="Age Restriction"
                        description={
                          ageRestriction
                            ? "Age restriction is enabled for this event."
                            : "This event has no age restriction."
                        }
                        enabled={ageRestriction}
                        onChange={() =>
                          setAgeRestriction(
                            !ageRestriction,
                          )
                        }
                      />

                      <SettingToggle
                        label="Show Attendee List"
                        description="Make attendee list visible to other participants."
                        enabled={showAttendeeList}
                        onChange={() =>
                          setShowAttendeeList(
                            !showAttendeeList,
                          )
                        }
                      />

                      <SettingToggle
                        label="Terms & Conditions"
                        description="Display event terms and conditions during registration."
                        enabled={termsAndConditions}
                        onChange={() =>
                          setTermsAndConditions(
                            !termsAndConditions,
                          )
                        }
                      />
                    </div>
                  </section>
                </div>

                {/* RIGHT */}

                <div className="space-y-4">
                  {/* QUICK ACTIONS */}

                  <aside className="rounded-lg border border-slate-200 bg-[#faf8ff] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eee6ff]">
                        <Zap
                          size={20}
                          className="text-[#7047ed]"
                        />
                      </div>

                      <h2 className="text-[15px] font-bold">
                        Quick Actions
                      </h2>
                    </div>

                    <div className="mt-4 space-y-2">
                      <ActionButton
                        icon={
                          <ExternalLink size={18} />
                        }
                        text="View Event Page"
                        green
                        onClick={openEventPage}
                      />

                      <ActionButton
                        icon={
                          <ShieldCheck size={18} />
                        }
                        text="Copy Event Link"
                        iconRight={<Copy size={18} />}
                        onClick={copyEventLink}
                      />

                      <ActionButton
                        icon={
                          <Download size={18} />
                        }
                        text="Download QR Code"
                        onClick={downloadQRCode}
                      />

                      <ActionButton
                        icon={<Copy size={18} />}
                        text="Duplicate Event"
                        onClick={() =>
                          setModal("duplicate")
                        }
                      />

                      <ActionButton
                        icon={<Trash2 size={18} />}
                        text="Archive Event"
                        danger
                        onClick={() =>
                          setModal("archive")
                        }
                      />
                    </div>
                  </aside>

                  {/* EVENT LINK */}

                  <aside className="rounded-lg border border-slate-200 bg-white p-4">
                    <div className="flex items-center gap-3">
                      <Link2
                        size={23}
                        className="text-[#176ce5]"
                      />

                      <h2 className="text-[15px] font-bold">
                        Event Link
                      </h2>
                    </div>

                    <p className="mt-2 text-sm text-[#53658f]">
                      Share this link to promote your event.
                    </p>

                    <button
                      type="button"
                      onClick={copyEventLink}
                      className="mt-4 flex w-full items-center justify-between rounded-lg bg-[#f7f9fc] px-3 py-3 text-left text-xs text-[#53658f] hover:bg-[#eef3fa]"
                    >
                      <span className="truncate pr-3">
                        {currentEvent.eventLink}
                      </span>

                      <Copy
                        size={17}
                        className="shrink-0"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={openEventPage}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[#12b978] py-2.5 text-sm font-semibold text-[#08a96c]"
                    >
                      Open in New Tab
                      <ArrowRight size={16} />
                    </button>
                  </aside>

                  {/* DANGER ZONE */}

                  <aside className="rounded-lg border border-red-100 bg-[#fff9fa] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
                        <Trash2
                          size={20}
                          className="text-red-500"
                        />
                      </div>

                      <h2 className="text-[15px] font-bold text-red-600">
                        Danger Zone
                      </h2>
                    </div>

                    <p className="mt-2 text-sm leading-5 text-[#76546b]">
                      These actions are irreversible. Please
                      proceed with caution.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setModal("cancel")
                      }
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-red-400 bg-white py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={17} />
                      Cancel Event
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setModal("delete")
                      }
                      className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-red-400 bg-white py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={17} />
                      Delete Event
                    </button>
                  </aside>

                  {/* HELP */}

                  <aside className="rounded-lg bg-[#eef6ff] p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#dceaff] text-[#166ee8]">
                        <Info size={20} />
                      </div>

                      <div>
                        <h2 className="text-[15px] font-bold">
                          Need help?
                        </h2>

                        <p className="mt-1 text-sm leading-5 text-[#53658f]">
                          Have questions about settings?
                          <br />
                          Our support team is here to help.
                        </p>

                        <button
                          type="button"
                          onClick={handleSupport}
                          className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#0aa96d] underline"
                        >
                          Contact Support
                          <ArrowRight size={15} />
                        </button>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            )}

            {/* =================================================
                TEAM TAB
            ================================================= */}

            {activeTab === "Team" && (
              <SettingsPanel
                icon={<Users size={23} />}
                title="Team Members"
                subtitle="Manage people who can access your organizer dashboard."
              >
                <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e7faf3] font-bold text-[#08a96c]">
                      KC
                    </div>

                    <div>
                      <p className="font-bold">
                        KITSW Cultural Club
                      </p>

                      <p className="text-sm text-[#65769a]">
                        cultural@kitsw.ac.in
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-[#e3f9ef] px-3 py-1 text-xs font-semibold text-[#079f67]">
                    Owner
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef4ff]">
                      <UserPlus
                        size={19}
                        className="text-[#1767dc]"
                      />
                    </div>

                    <div>
                      <p className="font-bold">
                        Invite a team member
                      </p>

                      <p className="text-sm text-[#65769a]">
                        Give teammates access to manage events.
                      </p>
                    </div>
                  </div>

                  <PrimaryButton
                    onClick={() => showToast("Team invitation flow opened.")}
                  >
                    <UserPlus size={16} />
                    Invite
                  </PrimaryButton>
                </div>
              </SettingsPanel>
            )}

            {/* =================================================
                NOTIFICATIONS TAB
            ================================================= */}

            {activeTab === "Notifications" && (
              <SettingsPanel
                icon={<Bell size={23} />}
                title="Notification Preferences"
                subtitle="Choose which notifications you want to receive."
              >
                <NotificationRow
                  icon={<Mail size={19} />}
                  title="Email Notifications"
                  description="Receive important organizer updates by email."
                  enabled={emailNotifications}
                  onChange={() =>
                    setEmailNotifications(
                      !emailNotifications,
                    )
                  }
                />

                <NotificationRow
                  icon={<Users size={19} />}
                  title="Registration Notifications"
                  description="Get notified when someone registers for your event."
                  enabled={registrationNotifications}
                  onChange={() =>
                    setRegistrationNotifications(
                      !registrationNotifications,
                    )
                  }
                />

                <NotificationRow
                  icon={<CreditCard size={19} />}
                  title="Payment Notifications"
                  description="Receive updates about successful payments and settlements."
                  enabled={paymentNotifications}
                  onChange={() =>
                    setPaymentNotifications(
                      !paymentNotifications,
                    )
                  }
                />
              </SettingsPanel>
            )}

            {/* =================================================
                PAYMENT TAB
            ================================================= */}

            {activeTab === "Payment & Payouts" && (
              <SettingsPanel
                icon={<CreditCard size={23} />}
                title="Payment & Payouts"
                subtitle="Manage your payout account and payment preferences."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <PaymentCard
                    title="Payout Account"
                    value="HDFC Bank •••• 1234"
                    subtitle="Primary settlement account"
                  />

                  <PaymentCard
                    title="Settlement Schedule"
                    value="After Event"
                    subtitle="Payout is scheduled after event completion"
                  />

                  <PaymentCard
                    title="Platform Fee"
                    value="2%"
                    subtitle="Automatically deducted from settlements"
                  />

                  <PaymentCard
                    title="Currency"
                    value="INR (₹)"
                    subtitle="Indian Rupee"
                  />
                </div>

                <div className="mt-5 flex justify-end">
                  <PrimaryButton
                    onClick={() =>
                      showToast(
                        "Payment settings saved.",
                      )
                    }
                  >
                    <Save size={16} />
                    Save Changes
                  </PrimaryButton>
                </div>
              </SettingsPanel>
            )}

            {/* =================================================
                INTEGRATIONS TAB
            ================================================= */}

            {activeTab === "Integrations" && (
              <SettingsPanel
                icon={<Link2 size={23} />}
                title="Integrations"
                subtitle="Connect external services to your event."
              >
                <IntegrationRow
                  name="Event Webhooks"
                  description="Send event registration updates to another application."
                  connected={false}
                  onClick={() =>
                    showToast(
                      "Webhook configuration opened.",
                    )
                  }
                />

                <IntegrationRow
                  name="Google Calendar"
                  description="Sync important event dates with your calendar."
                  connected={false}
                  onClick={() =>
                    showToast(
                      "Google Calendar connection started.",
                    )
                  }
                />

                <IntegrationRow
                  name="Analytics"
                  description="Connect analytics tools to understand event traffic."
                  connected={true}
                  onClick={() =>
                    showToast(
                      "Analytics integration is already connected.",
                    )
                  }
                />
              </SettingsPanel>
            )}

            {/* =================================================
                SECURITY TAB
            ================================================= */}

            {activeTab === "Security" && (
              <SettingsPanel
                icon={<ShieldCheck size={23} />}
                title="Security"
                subtitle="Protect your organizer account and event data."
              >
                <NotificationRow
                  icon={<ShieldCheck size={19} />}
                  title="Two-Factor Authentication"
                  description="Add an additional security layer when signing in."
                  enabled={twoFactor}
                  onChange={() =>
                    setTwoFactor(!twoFactor)
                  }
                />

                <div className="mt-4 rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef4ff]">
                      <Lock
                        size={19}
                        className="text-[#1767dc]"
                      />
                    </div>

                    <div>
                      <p className="font-bold">
                        Password
                      </p>

                      <p className="text-sm text-[#65769a]">
                        Last changed recently.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        showToast(
                          "Password change flow opened.",
                        )
                      }
                      className="ml-auto rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </SettingsPanel>
            )}
          </div>
        </main>
      </div>

      {/* =====================================================
          EDIT EVENT MODAL
      ===================================================== */}

      {modal === "event" && (
        <Modal
          title="Edit Event Information"
          subtitle="Update your event details."
          onClose={() => setModal(null)}
        >
          <div className="space-y-4">
            <InputField
              label="Event Name"
              value={eventName}
              onChange={setEventName}
            />

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">
                Description
              </span>

              <textarea
                value={eventDescription}
                onChange={(e) =>
                  setEventDescription(e.target.value)
                }
                rows={5}
                className="w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-[#12b978] focus:ring-2 focus:ring-[#12b978]/10"
              />
            </label>

            <div className="flex justify-end gap-3 pt-3">
              <SecondaryButton
                onClick={() => setModal(null)}
              >
                Cancel
              </SecondaryButton>

              <PrimaryButton
                onClick={saveEventInformation}
              >
                <Save size={16} />
                Save Changes
              </PrimaryButton>
            </div>
          </div>
        </Modal>
      )}

      {/* =====================================================
          EDIT ORGANIZER MODAL
      ===================================================== */}

      {modal === "organizer" && (
        <Modal
          title="Edit Organizer Information"
          subtitle="Update your organization and contact details."
          onClose={() => setModal(null)}
        >
          <div className="space-y-4">
            <InputField
              label="Organization Name"
              value={organizationName}
              onChange={setOrganizationName}
            />

            <InputField
              label="Contact Email"
              value={contactEmail}
              onChange={setContactEmail}
              type="email"
            />

            <InputField
              label="Contact Phone"
              value={contactPhone}
              onChange={setContactPhone}
              type="tel"
            />

            <InputField
              label="Website"
              value={website}
              onChange={setWebsite}
            />

            <div className="flex justify-end gap-3 pt-3">
              <SecondaryButton
                onClick={() => setModal(null)}
              >
                Cancel
              </SecondaryButton>

              <PrimaryButton
                onClick={saveOrganizerInformation}
              >
                <Save size={16} />
                Save Changes
              </PrimaryButton>
            </div>
          </div>
        </Modal>
      )}

      {/* =====================================================
          BRANDING MODAL
      ===================================================== */}

      {modal === "branding" && (
        <Modal
          title="Edit Event Branding"
          subtitle="Update your event's visual identity."
          onClose={() => setModal(null)}
        >
          <div className="space-y-5">
            <div>
              <p className="text-sm font-semibold">
                Current Banner
              </p>

              <div className="mt-3 flex h-[150px] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#30104f] via-[#8d1eaf] to-[#ef32bc]">
                <div className="text-center text-white">
                  <p className="text-[30px] font-black italic">
                    CRESCENDO
                  </p>

                  <p className="text-[25px] font-black italic">
                    FEST 2026
                  </p>
                </div>
              </div>
            </div>

            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 px-4 py-5 text-sm font-semibold text-[#53658f] hover:bg-slate-50">
              <FileImage size={18} />
              Choose New Banner
              <input
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={() =>
                  showToast(
                    "Banner selected. Upload will be connected to the backend later.",
                  )
                }
              />
            </label>

            <div className="flex justify-end gap-3">
              <SecondaryButton
                onClick={() => setModal(null)}
              >
                Cancel
              </SecondaryButton>

              <PrimaryButton
                onClick={() => {
                  setModal(null);
                  showToast(
                    "Branding settings saved.",
                  );
                }}
              >
                <Save size={16} />
                Save Changes
              </PrimaryButton>
            </div>
          </div>
        </Modal>
      )}

      {/* =====================================================
          ADDITIONAL SETTINGS MODAL
      ===================================================== */}

      {modal === "additional" && (
        <Modal
          title="Additional Settings"
          subtitle="Configure your event preferences."
          onClose={() => setModal(null)}
        >
          <div className="space-y-5">
            <ModalToggle
              title="Allow Waitlist"
              description="Allow users to join a waitlist when tickets are sold out."
              enabled={allowWaitlist}
              onChange={() =>
                setAllowWaitlist(!allowWaitlist)
              }
            />

            <ModalToggle
              title="Age Restriction"
              description="Require attendees to meet the configured age requirement."
              enabled={ageRestriction}
              onChange={() =>
                setAgeRestriction(!ageRestriction)
              }
            />

            <ModalToggle
              title="Show Attendee List"
              description="Allow participants to see the attendee list."
              enabled={showAttendeeList}
              onChange={() =>
                setShowAttendeeList(
                  !showAttendeeList,
                )
              }
            />

            <ModalToggle
              title="Terms & Conditions"
              description="Display terms and conditions during registration."
              enabled={termsAndConditions}
              onChange={() =>
                setTermsAndConditions(
                  !termsAndConditions,
                )
              }
            />

            <div className="flex justify-end pt-3">
              <PrimaryButton
                onClick={() => {
                  setModal(null);
                  showToast(
                    "Additional settings saved.",
                  );
                }}
              >
                <Save size={16} />
                Done
              </PrimaryButton>
            </div>
          </div>
        </Modal>
      )}

      {/* =====================================================
          DUPLICATE MODAL
      ===================================================== */}

      {modal === "duplicate" && (
        <Modal
          title="Duplicate Event"
          subtitle="Create a copy of this event."
          onClose={() => setModal(null)}
        >
          <div className="rounded-xl bg-[#f7f9fc] p-4">
            <p className="text-sm text-[#53658f]">
              A duplicate of{" "}
              <strong className="text-[#182143]">
                {currentEvent.name}
              </strong>{" "}
              will be created with the same basic settings.
            </p>
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <SecondaryButton
              onClick={() => setModal(null)}
            >
              Cancel
            </SecondaryButton>

            <PrimaryButton onClick={duplicateEvent}>
              <Copy size={16} />
              Duplicate
            </PrimaryButton>
          </div>
        </Modal>
      )}

      {/* =====================================================
          ARCHIVE MODAL
      ===================================================== */}

      {modal === "archive" && (
        <Modal
          title="Archive Event"
          subtitle="This will remove the event from active event lists."
          onClose={() => setModal(null)}
        >
          <div className="rounded-xl bg-[#fff8e8] p-4 text-sm leading-6 text-[#765f30]">
            Are you sure you want to archive{" "}
            <strong>{currentEvent.name}</strong>?
            <br />
            You can keep the event data for future reference.
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <SecondaryButton
              onClick={() => setModal(null)}
            >
              Keep Event
            </SecondaryButton>

            <button
              type="button"
              onClick={archiveEvent}
              className="inline-flex items-center gap-2 rounded-lg bg-[#e99a21] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d98913]"
            >
              <Trash2 size={16} />
              Archive
            </button>
          </div>
        </Modal>
      )}

      {/* =====================================================
          CANCEL MODAL
      ===================================================== */}

      {modal === "cancel" && (
        <Modal
          title="Cancel Event"
          subtitle="This action changes the event status."
          onClose={() => setModal(null)}
        >
          <div className="rounded-xl bg-red-50 p-4 text-sm leading-6 text-red-700">
            Are you sure you want to cancel{" "}
            <strong>{currentEvent.name}</strong>?
            <br />
            Attendees may no longer be able to register for
            the event.
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <SecondaryButton
              onClick={() => setModal(null)}
            >
              Go Back
            </SecondaryButton>

            <button
              type="button"
              onClick={cancelEvent}
              className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600"
            >
              <Trash2 size={16} />
              Cancel Event
            </button>
          </div>
        </Modal>
      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {modal === "delete" && (
        <Modal
          title="Delete Event"
          subtitle="This action cannot be undone."
          onClose={() => setModal(null)}
        >
          <div className="rounded-xl bg-red-50 p-4 text-sm leading-6 text-red-700">
            You are about to permanently delete{" "}
            <strong>{currentEvent.name}</strong>.
            <br />
            This is a frontend demonstration currently, so
            no backend records are deleted.
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <SecondaryButton
              onClick={() => setModal(null)}
            >
              Keep Event
            </SecondaryButton>

            <button
              type="button"
              onClick={deleteEvent}
              className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600"
            >
              <Trash2 size={16} />
              Delete Event
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* =========================================================
   INFO ROW
========================================================= */

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-bold text-[#182143]">
        {label}
      </p>

      <div className="mt-1 text-[15px] leading-5 text-[#53658f]">
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   TAG
========================================================= */

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

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eaf2ff]">
        {icon}
      </div>

      <div>
        <h2 className="text-[16px] font-bold">
          {title}
        </h2>

        <p className="text-sm text-[#53658f]">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   ACTION BUTTON
========================================================= */

function ActionButton({
  icon,
  text,
  iconRight,
  green,
  danger,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  iconRight?: React.ReactNode;
  green?: boolean;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold transition ${
        danger
          ? "bg-white text-red-500 hover:bg-red-50"
          : green
            ? "bg-[#e7faef] text-[#08a96c] hover:bg-[#d8f6e8]"
            : "bg-white text-[#34446d] hover:bg-slate-50"
      }`}
    >
      <span className="flex items-center gap-3">
        {icon}
        {text}
      </span>

      {iconRight ?? <ArrowRight size={17} />}
    </button>
  );
}

/* =========================================================
   SETTING TOGGLE
========================================================= */

function SettingToggle({
  label,
  description,
  enabled,
  onChange,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-start gap-3">
      <Toggle
        enabled={enabled}
        onChange={onChange}
      />

      <div>
        <p className="text-sm font-bold">
          {label}
        </p>

        <p className="mt-1 max-w-[300px] text-sm leading-5 text-[#53658f]">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   SETTINGS PANEL
========================================================= */

function SettingsPanel({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_288px]">
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <SectionHeader
          icon={
            <span className="text-[#176ce5]">
              {icon}
            </span>
          }
          title={title}
          subtitle={subtitle}
        />

        <div className="mt-6 space-y-3">
          {children}
        </div>
      </section>

      <aside className="space-y-4">
        <div className="rounded-lg border border-slate-200 bg-[#faf8ff] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eee6ff]">
              <Zap
                size={20}
                className="text-[#7047ed]"
              />
            </div>

            <h2 className="text-[15px] font-bold">
              Quick Actions
            </h2>
          </div>

          <div className="mt-4 space-y-2">
            <Link
              href="/events/1"
              className="flex items-center justify-between rounded-lg bg-[#e7faef] px-3 py-3 text-sm font-semibold text-[#08a96c]"
            >
              <span className="flex items-center gap-3">
                <ExternalLink size={18} />
                View Event Page
              </span>

              <ArrowRight size={17} />
            </Link>

            <Link
              href="/events"
              className="flex items-center justify-between rounded-lg bg-white px-3 py-3 text-sm font-semibold text-[#34446d]"
            >
              <span className="flex items-center gap-3">
                <CalendarDays size={18} />
                Manage Events
              </span>

              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        <div className="rounded-lg bg-[#eef6ff] p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#dceaff] text-[#166ee8]">
              <Info size={20} />
            </div>

            <div>
              <h2 className="text-[15px] font-bold">
                Need help?
              </h2>

              <p className="mt-1 text-sm leading-5 text-[#53658f]">
                Our support team is here to help.
              </p>

              <a
                href="mailto:support@zordr.in"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#0aa96d] underline"
              >
                Contact Support
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* =========================================================
   NOTIFICATION ROW
========================================================= */

function NotificationRow({
  icon,
  title,
  description,
  enabled,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-xl border border-slate-200 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef4ff] text-[#1767dc]">
          {icon}
        </div>

        <div>
          <p className="font-bold">
            {title}
          </p>

          <p className="mt-1 text-sm text-[#65769a]">
            {description}
          </p>
        </div>
      </div>

      <Toggle
        enabled={enabled}
        onChange={onChange}
      />
    </div>
  );
}

/* =========================================================
   PAYMENT CARD
========================================================= */

function PaymentCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf2ff]">
        <CreditCard
          size={19}
          className="text-[#1767dc]"
        />
      </div>

      <p className="mt-4 text-sm font-semibold text-[#53658f]">
        {title}
      </p>

      <p className="mt-1 text-lg font-bold">
        {value}
      </p>

      <p className="mt-1 text-xs text-[#71809f]">
        {subtitle}
      </p>
    </div>
  );
}

/* =========================================================
   INTEGRATION ROW
========================================================= */

function IntegrationRow({
  name,
  description,
  connected,
  onClick,
}: {
  name: string;
  description: string;
  connected: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-xl border border-slate-200 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef4ff]">
          <Link2
            size={19}
            className="text-[#1767dc]"
          />
        </div>

        <div>
          <p className="font-bold">
            {name}
          </p>

          <p className="mt-1 text-sm text-[#65769a]">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClick}
        className={`rounded-lg px-4 py-2 text-sm font-semibold ${
          connected
            ? "bg-[#e3f9ef] text-[#079f67]"
            : "border border-slate-200 bg-white text-[#34446d]"
        }`}
      >
        {connected ? "Connected" : "Connect"}
      </button>
    </div>
  );
}

/* =========================================================
   MODAL TOGGLE
========================================================= */

function ModalToggle({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-xl border border-slate-200 p-4">
      <div>
        <p className="font-bold">
          {title}
        </p>

        <p className="mt-1 text-sm leading-5 text-[#65769a]">
          {description}
        </p>
      </div>

      <Toggle
        enabled={enabled}
        onChange={onChange}
      />
    </div>
  );
}