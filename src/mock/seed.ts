import {
  getMockCheckIns,
  getMockEvents,
  getMockInvoices,
  getMockSettlementHistory,
  getMockSettlementTransactions,
  mockNotifications,
  mockOrdersByEvent,
  mockOrganizer,
} from "@/mock/db";

export function seedMockData() {
  return {
    organizer: mockOrganizer,
    events: getMockEvents(),
    ordersByEvent: mockOrdersByEvent,
    checkIns: getMockCheckIns(),
    settlementTransactions:
      getMockSettlementTransactions(),
    settlementHistory:
      getMockSettlementHistory(),
    invoices: getMockInvoices(),
    notifications: mockNotifications,
  };
}

export function getMockDataSummary() {
  const data = seedMockData();

  return {
    organizerId: data.organizer.id,
    eventCount: data.events.length,
    orderEventCount:
      Object.keys(data.ordersByEvent).length,
    checkInCount: data.checkIns.length,
    settlementTransactionCount:
      data.settlementTransactions.length,
    settlementHistoryCount:
      data.settlementHistory.length,
    invoiceCount: data.invoices.length,
    notificationCount:
      data.notifications.length,
  };
}