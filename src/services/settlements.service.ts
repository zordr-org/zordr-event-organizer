import {
  getMockInvoices,
  getMockSettlementHistory,
  getMockSettlementTransactions,
} from "@/mock/db";

import type {
  Invoice,
  SettlementHistoryItem,
  SettlementTransaction,
} from "@/types/settlement";

export function getSettlementTransactions(): SettlementTransaction[] {
  return getMockSettlementTransactions();
}

export function getSettlementHistory(): SettlementHistoryItem[] {
  return getMockSettlementHistory();
}

export function getInvoices(): Invoice[] {
  return getMockInvoices();
}

export function getSettlementTransactionById(
  transactionId: string,
): SettlementTransaction | undefined {
  return getSettlementTransactions().find(
    (transaction) =>
      transaction.id === transactionId,
  );
}

export function getSettledTransactions(): SettlementTransaction[] {
  return getSettlementTransactions().filter(
    (transaction) =>
      transaction.status === "Settled",
  );
}

export function getProcessingTransactions(): SettlementTransaction[] {
  return getSettlementTransactions().filter(
    (transaction) =>
      transaction.status === "Processing",
  );
}

export function getSettlementTotal(): number {
  return getSettlementTransactions()
    .filter(
      (transaction) =>
        transaction.status !== "Failed",
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0,
    );
}

export function searchSettlementTransactions(
  searchTerm: string,
): SettlementTransaction[] {
  const query = searchTerm
    .trim()
    .toLowerCase();

  if (!query) {
    return getSettlementTransactions();
  }

  return getSettlementTransactions().filter(
    (transaction) =>
      transaction.id
        .toLowerCase()
        .includes(query) ||
      transaction.orderId
        .toLowerCase()
        .includes(query) ||
      transaction.name
        .toLowerCase()
        .includes(query) ||
      transaction.ticketType
        .toLowerCase()
        .includes(query),
  );
}