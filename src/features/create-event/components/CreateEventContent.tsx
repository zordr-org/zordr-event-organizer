"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  FileText,
  Image as ImageIcon,
  MapPin,
  Plus,
  QrCode,
  Save,
  Settings,
  ShieldCheck,
  Ticket,
  Users,
  WalletCards,
  Eye,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Tag,
} from "lucide-react";

type Step = {
  number: number;
  title: string;
  description: string;
};

type SectionName =
  | "basic"
  | "venue"
  | "schedule"
  | "media"
  | "tickets"
  | "registration"
  | "publish";

type TicketType = {
  name: string;
  price: string;
  description: string;
  available: string;
};

const steps: Step[] = [
  {
    number: 1,
    title: "Basic Info",
    description: "Name, description, category",
  },
  {
    number: 2,
    title: "Venue",
    description: "Location and mode",
  },
  {
    number: 3,
    title: "Schedule",
    description: "Date and time",
  },
  {
    number: 4,
    title: "Media",
    description: "Images and banner",
  },
  {
    number: 5,
    title: "Tickets",
    description: "Ticket types and pricing",
  },
  {
    number: 6,
    title: "Registration",
    description: "Attendee information",
  },
  {
    number: 7,
    title: "Publish",
    description: "Review and go live",
  },
];

const sectionIcons = {
  venue: MapPin,
  schedule: CalendarDays,
  media: ImageIcon,
  tickets: Ticket,
  registration: FileText,
  publish: ShieldCheck,
};

const initialTickets: TicketType[] = [
  {
    name: "General Pass",
    price: "499",
    description: "Entry to main event",
    available: "642",
  },
  {
    name: "VIP Pass",
    price: "999",
    description: "Priority entry + lounge access",
    available: "120",
  },
  {
    name: "Backstage Pass",
    price: "1,999",
    description: "Meet & greet + all access",
    available: "50",
  },
];

