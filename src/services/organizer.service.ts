import {
  getOrganizer,
  getOrganizerEmail,
  getOrganizerLocation,
  getOrganizerName,
  getOrganizerPhone,
  isOrganizerActive,
  updateOrganizer,
} from "@/services/settings.service";

import type { Organizer } from "@/types/organizer";

export function getOrganizerProfile(): Organizer {
  return getOrganizer();
}

export function updateOrganizerProfile(
  updates: Partial<Organizer>,
): Organizer {
  return updateOrganizer(updates);
}

export function getCurrentOrganizerName(): string {
  return getOrganizerName();
}

export function getCurrentOrganizerEmail(): string {
  return getOrganizerEmail();
}

export function getCurrentOrganizerPhone(): string {
  return getOrganizerPhone();
}

export function getCurrentOrganizerLocation(): string {
  return getOrganizerLocation();
}

export function isCurrentOrganizerActive(): boolean {
  return isOrganizerActive();
}