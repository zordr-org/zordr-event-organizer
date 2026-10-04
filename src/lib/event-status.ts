import type {
  EventStatus,
} from "@/types/common";

export function getEventStatusLabel(
  status: EventStatus,
): string {
  return status;
}

export function isActiveEvent(
  status: EventStatus,
): boolean {
  return (
    status === "On Sale" ||
    status === "Ongoing"
  );
}

export function isUpcomingEvent(
  status: EventStatus,
): boolean {
  return status === "Upcoming";
}

export function isCompletedEvent(
  status: EventStatus,
): boolean {
  return status === "Completed";
}

export function isDraftEvent(
  status: EventStatus,
): boolean {
  return status === "Draft";
}

export function isCancelledEvent(
  status: EventStatus,
): boolean {
  return status === "Cancelled";
}

export function getEventStatusClass(
  status: EventStatus,
): string {
  switch (status) {
    case "On Sale":
      return "bg-emerald-100 text-emerald-700";

    case "Upcoming":
      return "bg-blue-100 text-blue-700";

    case "Ongoing":
      return "bg-purple-100 text-purple-700";

    case "Completed":
      return "bg-gray-100 text-gray-700";

    case "Draft":
      return "bg-amber-100 text-amber-700";

    case "Cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}