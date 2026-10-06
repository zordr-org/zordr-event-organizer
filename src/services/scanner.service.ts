import {
  getMockCheckIns,
} from "@/mock/db";

import {
  getOrdersByEvent,
} from "@/services/orders.service";

import type {
  CheckIn,
} from "@/types/checkin";

import type {
  Order,
} from "@/types/order";

export function getRecentCheckIns(): CheckIn[] {
  return getMockCheckIns();
}

export function getScannerStats(
  eventId: string,
) {
  const orders: Order[] =
    getOrdersByEvent(eventId);

  const totalRegistrations =
    orders.length;

  const checkedIn =
    orders.filter(
      (order) => order.checkedIn,
    ).length;

  const pending =
    orders.filter(
      (order) =>
        order.status === "Confirmed" &&
        !order.checkedIn,
    ).length;

  return {
    totalRegistrations,
    checkedIn,
    pending,
    invalidScans: 0,
  };
}

export function findOrderForScan(
  eventId: string,
  orderId: string,
): Order | undefined {
  const orders: Order[] =
    getOrdersByEvent(eventId);

  return orders.find(
    (order) =>
      order.id.toLowerCase() ===
      orderId.toLowerCase(),
  );
}

export function processManualCheckIn(
  eventId: string,
  orderId: string,
) {
  const order =
    findOrderForScan(
      eventId,
      orderId,
    );

  if (!order) {
    return {
      success: false,
      message: "Ticket not found.",
    };
  }

  if (order.status !== "Confirmed") {
    return {
      success: false,
      message:
        "This ticket is not confirmed.",
    };
  }

  if (order.checkedIn) {
    return {
      success: false,
      message:
        "This ticket is already checked in.",
    };
  }

  order.checkedIn = true;

  return {
    success: true,
    message:
      "Check-in completed successfully.",
    order,
  };
}

export function getCheckInCount(
  eventId: string,
): number {
  return getOrdersByEvent(eventId).filter(
    (order) => order.checkedIn,
  ).length;
}

export function getPendingCheckInCount(
  eventId: string,
): number {
  return getOrdersByEvent(eventId).filter(
    (order) =>
      order.status === "Confirmed" &&
      !order.checkedIn,
  ).length;
}