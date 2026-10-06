import {
  mockOrganizer,
} from "@/mock/db";

import type { Organizer } from "@/types/organizer";

export function getOrganizer(): Organizer {
  return mockOrganizer;
}

export function updateOrganizer(
  updates: Partial<Organizer>,
): Organizer {
  Object.assign(
    mockOrganizer,
    updates,
  );

  return mockOrganizer;
}

export function getOrganizerName(): string {
  return mockOrganizer.name;
}

export function getOrganizerEmail(): string {
  return mockOrganizer.email;
}

export function getOrganizerPhone(): string {
  return mockOrganizer.phone;
}

export function getOrganizerLocation(): string {
  return `${mockOrganizer.city}, ${mockOrganizer.state}`;
}

export function isOrganizerActive(): boolean {
  return mockOrganizer.status === "Active";
}