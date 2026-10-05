import {
  createMockEvent,
  deleteMockEvent,
  getMockCheckIns,
  getMockEventById,
  getMockEvents,
  getMockInvoices,
  getMockOrdersByEvent,
  getMockSettlementHistory,
  getMockSettlementTransactions,
  mockDashboardStats,
  mockNotifications,
  mockOrganizer,
  mockQuickActions,
  mockRecentActivity,
  mockUpcomingEvents,
  updateMockEvent,
} from "@/mock/db";

import type { EventDetails } from "@/types/event";

export const mockAdapter = {
  getOrganizer() {
    return mockOrganizer;
  },

  getEvents() {
    return getMockEvents();
  },

  getEvent(eventId: string) {
    return getMockEventById(eventId);
  },

  createEvent(event: EventDetails) {
    return createMockEvent(event);
  },

  updateEvent(
    eventId: string,
    updates: Partial<EventDetails>,
  ) {
    return updateMockEvent(eventId, updates);
  },

  deleteEvent(eventId: string) {
    return deleteMockEvent(eventId);
  },

  getOrdersByEvent(eventId: string) {
    return getMockOrdersByEvent(eventId);
  },

  getCheckIns() {
    return getMockCheckIns();
  },

  getSettlementTransactions() {
    return getMockSettlementTransactions();
  },

  getSettlementHistory() {
    return getMockSettlementHistory();
  },

  getInvoices() {
    return getMockInvoices();
  },

  getDashboardStats() {
    return mockDashboardStats;
  },

  getRecentActivity() {
    return mockRecentActivity;
  },

  getUpcomingEvents() {
    return mockUpcomingEvents;
  },

  getNotifications() {
    return mockNotifications;
  },

  getQuickActions() {
    return mockQuickActions;
  },
};

export type MockAdapter = typeof mockAdapter;