import type { SettlementStatus } from "./common";

export type SettlementTransaction = {
  id: string;

  orderId: string;
  name: string;
  ticketType: string;

  amount: number;

  paymentMethod: string;

  status: SettlementStatus;

  date: string;
  time: string;
};

export type SettlementHistoryItem = {
  date: string;
  amount: number;
  status: string;
};

export type Invoice = {
  id: string;
  date: string;
  amount: number;
  status: string;
};

export type SettlementAccount = {
  payoutTo: string;
  bankAccount: string;
  ifsc: string;
  accountHolder: string;
  settlementCycle: string;
  netSettlement: number;
  scheduledDate: string;
};