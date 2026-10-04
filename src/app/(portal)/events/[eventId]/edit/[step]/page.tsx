"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Eye,
  FileText,
  Image as ImageIcon,
  IndianRupee,
  Info,
  MapPin,
  Pencil,
  Save,
  Ticket,
  Users,
  Video,
  X,
} from "lucide-react";

type EventMode = "online" | "offline" | "hybrid";

type TeamMemberFields = {
  name: boolean;
  email: boolean;
  phone: boolean;
  institution: boolean;
  departmentYear: boolean;
};

type EventForm = {
  title: string;
  category: string;
  shortDescription: string;
  detailedDescription: string;

  eventMode: EventMode;
  venueName: string;
  address: string;
  mapLocation: string;
  venueInstructions: string;

  startDate: string;
  startTime: string;
  endTime: string;

  bannerName: string;
  galleryCount: number;
  promoVideo: string;

  ticketName: string;
  ticketDescription: string;
  ticketPrice: string;
  ticketQuantity: string;
  purchaseLimit: string;

  registrationEnabled: boolean;
  registrationType: "individual" | "team";
  minTeamSize: string;
  maxTeamSize: string;
  teamMemberFields: TeamMemberFields;

  registrationDeadline: string;
  maxAttendees: string;
  waitlistEnabled: boolean;

  publishMode: "now" | "schedule" | "draft";
  publishDate: string;
};

const steps = [
  {
    id: 1,
    title: "Basic Info",
    description: "Event details",
  },
  {
    id: 2,
    title: "Venue",
    description: "Location details",
  },
  {
    id: 3,
    title: "Schedule",
    description: "Date & time",
  },
  {
    id: 4,
    title: "Media",
    description: "Images & video",
  },
  {
    id: 5,
    title: "Tickets",
    description: "Pricing & limits",
  },
  {
    id: 6,
    title: "Registration",
    description: "Registration setup",
  },
  {
    id: 7,
    title: "Publish",
    description: "Review & publish",
  },
];

const defaultEvent = {
  id: "1",
  title: "TechFest 2026",
  category: "Technology",
  shortDescription:
    "Annual technology festival featuring workshops, competitions and talks.",
  detailedDescription:
    "TechFest is an annual technology event bringing together students, developers and technology enthusiasts.",
  mode: "offline" as EventMode,
  venueName: "KITSW Main Auditorium",
  address: "Kakatiya Institute of Technology & Science, Warangal",
  mapLocation: "Warangal, Telangana",
  venueInstructions: "Entry through the main gate. Carry your college ID.",
  startDate: "2026-10-15",
  startTime: "09:00",
  endTime: "17:00",
  bannerName: "techfest-banner.png",
  galleryCount: 4,
  promoVideo: "",
  ticketName: "General Pass",
  ticketDescription: "Access to all TechFest activities.",
  ticketPrice: "299",
  ticketQuantity: "500",
  purchaseLimit: "1",
  registrationDeadline: "2026-10-14",
  capacity: 500,
};

function createInitialForm(event: typeof defaultEvent): EventForm {
  return {
    title: event.title,
    category: event.category,
    shortDescription: event.shortDescription,
    detailedDescription: event.detailedDescription,

    eventMode: event.mode,
    venueName: event.venueName,
    address: event.address,
    mapLocation: event.mapLocation,
    venueInstructions: event.venueInstructions,

    startDate: event.startDate,
    startTime: event.startTime,
    endTime: event.endTime,

    bannerName: event.bannerName,
    galleryCount: event.galleryCount,
    promoVideo: event.promoVideo,

    ticketName: event.ticketName,
    ticketDescription: event.ticketDescription,
    ticketPrice: event.ticketPrice,
    ticketQuantity: event.ticketQuantity,
    purchaseLimit: event.purchaseLimit,

    registrationEnabled: true,
    registrationType: "individual",
    minTeamSize: "2",
    maxTeamSize: "5",
    teamMemberFields: {
      name: true,
      email: true,
      phone: true,
      institution: true,
      departmentYear: true,
    },

    registrationDeadline: event.registrationDeadline,
    maxAttendees: String(event.capacity),
    waitlistEnabled: true,

    publishMode: "now",
    publishDate: event.startDate,
  };
}

