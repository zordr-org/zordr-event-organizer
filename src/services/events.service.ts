import {
  createMockEvent,
  deleteMockEvent,
  getMockEventById,
  getMockEvents,
  updateMockEvent,
} from "@/mock/db";

import type { EventDetails } from "@/types/event";

export function getEvents(): EventDetails[] {
  return getMockEvents() as EventDetails[];
}

export function getEventById(
  eventId: string,
): EventDetails | undefined {
  return getMockEventById(eventId);
}

export function createEvent(
  event: EventDetails,
): EventDetails {
  return createMockEvent(event);
}

export function updateEvent(
  eventId: string,
  updates: Partial<EventDetails>,
): EventDetails | undefined {
  return updateMockEvent(eventId, updates);
}

export function deleteEvent(
  eventId: string,
): boolean {
  return deleteMockEvent(eventId);
}

export function getEventsByStatus(
  status: EventDetails["status"],
): EventDetails[] {
  return getEvents().filter(
    (event) => event.status === status,
  );
}

export function searchEvents(
  searchTerm: string,
): EventDetails[] {
  const query = searchTerm.trim().toLowerCase();

  if (!query) {
    return getEvents();
  }

  return getEvents().filter((event) => {
    return (
      event.title.toLowerCase().includes(query) ||
      event.category.toLowerCase().includes(query) ||
      event.venue.toLowerCase().includes(query) ||
      event.tags.some((tag) =>
        tag.toLowerCase().includes(query),
      )
    );
  });
}