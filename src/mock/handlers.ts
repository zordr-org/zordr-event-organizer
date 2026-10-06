import { mockAdapter } from "@/mock/adapter";
import type { EventDetails } from "@/types/event";

export type MockHandlerMap = {
  getEvents: () => ReturnType<typeof mockAdapter.getEvents>;
  getEvent: (
    eventId: string,
  ) => ReturnType<typeof mockAdapter.getEvent>;
  createEvent: (
    event: EventDetails,
  ) => ReturnType<typeof mockAdapter.createEvent>;
  updateEvent: (
    eventId: string,
    updates: Partial<EventDetails>,
  ) => ReturnType<typeof mockAdapter.updateEvent>;
  deleteEvent: (
    eventId: string,
  ) => ReturnType<typeof mockAdapter.deleteEvent>;
  getOrdersByEvent: (
    eventId: string,
  ) => ReturnType<typeof mockAdapter.getOrdersByEvent>;
  getCheckIns: () => ReturnType<typeof mockAdapter.getCheckIns>;
  getSettlementTransactions: () =>
    ReturnType<typeof mockAdapter.getSettlementTransactions>;
  getSettlementHistory: () =>
    ReturnType<typeof mockAdapter.getSettlementHistory>;
  getInvoices: () =>
    ReturnType<typeof mockAdapter.getInvoices>;
};

export const mockHandlers: MockHandlerMap = {
  getEvents: () => mockAdapter.getEvents(),

  getEvent: (eventId) =>
    mockAdapter.getEvent(eventId),

  createEvent: (event) =>
    mockAdapter.createEvent(event),

  updateEvent: (eventId, updates) =>
    mockAdapter.updateEvent(eventId, updates),

  deleteEvent: (eventId) =>
    mockAdapter.deleteEvent(eventId),

  getOrdersByEvent: (eventId) =>
    mockAdapter.getOrdersByEvent(eventId),

  getCheckIns: () =>
    mockAdapter.getCheckIns(),

  getSettlementTransactions: () =>
    mockAdapter.getSettlementTransactions(),

  getSettlementHistory: () =>
    mockAdapter.getSettlementHistory(),

  getInvoices: () =>
    mockAdapter.getInvoices(),
};