function Stepper({
  currentStep,
  onStepClick,
}: {
  currentStep: number;
  onStepClick: (step: number) => void;
}) {
  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex min-w-[850px] items-start">
        {steps.map((step, index) => {
          const completed = currentStep > step.id;
          const active = currentStep === step.id;

          return (
            <div key={step.id} className="flex flex-1 items-start">
              <button
                type="button"
                onClick={() => onStepClick(step.id)}
                className="group flex flex-col items-center"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition ${
                    completed
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : active
                        ? "border-emerald-600 bg-white text-emerald-600"
                        : "border-slate-300 bg-white text-slate-400"
                  }`}
                >
                  {completed ? <Check size={18} /> : step.id}
                </div>

                <div className="mt-2 text-center">
                  <p
                    className={`text-xs font-semibold ${
                      active || completed
                        ? "text-slate-900"
                        : "text-slate-400"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    {step.description}
                  </p>
                </div>
              </button>

              {index < steps.length - 1 && (
                <div
                  className={`mt-5 h-[2px] flex-1 ${
                    currentStep > step.id
                      ? "bg-emerald-600"
                      : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FieldLabel({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-2 block text-sm font-medium text-slate-700">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
    />
  );
}

function TextArea({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
    />
  );
}

function SettingToggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-11 rounded-full transition ${
        enabled ? "bg-emerald-600" : "bg-slate-300"
      }`}
      aria-label="Toggle setting"
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();

  const eventId = String(params?.eventId ?? "1");
  const stepParam = Number(params?.step ?? 1);

  const currentStep =
    Number.isFinite(stepParam) && stepParam >= 1 && stepParam <= 7
      ? stepParam
      : 1;

  const [event] = useState(defaultEvent);
  const [form, setForm] = useState<EventForm>(() =>
    createInitialForm(defaultEvent),
  );

  const [savedMessage, setSavedMessage] = useState("");
  const [viewing, setViewing] = useState(false);
  const [saving, setSaving] = useState(false);

  const draftKey = `zordr-event-draft-${eventId}`;

  useEffect(() => {
    const saved = localStorage.getItem(draftKey);

    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved);

      const defaults = createInitialForm(defaultEvent);

      setForm({
        ...defaults,
        ...parsed,
        teamMemberFields: {
          ...defaults.teamMemberFields,
          ...(parsed.teamMemberFields ?? {}),
        },
      });
    } catch {
      localStorage.removeItem(draftKey);
    }
  }, [draftKey]);

  const updateForm = <K extends keyof EventForm>(
    key: K,
    value: EventForm[K],
  ) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const updateTeamMemberField = (
    key: keyof TeamMemberFields,
    value: boolean,
  ) => {
    setForm((previous) => ({
      ...previous,
      teamMemberFields: {
        ...previous.teamMemberFields,
        [key]: value,
      },
    }));
  };

  const goToStep = (step: number) => {
    router.push(`/events/${eventId}/edit/${step}`);
  };

  const handleSaveDraft = () => {
    localStorage.setItem(draftKey, JSON.stringify(form));
    setSavedMessage("Draft saved successfully.");

    setTimeout(() => {
      setSavedMessage("");
    }, 2500);
  };

  const validateCurrentStep = () => {
    if (currentStep === 1 && !form.title.trim()) {
      setSavedMessage("Please enter an event title.");
      return false;
    }

    if (currentStep === 6 && form.registrationEnabled) {
      if (form.registrationType === "team") {
        const min = Number(form.minTeamSize);
        const max = Number(form.maxTeamSize);

        if (
          !Number.isFinite(min) ||
          !Number.isFinite(max) ||
          min < 2 ||
          max < min
        ) {
          setSavedMessage(
            "Please enter a valid team size. Minimum must be at least 2 and maximum must be greater than or equal to minimum.",
          );
          return false;
        }
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }

    handleSaveDraft();

    if (currentStep < 7) {
      router.push(`/events/${eventId}/edit/${currentStep + 1}`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      router.push(`/events/${eventId}/edit/${currentStep - 1}`);
    }
  };

  const handleUpdateEvent = () => {
    if (!validateCurrentStep()) {
      return;
    }

    setSaving(true);

    localStorage.setItem(draftKey, JSON.stringify(form));

    setTimeout(() => {
      setSaving(false);
      setSavedMessage("Event updated successfully.");

      setTimeout(() => {
        router.push(`/events/${eventId}`);
      }, 800);
    }, 500);
  };

  const registrationSummary = useMemo(() => {
    if (!form.registrationEnabled) {
      return "Registration Disabled";
    }

    if (form.registrationType === "team") {
      return `Team Registration (${form.minTeamSize}-${form.maxTeamSize} members)`;
    }

    return "Individual Registration";
  }, [
    form.registrationEnabled,
    form.registrationType,
    form.minTeamSize,
    form.maxTeamSize,
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-full flex-col">
          <div className="border-b border-slate-100 px-6 py-5">
            <div className="text-xl font-bold tracking-tight text-slate-900">
              zordr
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Events. Experiences. Together.
            </p>
          </div>

          <nav className="flex-1 px-3 py-5">
            <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Organizer Portal
            </div>

            <Link
              href="/dashboard"
              className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
            >
              Dashboard
            </Link>

            <Link
              href="/events"
              className="mb-1 flex items-center gap-3 rounded-lg bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-700"
            >
              Events
            </Link>

            <Link
              href="/scanner"
              className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
            >
              Scanner
            </Link>

            <Link
              href="/settlements"
              className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
            >
              Settlements
            </Link>

            <Link
              href="/orders"
              className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
            >
              Orders
            </Link>

            <Link
              href="/settings"
              className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
            >
              Settings
            </Link>
          </nav>

          <div className="border-t border-slate-100 p-4">
            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                O
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800">
                  Organizer
                </p>
                <p className="truncate text-xs text-slate-400">
                  organizer@zordr.in
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-5 lg:px-8">
            <div className="flex items-center gap-3">
              <Link
                href="/events"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
              >
                <ArrowLeft size={17} />
              </Link>

              <div>
                <p className="text-xs text-slate-400">Events / Edit Event</p>
                <h1 className="text-base font-semibold text-slate-900">
                  {event.title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {savedMessage && (
                <div className="hidden rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 sm:block">
                  {savedMessage}
                </div>
              )}

              <button
                type="button"
                onClick={() => setViewing(true)}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <Eye size={16} />
                <span className="hidden sm:inline">View Event</span>
              </button>

              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <Save size={16} />
                <span className="hidden sm:inline">Save Draft</span>
              </button>
            </div>
          </div>
        </header>

        <div className="px-5 py-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Stepper currentStep={currentStep} onStepClick={goToStep} />

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_330px]">
              {/* Form */}
              <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-5">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {steps[currentStep - 1].title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {steps[currentStep - 1].description}
                  </p>
                </div>

                <div className="p-6">
                  {/* STEP 1 */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <FieldLabel required>Event Title</FieldLabel>
                        <Input
                          value={form.title}
                          onChange={(value) => updateForm("title", value)}
                          placeholder="Enter event title"
                        />
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <div>
                          <FieldLabel required>Category</FieldLabel>
                          <div className="relative">
                            <select
                              value={form.category}
                              onChange={(e) =>
                                updateForm("category", e.target.value)
                              }
                              className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            >
                              <option>Technology</option>
                              <option>Education</option>
                              <option>Sports</option>
                              <option>Cultural</option>
                              <option>Business</option>
                              <option>Entertainment</option>
                              <option>Other</option>
                            </select>
                            <ChevronDown
                              size={16}
                              className="pointer-events-none absolute right-3 top-3 text-slate-400"
                            />
                          </div>
                        </div>

                        <div>
                          <FieldLabel>Event Mode</FieldLabel>
                          <div className="grid grid-cols-3 gap-2">
                            {(["offline", "online", "hybrid"] as EventMode[]).map(
                              (mode) => (
                                <button
                                  key={mode}
                                  type="button"
                                  onClick={() =>
                                    updateForm("eventMode", mode)
                                  }
                                  className={`rounded-lg border px-3 py-2.5 text-sm font-medium capitalize transition ${
                                    form.eventMode === mode
                                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                                  }`}
                                >
                                  {mode}
                                </button>
                              ),
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <FieldLabel required>Short Description</FieldLabel>
                        <TextArea
                          value={form.shortDescription}
                          onChange={(value) =>
                            updateForm("shortDescription", value)
                          }
                          placeholder="Give a short description of your event"
                          rows={3}
                        />
                      </div>

                      <div>
                        <FieldLabel>Detailed Description</FieldLabel>
                        <TextArea
                          value={form.detailedDescription}
                          onChange={(value) =>
                            updateForm("detailedDescription", value)
                          }
                          placeholder="Describe your event in detail"
                          rows={6}
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 2 */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <FieldLabel required>Venue Name</FieldLabel>
                        <Input
                          value={form.venueName}
                          onChange={(value) =>
                            updateForm("venueName", value)
                          }
                          placeholder="Enter venue name"
                        />
                      </div>

                      <div>
                        <FieldLabel>Address</FieldLabel>
                        <TextArea
                          value={form.address}
                          onChange={(value) => updateForm("address", value)}
                          placeholder="Enter complete venue address"
                          rows={3}
                        />
                      </div>

                      <div>
                        <FieldLabel>Map Location</FieldLabel>
                        <Input
                          value={form.mapLocation}
                          onChange={(value) =>
                            updateForm("mapLocation", value)
                          }
                          placeholder="Paste Google Maps location"
                        />
                      </div>

                      <div>
                        <FieldLabel>Venue Instructions</FieldLabel>
                        <TextArea
                          value={form.venueInstructions}
                          onChange={(value) =>
                            updateForm("venueInstructions", value)
                          }
                          placeholder="Add entry instructions or other venue information"
                          rows={4}
                        />
                      </div>

                      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                        <div className="flex gap-3">
                          <Info
                            size={18}
                            className="mt-0.5 shrink-0 text-blue-600"
                          />
                          <div>
                            <p className="text-sm font-medium text-blue-800">
                              Venue information
                            </p>
                            <p className="mt-1 text-xs leading-5 text-blue-700">
                              Make sure participants can easily identify the
                              venue and reach it using the information
                              provided.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="grid gap-5 md:grid-cols-3">
                        <div>
                          <FieldLabel required>Start Date</FieldLabel>
                          <Input
                            type="date"
                            value={form.startDate}
                            onChange={(value) =>
                              updateForm("startDate", value)
                            }
                          />
                        </div>

                        <div>
                          <FieldLabel required>Start Time</FieldLabel>
                          <Input
                            type="time"
                            value={form.startTime}
                            onChange={(value) =>
                              updateForm("startTime", value)
                            }
                          />
                        </div>

                        <div>
                          <FieldLabel required>End Time</FieldLabel>
                          <Input
                            type="time"
                            value={form.endTime}
                            onChange={(value) =>
                              updateForm("endTime", value)
                            }
                          />
                        </div>
                      </div>

                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                        <div className="flex items-start gap-3">
                          <CalendarDays
                            size={19}
                            className="mt-0.5 text-emerald-600"
                          />
                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              Schedule Preview
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              {form.startDate || "Date not selected"} ·{" "}
                              {form.startTime || "--:--"} -{" "}
                              {form.endTime || "--:--"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4 */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div>
                        <FieldLabel>Event Banner</FieldLabel>

                        <div className="rounded-xl border-2 border-dashed border-slate-200 p-8 text-center transition hover:border-emerald-300">
                          <ImageIcon
                            size={32}
                            className="mx-auto text-slate-300"
                          />

                          <p className="mt-3 text-sm font-medium text-slate-700">
                            {form.bannerName || "Upload event banner"}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            PNG, JPG or WEBP · Recommended 1200 × 630
                          </p>

                          <button
                            type="button"
                            className="mt-4 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                          >
                            Choose Image
                          </button>
                        </div>
                      </div>

                      <div>
                        <FieldLabel>Gallery Images</FieldLabel>

                        <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                          <div>
                            <p className="text-sm font-medium text-slate-800">
                              Event gallery
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              {form.galleryCount} images currently uploaded
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              updateForm(
                                "galleryCount",
                                form.galleryCount + 1,
                              )
                            }
                            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                          >
                            Add Image
                          </button>
                        </div>
                      </div>

                      <div>
                        <FieldLabel>Promo Video</FieldLabel>
                        <div className="relative">
                          <Video
                            size={17}
                            className="absolute left-3 top-3 text-slate-400"
                          />
                          <input
                            value={form.promoVideo}
                            onChange={(e) =>
                              updateForm("promoVideo", e.target.value)
                            }
                            placeholder="Paste YouTube or video URL"
                            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 5 */}
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      <div className="grid gap-5 md:grid-cols-2">
                        <div>
                          <FieldLabel required>Ticket Name</FieldLabel>
                          <Input
                            value={form.ticketName}
                            onChange={(value) =>
                              updateForm("ticketName", value)
                            }
                            placeholder="General Pass"
                          />
                        </div>

                        <div>
                          <FieldLabel>Ticket Price</FieldLabel>
                          <div className="relative">
                            <IndianRupee
                              size={16}
                              className="absolute left-3 top-3 text-slate-400"
                            />
                            <input
                              value={form.ticketPrice}
                              onChange={(e) =>
                                updateForm("ticketPrice", e.target.value)
                              }
                              type="number"
                              min="0"
                              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <FieldLabel>Ticket Description</FieldLabel>
                        <TextArea
                          value={form.ticketDescription}
                          onChange={(value) =>
                            updateForm("ticketDescription", value)
                          }
                          placeholder="Describe what the ticket includes"
                          rows={4}
                        />
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <div>
                          <FieldLabel>Ticket Quantity</FieldLabel>
                          <Input
                            type="number"
                            value={form.ticketQuantity}
                            onChange={(value) =>
                              updateForm("ticketQuantity", value)
                            }
                          />
                        </div>

                        <div>
                          <FieldLabel>Purchase Limit Per Person</FieldLabel>
                          <Input
                            type="number"
                            value={form.purchaseLimit}
                            onChange={(value) =>
                              updateForm("purchaseLimit", value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 6 - REGISTRATION */}
                  {currentStep === 6 && (
                    <div className="space-y-6">
                      {/* Enable registration */}
                      <div className="flex items-center justify-between rounded-xl border border-slate-200 p-5">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                            <Users size={19} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              Enable Registration
                            </p>
                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              Allow participants to register for this event.
                            </p>
                          </div>
                        </div>

                        <SettingToggle
                          enabled={form.registrationEnabled}
                          onChange={(value) =>
                            updateForm("registrationEnabled", value)
                          }
                        />
                      </div>

                      {form.registrationEnabled && (
                        <>
                          {/* Registration Type */}
                          <div>
                            <FieldLabel required>Registration Type</FieldLabel>

                            <div className="grid gap-4 md:grid-cols-2">
                              <button
                                type="button"
                                onClick={() =>
                                  updateForm("registrationType", "individual")
                                }
                                className={`rounded-xl border p-5 text-left transition ${
                                  form.registrationType === "individual"
                                    ? "border-emerald-500 bg-emerald-50"
                                    : "border-slate-200 bg-white hover:bg-slate-50"
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                                        form.registrationType === "individual"
                                          ? "bg-emerald-100 text-emerald-700"
                                          : "bg-slate-100 text-slate-500"
                                      }`}
                                    >
                                      <Users size={18} />
                                    </div>

                                    <div>
                                      <p className="text-sm font-semibold text-slate-800">
                                        Individual
                                      </p>
                                      <p className="mt-1 text-xs text-slate-500">
                                        One participant registers at a time.
                                      </p>
                                    </div>
                                  </div>

                                  {form.registrationType === "individual" && (
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                                      <Check size={12} />
                                    </div>
                                  )}
                                </div>
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  updateForm("registrationType", "team")
                                }
                                className={`rounded-xl border p-5 text-left transition ${
                                  form.registrationType === "team"
                                    ? "border-emerald-500 bg-emerald-50"
                                    : "border-slate-200 bg-white hover:bg-slate-50"
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                                        form.registrationType === "team"
                                          ? "bg-emerald-100 text-emerald-700"
                                          : "bg-slate-100 text-slate-500"
                                      }`}
                                    >
                                      <Users size={18} />
                                    </div>

                                    <div>
                                      <p className="text-sm font-semibold text-slate-800">
                                        Team
                                      </p>
                                      <p className="mt-1 text-xs text-slate-500">
                                        Allow multiple members to register as
                                        one team.
                                      </p>
                                    </div>
                                  </div>

                                  {form.registrationType === "team" && (
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                                      <Check size={12} />
                                    </div>
                                  )}
                                </div>
                              </button>
                            </div>
                          </div>

                          {/* Team Settings */}
                          {form.registrationType === "team" && (
                            <>
                              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-5">
                                <div className="mb-5">
                                  <p className="text-sm font-semibold text-slate-800">
                                    Team Size
                                  </p>
                                  <p className="mt-1 text-xs text-slate-500">
                                    Set the minimum and maximum number of
                                    members allowed in each team.
                                  </p>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                  <div>
                                    <FieldLabel required>
                                      Minimum Team Size
                                    </FieldLabel>
                                    <Input
                                      type="number"
                                      value={form.minTeamSize}
                                      onChange={(value) =>
                                        updateForm("minTeamSize", value)
                                      }
                                      placeholder="2"
                                    />
                                    <p className="mt-1.5 text-[11px] text-slate-400">
                                      Minimum 2 members
                                    </p>
                                  </div>

                                  <div>
                                    <FieldLabel required>
                                      Maximum Team Size
                                    </FieldLabel>
                                    <Input
                                      type="number"
                                      value={form.maxTeamSize}
                                      onChange={(value) =>
                                        updateForm("maxTeamSize", value)
                                      }
                                      placeholder="5"
                                    />
                                    <p className="mt-1.5 text-[11px] text-slate-400">
                                      Must be greater than or equal to minimum
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Team Member Fields */}
                              <div className="rounded-xl border border-slate-200 p-5">
                                <div className="mb-5">
                                  <p className="text-sm font-semibold text-slate-800">
                                    Team Member Details
                                  </p>
                                  <p className="mt-1 text-xs leading-5 text-slate-500">
                                    Select the information that should be
                                    collected for every team member during
                                    registration.
                                  </p>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 transition hover:bg-slate-50">
                                    <input
                                      type="checkbox"
                                      checked={form.teamMemberFields.name}
                                      onChange={(e) =>
                                        updateTeamMemberField(
                                          "name",
                                          e.target.checked,
                                        )
                                      }
                                      className="h-4 w-4 accent-emerald-600"
                                    />
                                    <span className="text-sm text-slate-700">
                                      Full Name
                                    </span>
                                  </label>

                                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 transition hover:bg-slate-50">
                                    <input
                                      type="checkbox"
                                      checked={form.teamMemberFields.email}
                                      onChange={(e) =>
                                        updateTeamMemberField(
                                          "email",
                                          e.target.checked,
                                        )
                                      }
                                      className="h-4 w-4 accent-emerald-600"
                                    />
                                    <span className="text-sm text-slate-700">
                                      Email Address
                                    </span>
                                  </label>

                                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 transition hover:bg-slate-50">
                                    <input
                                      type="checkbox"
                                      checked={form.teamMemberFields.phone}
                                      onChange={(e) =>
                                        updateTeamMemberField(
                                          "phone",
                                          e.target.checked,
                                        )
                                      }
                                      className="h-4 w-4 accent-emerald-600"
                                    />
                                    <span className="text-sm text-slate-700">
                                      Phone Number
                                    </span>
                                  </label>

                                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 transition hover:bg-slate-50">
                                    <input
                                      type="checkbox"
                                      checked={
                                        form.teamMemberFields.institution
                                      }
                                      onChange={(e) =>
                                        updateTeamMemberField(
                                          "institution",
                                          e.target.checked,
                                        )
                                      }
                                      className="h-4 w-4 accent-emerald-600"
                                    />
                                    <span className="text-sm text-slate-700">
                                      College / Institution
                                    </span>
                                  </label>

                                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-3 transition hover:bg-slate-50 sm:col-span-2">
                                    <input
                                      type="checkbox"
                                      checked={
                                        form.teamMemberFields.departmentYear
                                      }
                                      onChange={(e) =>
                                        updateTeamMemberField(
                                          "departmentYear",
                                          e.target.checked,
                                        )
                                      }
                                      className="h-4 w-4 accent-emerald-600"
                                    />
                                    <span className="text-sm text-slate-700">
                                      Department / Year
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </>
                          )}

                          {/* Registration Deadline */}
                          <div className="grid gap-5 md:grid-cols-2">
                            <div>
                              <FieldLabel>Registration Deadline</FieldLabel>
                              <Input
                                type="date"
                                value={form.registrationDeadline}
                                onChange={(value) =>
                                  updateForm("registrationDeadline", value)
                                }
                              />
                            </div>

                            <div>
                              <FieldLabel>Maximum Attendees</FieldLabel>
                              <Input
                                type="number"
                                value={form.maxAttendees}
                                onChange={(value) =>
                                  updateForm("maxAttendees", value)
                                }
                                placeholder="500"
                              />
                            </div>
                          </div>

                          {/* Waitlist */}
                          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-5">
                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                Enable Waitlist
                              </p>
                              <p className="mt-1 text-xs leading-5 text-slate-500">
                                Allow participants to join a waitlist when
                                registrations are full.
                              </p>
                            </div>

                            <SettingToggle
                              enabled={form.waitlistEnabled}
                              onChange={(value) =>
                                updateForm("waitlistEnabled", value)
                              }
                            />
                          </div>

                          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                            <div className="flex gap-3">
                              <Info
                                size={18}
                                className="mt-0.5 shrink-0 text-blue-600"
                              />

                              <div>
                                <p className="text-sm font-medium text-blue-800">
                                  Registration fields
                                </p>

                                <p className="mt-1 text-xs leading-5 text-blue-700">
                                  {form.registrationType === "team"
                                    ? "For team registrations, the selected member details will be collected for every participant in the team."
                                    : "Participants will provide their registration details during checkout."}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* STEP 7 */}
                  {currentStep === 7 && (
                    <div className="space-y-6">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex items-start gap-3">
                          <FileText
                            size={19}
                            className="mt-0.5 text-emerald-600"
                          />

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              Review your event
                            </p>
                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              Check all information before publishing the
                              event.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-xl border border-slate-200 p-5">
                          <div className="mb-4 flex items-center justify-between">
                            <div>
                              <h3 className="text-sm font-semibold text-slate-900">
                                Basic Information
                              </h3>
                            </div>

                            <button
                              type="button"
                              onClick={() => goToStep(1)}
                              className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700"
                            >
                              <Pencil size={13} />
                              Edit
                            </button>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <p className="text-xs text-slate-400">Title</p>
                              <p className="mt-1 text-sm font-medium text-slate-800">
                                {form.title || "-"}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-slate-400">
                                Category
                              </p>
                              <p className="mt-1 text-sm font-medium text-slate-800">
                                {form.category || "-"}
                              </p>
                            </div>

                            <div className="sm:col-span-2">
                              <p className="text-xs text-slate-400">
                                Description
                              </p>
                              <p className="mt-1 text-sm text-slate-600">
                                {form.shortDescription || "-"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 p-5">
                          <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-slate-900">
                              Venue & Schedule
                            </h3>

                            <button
                              type="button"
                              onClick={() => goToStep(2)}
                              className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700"
                            >
                              <Pencil size={13} />
                              Edit
                            </button>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <p className="text-xs text-slate-400">Venue</p>
                              <p className="mt-1 text-sm font-medium text-slate-800">
                                {form.venueName || "-"}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-slate-400">Mode</p>
                              <p className="mt-1 text-sm font-medium capitalize text-slate-800">
                                {form.eventMode}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-slate-400">Date</p>
                              <p className="mt-1 text-sm font-medium text-slate-800">
                                {form.startDate || "-"}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-slate-400">Time</p>
                              <p className="mt-1 text-sm font-medium text-slate-800">
                                {form.startTime} - {form.endTime}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 p-5">
                          <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-slate-900">
                              Ticket
                            </h3>

                            <button
                              type="button"
                              onClick={() => goToStep(5)}
                              className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700"
                            >
                              <Pencil size={13} />
                              Edit
                            </button>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-3">
                            <div>
                              <p className="text-xs text-slate-400">Name</p>
                              <p className="mt-1 text-sm font-medium text-slate-800">
                                {form.ticketName || "-"}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-slate-400">Price</p>
                              <p className="mt-1 text-sm font-medium text-slate-800">
                                ₹{form.ticketPrice || "0"}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-slate-400">
                                Quantity
                              </p>
                              <p className="mt-1 text-sm font-medium text-slate-800">
                                {form.ticketQuantity || "Unlimited"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Registration Review */}
                        <div className="rounded-xl border border-slate-200 p-5">
                          <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-slate-900">
                              Registration
                            </h3>

                            <button
                              type="button"
                              onClick={() => goToStep(6)}
                              className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700"
                            >
                              <Pencil size={13} />
                              Edit
                            </button>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <p className="text-xs text-slate-400">
                                Registration
                              </p>
                              <p className="mt-1 text-sm font-medium text-slate-800">
                                {form.registrationEnabled
                                  ? "Enabled"
                                  : "Disabled"}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-slate-400">Type</p>
                              <p className="mt-1 text-sm font-medium text-slate-800">
                                {registrationSummary}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-slate-400">
                                Max Attendees
                              </p>
                              <p className="mt-1 text-sm font-medium text-slate-800">
                                {form.maxAttendees || "No limit"}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-slate-400">
                                Waitlist
                              </p>
                              <p className="mt-1 text-sm font-medium text-slate-800">
                                {form.waitlistEnabled
                                  ? "Enabled"
                                  : "Disabled"}
                              </p>
                            </div>

                            {form.registrationEnabled &&
                              form.registrationType === "team" && (
                                <div className="sm:col-span-2">
                                  <p className="text-xs text-slate-400">
                                    Team Size
                                  </p>

                                  <p className="mt-1 text-sm font-medium text-slate-800">
                                    {form.minTeamSize} -{" "}
                                    {form.maxTeamSize} members per team
                                  </p>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <FieldLabel>Publishing Option</FieldLabel>

                        <div className="grid gap-3 md:grid-cols-3">
                          <button
                            type="button"
                            onClick={() =>
                              updateForm("publishMode", "now")
                            }
                            className={`rounded-lg border p-4 text-left ${
                              form.publishMode === "now"
                                ? "border-emerald-500 bg-emerald-50"
                                : "border-slate-200"
                            }`}
                          >
                            <p className="text-sm font-semibold text-slate-800">
                              Publish Now
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              Make the event available immediately.
                            </p>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              updateForm("publishMode", "schedule")
                            }
                            className={`rounded-lg border p-4 text-left ${
                              form.publishMode === "schedule"
                                ? "border-emerald-500 bg-emerald-50"
                                : "border-slate-200"
                            }`}
                          >
                            <p className="text-sm font-semibold text-slate-800">
                              Schedule
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              Publish the event at a selected time.
                            </p>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              updateForm("publishMode", "draft")
                            }
                            className={`rounded-lg border p-4 text-left ${
                              form.publishMode === "draft"
                                ? "border-emerald-500 bg-emerald-50"
                                : "border-slate-200"
                            }`}
                          >
                            <p className="text-sm font-semibold text-slate-800">
                              Save as Draft
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              Keep the event unpublished.
                            </p>
                          </button>
                        </div>
                      </div>

                      {form.publishMode === "schedule" && (
                        <div>
                          <FieldLabel>Publish Date</FieldLabel>
                          <Input
                            type="datetime-local"
                            value={form.publishDate}
                            onChange={(value) =>
                              updateForm("publishDate", value)
                            }
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                      currentStep === 1
                        ? "cursor-not-allowed border-slate-100 text-slate-300"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <ArrowLeft size={16} />
                    Previous
                  </button>

                  {currentStep < 7 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      Save & Continue
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleUpdateEvent}
                      disabled={saving}
                      className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Check size={16} />
                      {saving ? "Updating..." : "Update Event"}
                    </button>
                  )}
                </div>
              </section>

              {/* Live Preview */}
              <aside className="hidden xl:block">
                <div className="sticky top-24 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-100 px-5 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          Live Preview
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          Participant view
                        </p>
                      </div>

                      <Eye size={17} className="text-slate-400" />
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex h-36 items-center justify-center rounded-lg bg-slate-100">
                      <ImageIcon size={34} className="text-slate-300" />
                    </div>

                    <div className="mt-4">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                        {form.category || "Event"}
                      </span>

                      <h3 className="mt-3 text-base font-semibold text-slate-900">
                        {form.title || "Your Event Title"}
                      </h3>

                      <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-500">
                        {form.shortDescription ||
                          "Your event description will appear here."}
                      </p>
                    </div>

                    <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-3">
                        <CalendarDays
                          size={15}
                          className="text-emerald-600"
                        />
                        <div>
                          <p className="text-[10px] text-slate-400">Date</p>
                          <p className="text-xs font-medium text-slate-700">
                            {form.startDate || "Not selected"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin size={15} className="text-emerald-600" />
                        <div>
                          <p className="text-[10px] text-slate-400">
                            Location
                          </p>
                          <p className="text-xs font-medium text-slate-700">
                            {form.venueName || "Not selected"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Ticket size={15} className="text-emerald-600" />
                        <div>
                          <p className="text-[10px] text-slate-400">Ticket</p>
                          <p className="text-xs font-medium text-slate-700">
                            {form.ticketName || "General Pass"} · ₹
                            {form.ticketPrice || "0"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Users size={15} className="text-emerald-600" />
                        <div>
                          <p className="text-[10px] text-slate-400">
                            Registration
                          </p>
                          <p className="text-xs font-medium text-slate-700">
                            {registrationSummary}
                          </p>
                        </div>
                      </div>

                      {form.registrationEnabled &&
                        form.registrationType === "team" && (
                          <div className="rounded-lg bg-emerald-50 p-3">
                            <p className="text-[10px] font-semibold text-emerald-700">
                              Team Registration
                            </p>
                            <p className="mt-1 text-xs text-emerald-800">
                              {form.minTeamSize} - {form.maxTeamSize} members
                              per team
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>

      {/* View Event Modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <p className="text-xs text-slate-400">Event Preview</p>
                <h2 className="text-lg font-semibold text-slate-900">
                  {form.title || event.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setViewing(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex h-48 items-center justify-center rounded-xl bg-slate-100">
                <ImageIcon size={42} className="text-slate-300" />
              </div>

              <div className="mt-5">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {form.category}
                </span>

                <h3 className="mt-3 text-xl font-bold text-slate-900">
                  {form.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {form.detailedDescription || form.shortDescription}
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="text-xs text-slate-400">Date & Time</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {form.startDate} · {form.startTime} - {form.endTime}
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="text-xs text-slate-400">Venue</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {form.venueName}
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="text-xs text-slate-400">Ticket</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {form.ticketName} · ₹{form.ticketPrice}
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="text-xs text-slate-400">Registration</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {registrationSummary}
                  </p>
                </div>
              </div>

              {form.registrationEnabled &&
                form.registrationType === "team" && (
                  <div className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                    <p className="text-sm font-semibold text-emerald-800">
                      Team Registration
                    </p>

                    <p className="mt-1 text-xs text-emerald-700">
                      Teams can contain {form.minTeamSize} to{" "}
                      {form.maxTeamSize} members.
                    </p>
                  </div>
                )}
            </div>

            <div className="flex justify-end border-t border-slate-100 px-6 py-4">
              <button
                type="button"
                onClick={() => setViewing(false)}
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
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