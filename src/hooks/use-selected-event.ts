"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getEvents,
} from "@/services/events.service";

const SELECTED_EVENT_KEY =
  "zordrSelectedEventId";

export function useSelectedEvent() {
  const [selectedEventId, setSelectedEventId] =
    useState<string | null>(null);

  useEffect(() => {
    const stored =
      localStorage.getItem(
        SELECTED_EVENT_KEY,
      );

    if (stored) {
      setSelectedEventId(stored);
      return;
    }

    const events =
      getEvents();

    if (events.length > 0) {
      const firstEventId =
        events[0].id;

      localStorage.setItem(
        SELECTED_EVENT_KEY,
        firstEventId,
      );

      setSelectedEventId(
        firstEventId,
      );
    }
  }, []);

  const selectEvent = useCallback(
    (eventId: string) => {
      localStorage.setItem(
        SELECTED_EVENT_KEY,
        eventId,
      );

      setSelectedEventId(eventId);
    },
    [],
  );

  const selectedEvent =
    selectedEventId
      ? getEvents().find(
          (event) =>
            event.id ===
            selectedEventId,
        )
      : undefined;

  return {
    selectedEventId,
    selectedEvent,
    selectEvent,
  };
}