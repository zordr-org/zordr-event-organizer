"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  Home,
  MoreVertical,
  RefreshCw,
  ScanLine,
  Settings,
  ShieldCheck,
  Users,
  XCircle,
  Camera,
  CameraOff,
  RotateCcw,
  Zap,
  X,
  Ticket,
  Hash,
} from "lucide-react";
import {
  useEffect,
  useState,
  useRef,
} from "react";

import {
  getEventById,
} from "@/services/events.service";

import {
  getRecentCheckIns,
  getScannerStats,
} from "@/services/scanner.service";

import type {
  CheckIn,
} from "@/types/checkin";

const SELECTED_EVENT_ID = "1";

type CameraStatus =
  | "idle"
  | "starting"
  | "ready"
  | "denied"
  | "unavailable"
  | "error";

export default function ScannerPage() {
  const [
    activeTab,
    setActiveTab,
  ] = useState<"scan" | "manual">(
    "scan",
  );

  const [sound, setSound] =
    useState(true);

  const [details, setDetails] =
    useState(true);

  const [multiple, setMultiple] =
    useState(false);

  const videoRef =
    useRef<HTMLVideoElement | null>(
      null,
    );

  const streamRef =
    useRef<MediaStream | null>(
      null,
    );

  const [
    cameraStatus,
    setCameraStatus,
  ] =
    useState<CameraStatus>(
      "idle",
    );

  const [
    cameraError,
    setCameraError,
  ] = useState("");

  const [
    torchSupported,
    setTorchSupported,
  ] = useState(false);

  const [
    torchOn,
    setTorchOn,
  ] = useState(false);

  const [
    showAllScans,
    setShowAllScans,
  ] = useState(false);

  const [
    selectedScan,
    setSelectedScan,
  ] =
    useState<CheckIn | null>(
      null,
    );

  const [
    dataRefreshKey,
    setDataRefreshKey,
  ] = useState(0);

  /*
   * CENTRALIZED EVENT DATA
   */
  const currentEvent =
    getEventById(
      SELECTED_EVENT_ID,
    );

  /*
   * CENTRALIZED SCANNER DATA
   */
  const scannerStats =
    getScannerStats(
      SELECTED_EVENT_ID,
    );

  const scans =
    getRecentCheckIns();

  /*
   * Keep React aware when scanner
   * data is manually refreshed.
   */
  void dataRefreshKey;

  const checkedInPercentage =
    scannerStats.totalRegistrations >
    0
      ? Math.round(
          (scannerStats.checkedIn /
            scannerStats.totalRegistrations) *
            100,
        )
      : 0;

  const pendingPercentage =
    scannerStats.totalRegistrations >
    0
      ? Math.round(
          (scannerStats.pending /
            scannerStats.totalRegistrations) *
            100,
        )
      : 0;

  /* =====================================================
     CAMERA
  ===================================================== */

  const startCamera = async () => {
    setCameraStatus("starting");
    setCameraError("");
    setTorchOn(false);

    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach(
          (track) => track.stop(),
        );

      streamRef.current = null;
    }

    try {
      if (
        !navigator.mediaDevices
          ?.getUserMedia
      ) {
        setCameraStatus(
          "unavailable",
        );

        setCameraError(
          "Camera access is not available in this browser.",
        );

        return;
      }

      if (!window.isSecureContext) {
        setCameraStatus("error");

        setCameraError(
          "Camera access requires HTTPS or localhost.",
        );

        return;
      }

      const stream =
        await navigator.mediaDevices.getUserMedia(
          {
            video: {
              facingMode: {
                ideal: "environment",
              },

              width: {
                ideal: 1280,
              },

              height: {
                ideal: 720,
              },
            },

            audio: false,
          },
        );

      streamRef.current =
        stream;

      const video =
        videoRef.current;

      if (!video) {
        stream
          .getTracks()
          .forEach(
            (track) =>
              track.stop(),
          );

        streamRef.current =
          null;

        setCameraStatus(
          "error",
        );

        setCameraError(
          "Camera preview could not be initialized.",
        );

        return;
      }

      video.srcObject =
        stream;

      const track =
        stream.getVideoTracks()[0];

      if (
        track &&
        "getCapabilities" in
          track
      ) {
        const capabilities =
          track.getCapabilities() as MediaTrackCapabilities & {
            torch?: boolean;
          };

        setTorchSupported(
          Boolean(
            capabilities.torch,
          ),
        );
      } else {
        setTorchSupported(false);
      }

      setCameraStatus("ready");
    } catch (error) {
      console.error(
        "Camera error:",
        error,
      );

      const cameraErrorObject =
        error as DOMException;

      if (
        cameraErrorObject?.name ===
          "NotAllowedError" ||
        cameraErrorObject?.name ===
          "PermissionDeniedError"
      ) {
        setCameraStatus(
          "denied",
        );

        setCameraError(
          "Camera permission was denied. Allow camera access in your browser and try again.",
        );
      } else if (
        cameraErrorObject?.name ===
          "NotFoundError" ||
        cameraErrorObject?.name ===
          "DevicesNotFoundError"
      ) {
        setCameraStatus(
          "unavailable",
        );

        setCameraError(
          "No camera was found on this device.",
        );
      } else if (
        cameraErrorObject?.name ===
        "NotReadableError"
      ) {
        setCameraStatus(
          "error",
        );

        setCameraError(
          "The camera is being used by another application.",
        );
      } else {
        setCameraStatus(
          "error",
        );

        setCameraError(
          "Unable to access the camera. Please check your browser permissions.",
        );
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach(
          (track) =>
            track.stop(),
        );

      streamRef.current =
        null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject =
        null;
    }

    setTorchOn(false);
    setTorchSupported(false);
  };

  useEffect(() => {
    if (activeTab !== "scan") {
      stopCamera();
      setCameraStatus("idle");

      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [activeTab]);

  const toggleTorch =
    async () => {
      const track =
        streamRef.current?.getVideoTracks()[0];

      if (
        !track ||
        !torchSupported
      ) {
        return;
      }

      try {
        const nextTorchState =
          !torchOn;

        await track.applyConstraints(
          {
            advanced: [
              {
                torch:
                  nextTorchState,
              } as MediaTrackConstraintSet & {
                torch?: boolean;
              },
            ],
          },
        );

        setTorchOn(
          nextTorchState,
        );
      } catch (error) {
        console.error(
          "Torch error:",
          error,
        );

        setCameraError(
          "Flashlight control is not supported by this camera.",
        );
      }
    };

  const handleRefresh =
    () => {
      setDataRefreshKey(
        (value) => value + 1,
      );
    };

  return (
    <main className="min-h-screen bg-[#f9fbfc] text-[#17233f]">
      <div className="flex min-h-screen">

        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        <aside className="hidden w-[208px] shrink-0 border-r border-[#e4edf1] bg-white lg:flex lg:flex-col">

          <div className="px-7 pt-6">
            <div className="text-[38px] font-black leading-none tracking-[-3px]">
              <span className="text-[#31d29a]">
                Z
              </span>

              <span className="text-[#17233f]">
                ordr
              </span>
            </div>

            <p className="mt-1 text-[12px] text-[#5b7098]">
              Events. Experiences. Together.
            </p>
          </div>

          <nav className="mt-8 space-y-2 px-3">

            <SidebarItem
              href="/dashboard"
              icon={<Home size={21} />}
              label="Dashboard"
            />

            <SidebarItem
              href="/events"
              icon={<CalendarDays size={21} />}
              label="Events"
            />

            <SidebarItem
              href="/scanner"
              icon={<ScanLine size={21} />}
              label="Scanner"
              active
            />

            <SidebarItem
              href="/settlements"
              icon={<ShieldCheck size={21} />}
              label="Settlements"
            />

            <SidebarItem
              href="/orders"
              icon={<Users size={21} />}
              label={
                <>
                  Orders &
                  <br />
                  Registrations
                </>
              }
            />

            <SidebarItem
              href="/settings"
              icon={<Settings size={21} />}
              label="Settings"
            />
          </nav>

          <div className="mt-auto p-5 pb-8">
            <div className="rounded-xl bg-[#e8faf3] px-5 py-5">

              <div className="flex items-center gap-3">
                <div className="text-[#0eae71]">
                  <CircleHelp size={25} />
                </div>

                <p className="text-sm font-semibold">
                  Need help?
                </p>
              </div>

              <p className="mt-3 text-xs leading-5 text-[#60749a]">
                Our team is here to help
                <br />
                you succeed.
              </p>

              <button
                type="button"
                className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#079e67]"
              >
                Contact Support
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </aside>

        {/* =====================================================
            MAIN
        ===================================================== */}

        <section className="min-w-0 flex-1">

          {/* HEADER */}

          <header className="flex h-[65px] items-center justify-end border-b border-[#e5edf1] bg-white px-7">

            <div className="flex items-center gap-7">

              <button
                type="button"
                className="relative text-[#354b7b]"
              >
                <Bell size={23} />

                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#ef4652]" />
              </button>

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#11141b] text-[10px] font-bold text-white">
                  KC
                </div>

                <div className="hidden sm:block">
                  <p className="text-sm font-semibold">
                    KITSW Cultural Club
                  </p>

                  <p className="text-xs text-[#61759b]">
                    Organizer
                  </p>
                </div>

                <ChevronDown size={17} />
              </div>
            </div>
          </header>

          <div className="px-5 py-6 sm:px-7 xl:px-8">

            {/* TITLE */}

            <div className="mb-5">

              <Link
                href="/events"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-[#304878]"
              >
                <ArrowLeft size={17} />
                Back to Events
              </Link>

              <h1 className="text-[29px] font-bold tracking-[-0.8px]">
                Scanner
              </h1>

              <p className="text-[17px] text-[#5b709a]">
                Scan QR codes to check in attendees quickly and securely.
              </p>
            </div>

            {/* EVENT CARD */}

            {currentEvent && (
              <div className="flex flex-col gap-4 rounded-lg border border-[#dfe8ed] bg-white p-3 xl:flex-row xl:items-center">

                <div
                  className="flex h-[98px] w-full items-center justify-center rounded-md xl:w-[225px]"
                  style={{
                    background:
                      currentEvent.gradient,
                  }}
                >
                  <div className="text-center text-white">

                    <p className="text-lg font-bold">
                      {currentEvent.title
                        .split(" ")
                        .slice(0, 1)
                        .join(" ")
                        .toUpperCase()}
                    </p>

                    <p className="text-xs tracking-[4px]">
                      {currentEvent.title
                        .split(" ")
                        .slice(1)
                        .join(" ")
                        .toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="flex-1">

                  <h2 className="text-lg font-bold">
                    {currentEvent.title}
                  </h2>

                  <p className="mt-1 text-sm text-[#536a94]">
                    {currentEvent.date}
                    <span className="mx-2">
                      •
                    </span>
                    {currentEvent.venue}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {currentEvent.tags.map(
                      (tag) => (
                        <Tag
                          key={tag}
                        >
                          {tag}
                        </Tag>
                      ),
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">

                  <span className="flex items-center gap-2 rounded-lg bg-[#e5faf1] px-4 py-2 text-sm font-semibold text-[#0aa96c]">
                    <span className="h-2 w-2 rounded-full bg-[#0aae70]" />
                    Live
                  </span>

                  <Link
                    href="/events"
                    className="flex items-center gap-3 rounded-lg border border-[#dce5ed] px-5 py-3 text-sm font-semibold transition hover:bg-[#f7fafc]"
                  >
                    View Event
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            )}

            {/* SCANNER + RIGHT */}

            <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,2fr)_380px]">

              {/* SCANNER */}

              <section className="overflow-hidden rounded-lg border border-[#e1e9ee] bg-white">

                <div className="flex border-b border-[#edf1f4] px-4">

                  <button
                    type="button"
                    onClick={() =>
                      setActiveTab(
                        "scan",
                      )
                    }
                    className={`relative px-4 py-4 text-sm font-medium ${
                      activeTab ===
                      "scan"
                        ? "text-[#09aa6a]"
                        : "text-[#3e537e]"
                    }`}
                  >
                    Scan QR

                    {activeTab ===
                      "scan" && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0bb878]" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveTab(
                        "manual",
                      )
                    }
                    className={`relative px-4 py-4 text-sm font-medium ${
                      activeTab ===
                      "manual"
                        ? "text-[#09aa6a]"
                        : "text-[#3e537e]"
                    }`}
                  >
                    Manual Check-in

                    {activeTab ===
                      "manual" && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0bb878]" />
                    )}
                  </button>
                </div>

                {activeTab ===
                "scan" ? (
                  <div className="p-3">

                    <div className="relative h-[445px] overflow-hidden rounded-lg bg-[#071017]">

                      {/* REAL CAMERA */}

                      <video
                        ref={
                          videoRef
                        }
                        autoPlay
                        muted
                        playsInline
                        className={`absolute inset-0 h-full w-full object-cover ${
                          cameraStatus ===
                          "ready"
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />

                      {cameraStatus ===
                        "ready" && (
                        <div className="absolute inset-0 bg-black/20" />
                      )}

                      {/* STARTING */}

                      {cameraStatus ===
                        "starting" && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#071017] text-center text-white">

                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                            <Camera
                              size={
                                30
                              }
                              className="animate-pulse text-[#31d29a]"
                            />
                          </div>

                          <h3 className="mt-5 text-lg font-semibold">
                            Starting camera...
                          </h3>

                          <p className="mt-2 max-w-sm px-6 text-sm text-white/60">
                            Please allow
                            camera access
                            when your
                            browser asks
                            for permission.
                          </p>
                        </div>
                      )}

                      {/* CAMERA ERROR */}

                      {(cameraStatus ===
                        "denied" ||
                        cameraStatus ===
                          "unavailable" ||
                        cameraStatus ===
                          "error") && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#071017] px-6 text-center text-white">

                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                            <CameraOff
                              size={
                                30
                              }
                              className="text-[#ff7882]"
                            />
                          </div>

                          <h3 className="mt-5 text-lg font-semibold">
                            Camera unavailable
                          </h3>

                          <p className="mt-2 max-w-md text-sm leading-6 text-white/60">
                            {
                              cameraError
                            }
                          </p>

                          <button
                            type="button"
                            onClick={
                              startCamera
                            }
                            className="mt-5 flex items-center gap-2 rounded-lg bg-[#13b878] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0fa86e]"
                          >
                            <RotateCcw
                              size={
                                16
                              }
                            />
                            Restart Camera
                          </button>
                        </div>
                      )}

                      {/* SCANNING FRAME */}

                      {cameraStatus ===
                        "ready" && (
                        <>
                          <span className="absolute left-[22%] top-[22%] h-10 w-10 border-l-[3px] border-t-[3px] border-[#24e19b]" />

                          <span className="absolute right-[22%] top-[22%] h-10 w-10 border-r-[3px] border-t-[3px] border-[#24e19b]" />

                          <span className="absolute bottom-[22%] left-[22%] h-10 w-10 border-b-[3px] border-l-[3px] border-[#24e19b]" />

                          <span className="absolute bottom-[22%] right-[22%] h-10 w-10 border-b-[3px] border-r-[3px] border-[#24e19b]" />

                          <div
                            className="absolute left-[22%] right-[22%] top-1/2 h-[2px] bg-[#26e6a0] shadow-[0_0_12px_rgba(38,230,160,0.9)]"
                            style={{
                              animation:
                                "scannerLine 2.4s ease-in-out infinite",
                            }}
                          />

                          <div className="absolute left-1/2 top-6 -translate-x-1/2">

                            <div className="flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">

                              <span className="h-2 w-2 animate-pulse rounded-full bg-[#24e19b]" />

                              Camera ready
                            </div>
                          </div>

                          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-center text-white">

                            <p className="text-sm font-semibold drop-shadow-lg">
                              Align the QR code
                              within the frame
                            </p>

                            <p className="mt-1 text-xs text-white/70">
                              Keep the QR code
                              steady for scanning
                            </p>
                          </div>

                          {torchSupported && (
                            <button
                              type="button"
                              onClick={
                                toggleTorch
                              }
                              className={`absolute bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border transition ${
                                torchOn
                                  ? "border-[#24e19b] bg-[#24e19b] text-[#071017]"
                                  : "border-white/30 bg-black/50 text-white backdrop-blur-sm hover:bg-black/70"
                              }`}
                              aria-label="Toggle flashlight"
                            >
                              <Zap
                                size={
                                  19
                                }
                              />
                            </button>
                          )}
                        </>
                      )}

                      {cameraStatus ===
                        "ready" && (
                        <div className="absolute bottom-3 left-3">

                          <div className="flex items-center gap-2 rounded-md bg-black/40 px-3 py-1.5 text-[10px] text-white/80 backdrop-blur-sm">
                            <Camera
                              size={
                                12
                              }
                            />
                            Live camera
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between px-2 pt-3">

                      <div className="flex items-center gap-2 text-xs text-[#63779b]">

                        <span
                          className={`h-2 w-2 rounded-full ${
                            cameraStatus ===
                            "ready"
                              ? "bg-[#13b878]"
                              : cameraStatus ===
                                  "starting"
                                ? "bg-[#f2a33b]"
                                : "bg-[#ef4652]"
                          }`}
                        />

                        {cameraStatus ===
                        "ready"
                          ? "Camera connected"
                          : cameraStatus ===
                              "starting"
                            ? "Connecting to camera..."
                            : "Camera not connected"}
                      </div>

                      {cameraStatus ===
                        "ready" && (
                        <button
                          type="button"
                          onClick={
                            startCamera
                          }
                          className="flex items-center gap-1.5 text-xs font-semibold text-[#2871dc]"
                        >
                          <RefreshCw
                            size={
                              13
                            }
                          />
                          Restart
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <ManualCheckIn />
                )}
              </section>

              {/* RIGHT SIDE */}

              <div className="space-y-4">

                {/* STATS */}

                <section className="rounded-lg border border-[#e1e9ee] bg-white p-4">

                  <div className="mb-3 flex items-center justify-between">

                    <div className="flex items-center gap-3">
                      <BarChartIcon />

                      <h2 className="font-bold">
                        Check-in Stats
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={
                        handleRefresh
                      }
                      className="flex items-center gap-2 text-sm text-[#2871dc]"
                    >
                      <RefreshCw
                        size={
                          17
                        }
                      />
                      Refresh
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    <StatCard
                      icon={
                        <Users
                          size={22}
                        />
                      }
                      value={scannerStats.totalRegistrations.toLocaleString(
                        "en-IN",
                      )}
                      label="Total Registrations"
                      type="blue"
                    />

                    <StatCard
                      icon={
                        <CheckCircle2
                          size={22}
                        />
                      }
                      value={scannerStats.checkedIn.toLocaleString(
                        "en-IN",
                      )}
                      label={
                        <>
                          Checked In
                          <br />
                          ({checkedInPercentage}%)
                        </>
                      }
                      type="green"
                    />

                    <StatCard
                      icon={
                        <Clock3
                          size={22}
                        />
                      }
                      value={scannerStats.pending.toLocaleString(
                        "en-IN",
                      )}
                      label={
                        <>
                          Pending
                          <br />
                          ({pendingPercentage}%)
                        </>
                      }
                      type="orange"
                    />

                    <StatCard
                      icon={
                        <XCircle
                          size={22}
                        />
                      }
                      value={scannerStats.invalidScans.toLocaleString(
                        "en-IN",
                      )}
                      label="Invalid Scans"
                      type="red"
                    />
                  </div>
                </section>

                {/* SETTINGS */}

                <section className="rounded-lg border border-[#e1e9ee] bg-white p-4">

                  <div className="mb-4 flex items-center gap-3">

                    <Settings
                      size={22}
                      className="text-[#2773dc]"
                    />

                    <h2 className="font-bold">
                      Scanner Settings
                    </h2>
                  </div>

                  <ToggleRow
                    label="Play sound on successful scan"
                    enabled={sound}
                    onClick={() =>
                      setSound(
                        !sound,
                      )
                    }
                  />

                  <ToggleRow
                    label="Show attendee details after scan"
                    enabled={details}
                    onClick={() =>
                      setDetails(
                        !details,
                      )
                    }
                  />

                  <ToggleRow
                    label="Allow multiple entries (if enabled)"
                    enabled={multiple}
                    onClick={() =>
                      setMultiple(
                        !multiple,
                      )
                    }
                  />
                </section>

                {/* HELP */}

                <section className="rounded-lg bg-[#edf5ff] p-4">

                  <div className="flex gap-3">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2875e8] text-white">
                      <CircleHelp
                        size={18}
                      />
                    </div>

                    <div>

                      <h3 className="font-semibold">
                        Need help with scanning?
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-[#536a90]">
                        Ensure good lighting
                        and keep the QR code
                        <br />
                        within the frame for
                        best results.
                      </p>

                      <button
                        type="button"
                        className="mt-1 flex items-center gap-2 text-sm font-semibold text-[#0ba86a]"
                      >
                        View Guidelines
                        <ArrowRight
                          size={
                            15
                          }
                        />
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* RECENT SCANS */}

            <section className="mt-4 overflow-hidden rounded-lg border border-[#e1e9ee] bg-white">

              <div className="flex items-center justify-between border-b border-[#e7eef2] px-5 py-3">

                <div className="flex items-center gap-3">

                  <Clock3
                    size={22}
                    className="text-[#2674df]"
                  />

                  <h2 className="font-bold">
                    Recent Scans
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowAllScans(
                      true,
                    )
                  }
                  className="flex items-center gap-2 text-sm font-medium text-[#344c7b] transition hover:text-[#0ba86a]"
                >
                  View All
                  <ArrowRight
                    size={17}
                  />
                </button>
              </div>

              <div className="overflow-x-auto">

                <table className="w-full min-w-[850px] text-left">

                  <thead>
                    <tr className="bg-[#f5f7f9] text-xs font-semibold text-[#344a74]">

                      <th className="px-4 py-3">
                        #
                      </th>

                      <th className="px-4 py-3">
                        Name
                      </th>

                      <th className="px-4 py-3">
                        Ticket Type
                      </th>

                      <th className="px-4 py-3">
                        Order ID
                      </th>

                      <th className="px-4 py-3">
                        Scan Time
                      </th>

                      <th className="px-4 py-3">
                        Status
                      </th>

                      <th className="px-4 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {scans
                      .slice(0, 5)
                      .map(
                        (
                          scan,
                          index,
                        ) => (
                          <tr
                            key={
                              scan.id
                            }
                            className="border-t border-[#edf1f3] text-xs"
                          >

                            <td className="px-4 py-3">
                              {
                                index +
                                1
                              }
                            </td>

                            <td className="px-4 py-3 font-medium">
                              {
                                scan.name
                              }
                            </td>

                            <td className="px-4 py-3">
                              {
                                scan.ticket
                              }
                            </td>

                            <td className="px-4 py-3">
                              {
                                scan.order
                              }
                            </td>

                            <td className="px-4 py-3">
                              {
                                scan.time
                              }
                            </td>

                            <td className="px-4 py-3">

                              <span
                                className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                                  scan.status ===
                                  "Checked In"
                                    ? "bg-[#e5faf1] text-[#0ba86b]"
                                    : scan.status ===
                                        "Invalid"
                                      ? "bg-[#ffe9e9] text-[#d34b4b]"
                                      : "bg-[#fff3df] text-[#dc8a0d]"
                                }`}
                              >
                                {
                                  scan.status
                                }
                              </span>
                            </td>

                            <td className="px-4 py-3">

                              <div className="flex items-center gap-5">

                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedScan(
                                      scan,
                                    )
                                  }
                                  className="rounded-md bg-[#eef4ff] px-4 py-1.5 text-[11px] font-semibold text-[#2169d1] transition hover:bg-[#dce9ff]"
                                >
                                  View
                                </button>

                                <button
                                  type="button"
                                  className="text-[#53617b]"
                                >
                                  <MoreVertical
                                    size={
                                      17
                                    }
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </section>
      </div>

      {/* =====================================================
          VIEW ALL SCANS MODAL
      ===================================================== */}

      {showAllScans && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
          onClick={() =>
            setShowAllScans(
              false,
            )
          }
        >

          <div
            className="max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(
              event,
            ) =>
              event.stopPropagation()
            }
          >

            <div className="flex items-center justify-between border-b border-[#e6edf1] px-6 py-5">

              <div>

                <h2 className="text-xl font-bold">
                  All Recent Scans
                </h2>

                <p className="mt-1 text-sm text-[#61759b]">
                  Latest attendee check-ins for{" "}
                  {currentEvent?.title ??
                    "selected event"}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAllScans(
                    false,
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f6f8] text-[#53627b] transition hover:bg-[#e8edf1]"
              >
                <X size={19} />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-auto p-5">

              <div className="overflow-hidden rounded-xl border border-[#e3eaf0]">

                <table className="w-full min-w-[800px] text-left">

                  <thead>
                    <tr className="bg-[#f6f8fa] text-xs font-semibold text-[#344a74]">

                      <th className="px-5 py-4">
                        #
                      </th>

                      <th className="px-5 py-4">
                        Attendee
                      </th>

                      <th className="px-5 py-4">
                        Ticket
                      </th>

                      <th className="px-5 py-4">
                        Order ID
                      </th>

                      <th className="px-5 py-4">
                        Scan Time
                      </th>

                      <th className="px-5 py-4">
                        Status
                      </th>

                      <th className="px-5 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {scans.map(
                      (
                        scan,
                        index,
                      ) => (
                        <tr
                          key={
                            scan.id
                          }
                          className="border-t border-[#edf1f3] text-sm"
                        >

                          <td className="px-5 py-4">
                            {
                              index +
                              1
                            }
                          </td>

                          <td className="px-5 py-4 font-semibold">
                            {
                              scan.name
                            }
                          </td>

                          <td className="px-5 py-4">
                            {
                              scan.ticket
                            }
                          </td>

                          <td className="px-5 py-4">
                            {
                              scan.order
                            }
                          </td>

                          <td className="px-5 py-4">
                            {
                              scan.time
                            }
                          </td>

                          <td className="px-5 py-4">

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                scan.status ===
                                "Checked In"
                                  ? "bg-[#e5faf1] text-[#0ba86b]"
                                  : scan.status ===
                                      "Invalid"
                                    ? "bg-[#ffe9e9] text-[#d34b4b]"
                                    : "bg-[#fff3df] text-[#dc8a0d]"
                              }`}
                            >
                              {
                                scan.status
                              }
                            </span>
                          </td>

                          <td className="px-5 py-4">

                            <button
                              type="button"
                              onClick={() => {
                                setShowAllScans(
                                  false,
                                );

                                setSelectedScan(
                                  scan,
                                );
                              }}
                              className="rounded-md bg-[#eef4ff] px-4 py-2 text-xs font-semibold text-[#2169d1] transition hover:bg-[#dce9ff]"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          INDIVIDUAL SCAN DETAILS
      ===================================================== */}

      {selectedScan && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
          onClick={() =>
            setSelectedScan(
              null,
            )
          }
        >

          <div
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(
              event,
            ) =>
              event.stopPropagation()
            }
          >

            <div className="flex items-center justify-between border-b border-[#e6edf1] px-6 py-5">

              <div>

                <h2 className="text-xl font-bold">
                  Attendee Details
                </h2>

                <p className="mt-1 text-xs text-[#61759b]">
                  Check-in information
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedScan(
                    null,
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f6f8] text-[#53627b] transition hover:bg-[#e8edf1]"
              >
                <X size={19} />
              </button>
            </div>

            <div className="p-6">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e7f8f1] text-lg font-bold text-[#0ba86b]">
                  {selectedScan.name
                    .split(" ")
                    .map(
                      (part) =>
                        part[0],
                    )
                    .join("")
                    .slice(
                      0,
                      2,
                    )}
                </div>

                <div>

                  <h3 className="text-lg font-bold">
                    {
                      selectedScan.name
                    }
                  </h3>

                  <span
                    className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      selectedScan.status ===
                      "Checked In"
                        ? "bg-[#e5faf1] text-[#0ba86b]"
                        : selectedScan.status ===
                            "Invalid"
                          ? "bg-[#ffe9e9] text-[#d34b4b]"
                          : "bg-[#fff3df] text-[#dc8a0d]"
                    }`}
                  >
                    {
                      selectedScan.status
                    }
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">

                <DetailRow
                  icon={
                    <Ticket
                      size={
                        18
                      }
                    />
                  }
                  label="Ticket Type"
                  value={
                    selectedScan.ticket
                  }
                />

                <DetailRow
                  icon={
                    <Hash
                      size={
                        18
                      }
                    />
                  }
                  label="Order ID"
                  value={
                    selectedScan.order
                  }
                />

                <DetailRow
                  icon={
                    <Clock3
                      size={
                        18
                      }
                    />
                  }
                  label="Scan Time"
                  value={
                    selectedScan.time
                  }
                />

                <DetailRow
                  icon={
                    <CheckCircle2
                      size={
                        18
                      }
                    />
                  }
                  label="Check-in Status"
                  value={
                    selectedScan.status
                  }
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedScan(
                    null,
                  )
                }
                className="mt-6 w-full rounded-lg bg-[#12b878] py-3 text-sm font-semibold text-white transition hover:bg-[#0fa86e]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scannerLine {
          0% {
            transform: translateY(-115px);
            opacity: 0.35;
          }

          50% {
            transform: translateY(115px);
            opacity: 1;
          }

          100% {
            transform: translateY(-115px);
            opacity: 0.35;
          }
        }
      `}</style>
    </main>
  );
}

/* =========================================================
   SIDEBAR ITEM
========================================================= */

function SidebarItem({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex w-full items-center gap-5 rounded-lg px-4 py-3 text-left text-sm font-semibold transition ${
        active
          ? "bg-[#e1f8ef] text-[#15213c]"
          : "text-[#465a83] hover:bg-[#f5f8fa]"
      }`}
    >
      <span
        className={
          active
            ? "text-[#0bb878]"
            : "text-[#51668f]"
        }
      >
        {icon}
      </span>

      <span>{label}</span>
    </Link>
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
    <span className="rounded-md bg-[#eef2ff] px-3 py-1.5 text-xs font-semibold text-[#354fc2]">
      {children}
    </span>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  value,
  label,
  type,
}: {
  icon: React.ReactNode;
  value: string;
  label: React.ReactNode;
  type:
    | "blue"
    | "green"
    | "orange"
    | "red";
}) {
  const styles = {
    blue: {
      box: "bg-[#f7faff]",
      icon: "bg-[#edf5ff] text-[#2775df]",
    },

    green: {
      box: "bg-[#f7fcfa]",
      icon: "bg-[#e3faf0] text-[#0aaf70]",
    },

    orange: {
      box: "bg-[#fffdf8]",
      icon: "bg-[#fff2df] text-[#f18a20]",
    },

    red: {
      box: "bg-[#fffafa]",
      icon: "bg-[#fff0f1] text-[#ef3f4a]",
    },
  };

  return (
    <div
      className={`flex min-h-[82px] items-center gap-3 rounded-lg border border-[#e4ebef] p-3 ${styles[type].box}`}
    >
      <div
        className={`rounded-full p-3 ${styles[type].icon}`}
      >
        {icon}
      </div>

      <div>

        <p className="text-[21px] font-bold leading-none">
          {value}
        </p>

        <p className="mt-2 text-xs leading-4 text-[#53698f]">
          {label}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   TOGGLE
========================================================= */

function ToggleRow({
  label,
  enabled,
  onClick,
}: {
  label: string;
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">

      <span className="text-sm text-[#3f557e]">
        {label}
      </span>

      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={`relative h-5 w-9 shrink-0 rounded-full transition ${
          enabled
            ? "bg-[#13b878]"
            : "bg-[#aab6ca]"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled
              ? "left-[18px]"
              : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

/* =========================================================
   MANUAL CHECK-IN
========================================================= */

function ManualCheckIn() {
  return (
    <div className="flex min-h-[445px] flex-col items-center justify-center p-8 text-center">

      <div className="rounded-full bg-[#e9f8f2] p-5 text-[#0aae70]">
        <Users size={34} />
      </div>

      <h2 className="mt-5 text-xl font-bold">
        Manual Check-in
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-[#60749a]">
        Search for an attendee using their name or order ID
        and check them in manually.
      </p>

      <div className="mt-6 flex w-full max-w-md gap-3">

        <input
          placeholder="Name or Order ID"
          className="h-11 flex-1 rounded-lg border border-[#dbe4ea] px-4 text-sm outline-none focus:border-[#19b97e]"
        />

        <button
          type="button"
          className="rounded-lg bg-[#12b878] px-5 text-sm font-semibold text-white"
        >
          Search
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   DETAIL ROW
========================================================= */

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-[#e7edf1] bg-[#fafcfd] p-4">

      <div className="text-[#2674df]">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-xs text-[#6a7c9d]">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-semibold text-[#17233f]">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   BAR ICON
========================================================= */

function BarChartIcon() {
  return (
    <div className="flex items-end gap-1 text-[#2775df]">

      <span className="h-3 w-1.5 rounded-sm bg-current" />

      <span className="h-5 w-1.5 rounded-sm bg-current" />

      <span className="h-7 w-1.5 rounded-sm bg-current" />
    </div>
  );
}