export default function CreateEventContent() {
  const [activeStep, setActiveStep] = useState(1);

  const [openSections, setOpenSections] = useState<
    Record<SectionName, boolean>
  >({
    basic: true,
    venue: false,
    schedule: false,
    media: false,
    tickets: false,
    registration: false,
    publish: false,
  });

  const [eventName, setEventName] = useState("Crescendo Fest 2026");
  const [category, setCategory] = useState("Music");

  const [shortDescription, setShortDescription] = useState(
    "Crescendo Fest 2026 is our annual inter-college music festival featuring live performances, DJ nights, and an unforgettable experience.",
  );

  const [detailedDescription, setDetailedDescription] = useState(
    "Join us for Crescendo Fest 2026 Ã¢â‚¬â€œ a celebration of music, creativity and culture.\n\nFeaturing top college bands, special guest artists, food stalls, and more.\n\nLet the music bring us together!",
  );

  const [venue, setVenue] = useState("KITSW Campus, Warangal");
  const [eventDate, setEventDate] = useState("2026-10-12");
  const [eventTime, setEventTime] = useState("16:00");

  const [tickets, setTickets] = useState<TicketType[]>(initialTickets);

  const [tags, setTags] = useState(["Music", "Flagship"]);

  const [savedMessage, setSavedMessage] = useState("");

  const shortDescriptionCount = shortDescription.length;
  const detailedDescriptionCount = detailedDescription.length;

  const previewDate = useMemo(() => {
    if (!eventDate) return "Oct 12, 2026";

    const date = new Date(`${eventDate}T12:00:00`);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [eventDate]);

  const previewTime = useMemo(() => {
    if (!eventTime) return "4:00 PM";

    const [hourString, minute] = eventTime.split(":");
    const hour = Number(hourString);

    if (Number.isNaN(hour)) return "4:00 PM";

    const suffix = hour >= 12 ? "PM" : "AM";
    const twelveHour = hour % 12 || 12;

    return `${twelveHour}:${minute} ${suffix}`;
  }, [eventTime]);

  const toggleSection = (section: SectionName) => {
    setOpenSections((current) => ({
      ...current,
      [section]: !current[section],
    }));
  };

  const openStep = (stepNumber: number) => {
    setActiveStep(stepNumber);

    const sectionMap: Record<number, SectionName> = {
      1: "basic",
      2: "venue",
      3: "schedule",
      4: "media",
      5: "tickets",
      6: "registration",
      7: "publish",
    };

    const section = sectionMap[stepNumber];

    setOpenSections((current) => ({
      ...current,
      [section]: true,
    }));
  };

  const handleSaveDraft = () => {
    const draft = {
      eventName,
      category,
      shortDescription,
      detailedDescription,
      venue,
      eventDate,
      eventTime,
      tickets,
      tags,
    };

    localStorage.setItem("zordr-event-draft", JSON.stringify(draft));

    setSavedMessage("Draft saved successfully.");

    window.setTimeout(() => {
      setSavedMessage("");
    }, 2500);
  };

  const handleNext = () => {
    if (activeStep < 7) {
      const nextStep = activeStep + 1;

      setActiveStep(nextStep);

      const sectionMap: Record<number, SectionName> = {
        1: "venue",
        2: "schedule",
        3: "media",
        4: "tickets",
        5: "registration",
        6: "publish",
        7: "publish",
      };

      const section = sectionMap[nextStep];

      setOpenSections((current) => ({
        ...current,
        [section]: true,
      }));

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const updateTicket = (
    index: number,
    field: keyof TicketType,
    value: string,
  ) => {
    setTickets((current) =>
      current.map((ticket, ticketIndex) =>
        ticketIndex === index
          ? {
              ...ticket,
              [field]: value,
            }
          : ticket,
      ),
    );
  };

  const addTicket = () => {
    setTickets((current) => [
      ...current,
      {
        name: "New Ticket",
        price: "0",
        description: "Ticket description",
        available: "0",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fa] text-slate-900">
      <div className="flex min-h-screen">
        

        {/* ==================== MAIN ==================== */}
        <div className="min-w-0 flex-1">
          

          <div className="px-5 py-6 sm:px-8 lg:px-6 xl:px-7">
            {/* ==================== PAGE HEADER ==================== */}
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <Link
                  href="/events"
                  className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
                >
                  <ArrowLeft size={16} />
                  Back to Events
                </Link>

                <h1 className="text-[29px] font-bold tracking-[-1px] text-slate-950">
                  Create Event
                </h1>

                <p className="mt-1 text-[15px] text-slate-500">
                  Fill in the details to create your event. You can always edit
                  them later.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSaveDraft}
                className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 xl:self-center"
              >
                <Save size={16} />
                Save as Draft
              </button>
            </div>

            {/* Saved message */}
            {savedMessage && (
              <div className="fixed right-6 top-20 z-50 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 shadow-lg">
                {savedMessage}
              </div>
            )}

            {/* ==================== CONTENT GRID ==================== */}
            <div className="mt-5 grid gap-5 xl:grid-cols-[165px_minmax(500px,1fr)_323px]">
              {/* ==================== STEPPER ==================== */}
              <aside className="hidden xl:block">
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-[15px] top-5 h-[calc(100%-40px)] w-px bg-slate-200" />

                  <div className="relative space-y-1">
                    {steps.map((step) => {
                      const isActive = activeStep === step.number;
                      const isCompleted = activeStep > step.number;

                      return (
                        <button
                          type="button"
                          key={step.number}
                          onClick={() => openStep(step.number)}
                          className="relative flex w-full items-start gap-3 text-left"
                        >
                          <div
                            className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition ${
                              isActive
                                ? "bg-[#17ad76] text-white shadow-sm"
                                : isCompleted
                                  ? "bg-[#d9f5e9] text-[#159568]"
                                  : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {step.number}
                          </div>

                          <div className="min-w-0 pt-0.5">
                            <p
                              className={`text-sm font-semibold ${
                                isActive
                                  ? "text-[#159568]"
                                  : "text-slate-700"
                              }`}
                            >
                              {step.title}
                            </p>

                            <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                              {step.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </aside>

              {/* ==================== FORM COLUMN ==================== */}
              <section className="min-w-0 space-y-2.5">
                {/* BASIC INFORMATION */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.03)]">
                  <button
                    type="button"
                    onClick={() => toggleSection("basic")}
                    className="flex w-full items-center justify-between px-4 py-3 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e7faf2] text-[#14a06e]">
                        <FileText size={17} />
                      </div>

                      <div>
                        <h2 className="text-sm font-bold text-slate-900">
                          Basic Information
                        </h2>

                        <p className="text-xs text-slate-500">
                          Tell us about your event.
                        </p>
                      </div>
                    </div>

                    {openSections.basic ? (
                      <ChevronUp size={17} className="text-slate-500" />
                    ) : (
                      <ChevronDown size={17} className="text-slate-500" />
                    )}
                  </button>

                  {openSections.basic && (
                    <div className="border-t border-slate-100 px-4 pb-4 pt-3">
                      <div className="grid gap-4 md:grid-cols-2">
                        {/* Event name */}
                        <div>
                          <label
                            htmlFor="event-name"
                            className="mb-1.5 block text-xs font-semibold text-slate-800"
                          >
                            Event Name <span className="text-red-500">*</span>
                          </label>

                          <input
                            id="event-name"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            placeholder="Enter event name"
                            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#35b889] focus:ring-3 focus:ring-emerald-50"
                          />

                          <p className="mt-1 text-[11px] text-slate-400">
                            Keep it short and catchy.
                          </p>
                        </div>

                        {/* Category */}
                        <div>
                          <label
                            htmlFor="category"
                            className="mb-1.5 block text-xs font-semibold text-slate-800"
                          >
                            Event Category{" "}
                            <span className="text-red-500">*</span>
                          </label>

                          <div className="relative">
                            <select
                              id="category"
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                              className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-900 outline-none transition focus:border-[#35b889] focus:ring-3 focus:ring-emerald-50"
                            >
                              <option>Music</option>
                              <option>Cultural</option>
                              <option>Sports</option>
                              <option>Educational</option>
                              <option>Workshop</option>
                              <option>Technology</option>
                              <option>Social</option>
                              <option>Other</option>
                            </select>

                            <ChevronDown
                              size={16}
                              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                            />
                          </div>

                          <p className="mt-1 text-[11px] text-slate-400">
                            Helps attendees discover your event.
                          </p>
                        </div>
                      </div>

                      {/* Short description */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="short-description"
                            className="mb-1.5 block text-xs font-semibold text-slate-800"
                          >
                            Short Description{" "}
                            <span className="text-red-500">*</span>
                          </label>
                        </div>

                        <textarea
                          id="short-description"
                          value={shortDescription}
                          onChange={(e) =>
                            setShortDescription(e.target.value.slice(0, 300))
                          }
                          rows={3}
                          className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm leading-5 text-slate-900 outline-none transition focus:border-[#35b889] focus:ring-3 focus:ring-emerald-50"
                        />

                        <div className="mt-1 flex items-center justify-between">
                          <p className="text-[11px] text-slate-400">
                            A brief summary of your event.
                          </p>

                          <span className="text-[11px] text-slate-500">
                            {shortDescriptionCount}/300
                          </span>
                        </div>
                      </div>

                      {/* Detailed description */}
                      <div className="mt-4">
                        <label
                          htmlFor="detailed-description"
                          className="mb-1.5 block text-xs font-semibold text-slate-800"
                        >
                          Detailed Description{" "}
                          <span className="font-normal text-slate-400">
                            (Optional)
                          </span>
                        </label>

                        <div className="overflow-hidden rounded-lg border border-slate-200">
                          {/* Toolbar */}
                          <div className="flex h-8 items-center gap-1 border-b border-slate-200 bg-slate-50 px-2">
                            <button
                              type="button"
                              className="flex h-6 w-7 items-center justify-center rounded text-slate-600 hover:bg-white"
                              title="Bold"
                            >
                              <Bold size={14} />
                            </button>

                            <button
                              type="button"
                              className="flex h-6 w-7 items-center justify-center rounded text-slate-600 hover:bg-white"
                              title="Italic"
                            >
                              <Italic size={14} />
                            </button>

                            <button
                              type="button"
                              className="flex h-6 w-7 items-center justify-center rounded text-slate-600 hover:bg-white"
                              title="Bulleted list"
                            >
                              <List size={14} />
                            </button>

                            <button
                              type="button"
                              className="flex h-6 w-7 items-center justify-center rounded text-slate-600 hover:bg-white"
                              title="Numbered list"
                            >
                              <ListOrdered size={14} />
                            </button>

                            <button
                              type="button"
                              className="flex h-6 w-7 items-center justify-center rounded text-slate-600 hover:bg-white"
                              title="Link"
                            >
                              <LinkIcon size={14} />
                            </button>
                          </div>

                          <textarea
                            id="detailed-description"
                            value={detailedDescription}
                            onChange={(e) =>
                              setDetailedDescription(
                                e.target.value.slice(0, 2000),
                              )
                            }
                            rows={5}
                            className="w-full resize-none border-0 px-3 py-2.5 text-sm leading-6 text-slate-800 outline-none"
                          />

                          <div className="flex items-center justify-between border-t border-slate-100 px-3 py-1.5">
                            <p className="text-[11px] text-slate-400">
                              Add more details, lineup, rules, etc.
                            </p>

                            <span className="text-[11px] text-slate-500">
                              {detailedDescriptionCount}/2000
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mt-4">
                        <label className="mb-1.5 block text-xs font-semibold text-slate-800">
                          Event Tags
                        </label>

                        <div className="flex min-h-10 flex-wrap items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1.5 rounded-full bg-[#e8faf3] px-2.5 py-1 text-[11px] font-semibold text-[#159568]"
                            >
                              <Tag size={11} />
                              {tag}
                            </span>
                          ))}

                          <button
                            type="button"
                            onClick={() =>
                              setTags((current) =>
                                current.includes("Student")
                                  ? current
                                  : [...current, "Student"],
                              )
                            }
                            className="text-[11px] font-medium text-slate-400 hover:text-[#159568]"
                          >
                            + Add tag
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* VENUE */}
                <CollapsibleSection
                  title="Venue"
                  description="Set the location or choose online mode."
                  icon={MapPin}
                  isOpen={openSections.venue}
                  onToggle={() => toggleSection("venue")}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField label="Venue Name">
                      <input
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        className={inputClass}
                        placeholder="Enter venue"
                      />
                    </FormField>

                    <FormField label="Event Mode">
                      <select className={selectClass} defaultValue="In-person">
                        <option>In-person</option>
                        <option>Online</option>
                        <option>Hybrid</option>
                      </select>
                    </FormField>
                  </div>

                  <div className="mt-4">
                    <FormField label="Address">
                      <input
                        defaultValue="KITSW Campus, Warangal, Telangana"
                        className={inputClass}
                      />
                    </FormField>
                  </div>
                </CollapsibleSection>

                {/* SCHEDULE */}
                <CollapsibleSection
                  title="Schedule"
                  description="Set the date and time for your event."
                  icon={CalendarDays}
                  isOpen={openSections.schedule}
                  onToggle={() => toggleSection("schedule")}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField label="Event Date">
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className={inputClass}
                      />
                    </FormField>

                    <FormField label="Start Time">
                      <input
                        type="time"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        className={inputClass}
                      />
                    </FormField>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <FormField label="End Date">
                      <input
                        type="date"
                        defaultValue="2026-10-12"
                        className={inputClass}
                      />
                    </FormField>

                    <FormField label="End Time">
                      <input
                        type="time"
                        defaultValue="22:00"
                        className={inputClass}
                      />
                    </FormField>
                  </div>
                </CollapsibleSection>

                {/* MEDIA */}
                <CollapsibleSection
                  title="Media"
                  description="Upload event images and banner."
                  icon={ImageIcon}
                  isOpen={openSections.media}
                  onToggle={() => toggleSection("media")}
                >
                  <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
                      <ImageIcon size={22} />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-slate-700">
                      Upload event banner
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      PNG, JPG or WEBP up to 5MB
                    </p>

                    <button
                      type="button"
                      className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Choose Image
                    </button>
                  </div>
                </CollapsibleSection>

                {/* TICKETS */}
                <CollapsibleSection
                  title="Tickets"
                  description="Create ticket types and set pricing."
                  icon={Ticket}
                  isOpen={openSections.tickets}
                  onToggle={() => toggleSection("tickets")}
                >
                  <div className="space-y-3">
                    {tickets.map((ticket, index) => (
                      <div
                        key={`${ticket.name}-${index}`}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <div className="grid gap-3 md:grid-cols-[1.3fr_0.7fr]">
                          <FormField label="Ticket Name">
                            <input
                              value={ticket.name}
                              onChange={(e) =>
                                updateTicket(index, "name", e.target.value)
                              }
                              className={inputClass}
                            />
                          </FormField>

                          <FormField label="Price">
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                                Ã¢â€šÂ¹
                              </span>

                              <input
                                value={ticket.price}
                                onChange={(e) =>
                                  updateTicket(
                                    index,
                                    "price",
                                    e.target.value,
                                  )
                                }
                                className={`${inputClass} pl-8`}
                              />
                            </div>
                          </FormField>
                        </div>

                        <div className="mt-3">
                          <FormField label="Description">
                            <input
                              value={ticket.description}
                              onChange={(e) =>
                                updateTicket(
                                  index,
                                  "description",
                                  e.target.value,
                                )
                              }
                              className={inputClass}
                            />
                          </FormField>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addTicket}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg border border-dashed border-[#39b98c] px-4 py-2.5 text-xs font-semibold text-[#159568] hover:bg-[#effbf6]"
                  >
                    <Plus size={15} />
                    Add Ticket Type
                  </button>
                </CollapsibleSection>

                {/* REGISTRATION */}
                <CollapsibleSection
                  title="Registration Form"
                  description="Collect additional details from attendees."
                  icon={FileText}
                  isOpen={openSections.registration}
                  onToggle={() => toggleSection("registration")}
                >
                  <div className="space-y-3">
                    {[
                      ["Full Name", true],
                      ["Email Address", true],
                      ["Mobile Number", true],
                      ["College / Organization", false],
                    ].map(([label, required]) => (
                      <label
                        key={String(label)}
                        className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-slate-300 accent-[#18a975]"
                          />

                          <span className="text-sm font-medium text-slate-700">
                            {String(label)}
                          </span>
                        </div>

                        <span className="text-[11px] text-slate-400">
                          {required ? "Required" : "Optional"}
                        </span>
                      </label>
                    ))}
                  </div>
                </CollapsibleSection>

                {/* PUBLISH */}
                <CollapsibleSection
                  title="Publish Settings"
                  description="Review and make your event live."
                  icon={ShieldCheck}
                  isOpen={openSections.publish}
                  onToggle={() => toggleSection("publish")}
                >
                  <div className="rounded-xl bg-[#effaf5] p-4">
                    <div className="flex gap-3">
                      <ShieldCheck
                        size={20}
                        className="mt-0.5 shrink-0 text-[#159568]"
                      />

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Your event is almost ready!
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Review all event details before publishing. You can
                          save this event as a draft at any time.
                        </p>
                      </div>
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Mobile step navigation */}
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 xl:hidden">
                  <button
                    type="button"
                    disabled={activeStep === 1}
                    onClick={() => openStep(Math.max(1, activeStep - 1))}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowLeft size={14} />
                    Previous
                  </button>

                  <span className="text-xs font-semibold text-slate-500">
                    Step {activeStep} of 7
                  </span>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#18aa75] px-3 py-2 text-xs font-semibold text-white"
                  >
                    Next
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Desktop Next */}
                <div className="hidden justify-end pt-1 xl:flex">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#13ae73] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#109c68]"
                  >
                    {activeStep === 7 ? "Publish Event" : `Next: ${steps[activeStep].title}`}
                    <ArrowRight size={17} />
                  </button>
                </div>
              </section>

              {/* ==================== LIVE PREVIEW ==================== */}
              <aside className="xl:sticky xl:top-5 xl:self-start">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_4px_rgba(15,23,42,0.04)]">
                  {/* Preview Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Eye size={17} className="text-[#168ee6]" />

                      <h2 className="text-sm font-bold text-slate-900">
                        Live Preview
                      </h2>
                    </div>

                    <button
                      type="button"
                      className="inline-flex h-8 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Eye size={14} />
                      Preview
                    </button>
                  </div>

                  <div className="p-3">
                    {/* Banner */}
                    <div className="relative h-[170px] overflow-hidden rounded-xl bg-[radial-gradient(circle_at_50%_20%,#db48ff_0%,#7c1fa5_30%,#210b46_72%,#080611_100%)]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_75%,rgba(255,255,255,0.3),transparent_10%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.25),transparent_12%)]" />

                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />

                      {/* Decorative stage lights */}
                      <div className="absolute left-8 top-0 h-28 w-1 rotate-[25deg] bg-white/20 blur-sm" />
                      <div className="absolute right-8 top-0 h-28 w-1 rotate-[-25deg] bg-white/20 blur-sm" />

                      {/* Crowd */}
                      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1">
                        {Array.from({ length: 22 }).map((_, index) => (
                          <div
                            key={index}
                            className="rounded-t-full bg-black/70"
                            style={{
                              width: `${6 + (index % 3) * 2}px`,
                              height: `${18 + (index % 5) * 6}px`,
                            }}
                          />
                        ))}
                      </div>

                      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
                        <p className="text-[11px] font-bold tracking-[3px] text-white/90">
                          CRESCENDO
                        </p>

                        <p className="text-2xl font-black tracking-wide text-white">
                          FEST 2026
                        </p>

                        <p className="mt-1 text-[9px] font-bold tracking-[2px] text-white/80">
                          MUSIC&nbsp;&nbsp; PEOPLE&nbsp;&nbsp; MEMORIES
                        </p>
                      </div>
                    </div>

                    {/* Preview title */}
                    <div className="mt-4">
                      <h2 className="text-[20px] font-bold tracking-[-0.5px] text-slate-950">
                        {eventName || "Your Event Name"}
                      </h2>

                      <div className="mt-2.5 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <CalendarDays
                            size={15}
                            className="text-slate-500"
                          />
                          <span>
                            {previewDate} Ã¢â‚¬Â¢ {previewTime} onwards
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <MapPin size={15} className="text-slate-500" />
                          <span>{venue || "Event venue"}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#f1e8ff] px-3 py-1 text-[11px] font-semibold text-[#7c3aed]">
                          {category}
                        </span>

                        {tags.slice(1, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[#e6f8f0] px-3 py-1 text-[11px] font-semibold text-[#159568]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="my-4 h-px bg-slate-200" />

                    {/* About */}
                    <section>
                      <h3 className="text-sm font-bold text-slate-900">
                        About
                      </h3>

                      <p className="mt-2 line-clamp-4 text-xs leading-5 text-slate-500">
                        {shortDescription ||
                          "Your event description will appear here."}
                      </p>

                      <button
                        type="button"
                        className="mt-1 text-xs font-semibold text-[#159568]"
                      >
                        ... Read more
                      </button>
                    </section>

                    {/* Tickets */}
                    <section className="mt-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900">
                          Tickets
                        </h3>

                        <button
                          type="button"
                          className="text-xs font-semibold text-[#159568]"
                        >
                          View all
                        </button>
                      </div>

                      <div className="mt-2.5 space-y-2">
                        {tickets.slice(0, 3).map((ticket, index) => (
                          <div
                            key={`${ticket.name}-preview-${index}`}
                            className="rounded-lg border border-slate-200 p-3"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-xs font-medium text-slate-700">
                                  {ticket.name}
                                </p>

                                <p className="mt-1 text-base font-bold text-slate-900">
                                  Ã¢â€šÂ¹
                                  {Number(ticket.price || 0).toLocaleString(
                                    "en-IN",
                                  )}
                                </p>

                                <p className="mt-1 text-[10px] text-slate-500">
                                  {ticket.description}
                                </p>
                              </div>

                              <span className="rounded-lg bg-[#eafaf3] px-2 py-2 text-center text-[9px] font-semibold leading-3 text-[#159568]">
                                Available
                                <br />
                                <span className="text-[10px]">
                                  {ticket.available} left
                                </span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="mt-3 flex h-10 w-full items-center justify-center rounded-lg bg-[#0caf70] text-sm font-semibold text-white shadow-sm"
                      >
                        Book Tickets
                      </button>
                    </section>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REUSABLE COMPONENTS
   ============================================================ */

const inputClass =
  "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#35b889] focus:ring-3 focus:ring-emerald-50";

const selectClass =
  "h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-[#35b889] focus:ring-3 focus:ring-emerald-50";

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-800">
        {label}
      </label>

      {children}
    </div>
  );
}

function CollapsibleSection({
  title,
  description,
  icon: Icon,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  description: string;
  icon: typeof MapPin;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
            <Icon size={17} />
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900">{title}</h2>

            <p className="text-xs text-slate-500">{description}</p>
          </div>
        </div>

        {isOpen ? (
          <ChevronUp size={17} className="text-slate-500" />
        ) : (
          <ChevronDown size={17} className="text-slate-500" />
        )}
      </button>

      {isOpen && (
        <div className="border-t border-slate-100 px-4 pb-4 pt-3">
          {children}
        </div>
      )}
    </div>
  );
}