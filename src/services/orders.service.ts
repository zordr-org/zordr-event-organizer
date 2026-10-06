import {
  getMockOrdersByEvent,
  mockOrdersByEvent,
} from "@/mock/db";

import type { Order } from "@/types/order";

export function getOrdersByEvent(
  eventId: string,
): Order[] {
  return getMockOrdersByEvent(eventId);
}

export function getAllOrders(): Order[] {
  return Object.values(mockOrdersByEvent).flat();
}

export function getOrderById(
  eventId: string,
  orderId: string,
): Order | undefined {
  const orders = getOrdersByEvent(eventId);

  return orders.find(
    (order) => order.id === orderId,
  );
}

export function getConfirmedOrders(
  eventId: string,
): Order[] {
  return getOrdersByEvent(eventId).filter(
    (order) => order.status === "Confirmed",
  );
}

export function getPendingOrders(
  eventId: string,
): Order[] {
  return getOrdersByEvent(eventId).filter(
    (order) => order.status === "Pending",
  );
}

export function getCancelledOrders(
  eventId: string,
): Order[] {
  return getOrdersByEvent(eventId).filter(
    (order) => order.status === "Cancelled",
  );
}

export function getCheckedInOrders(
  eventId: string,
): Order[] {
  return getOrdersByEvent(eventId).filter(
    (order) => order.checkedIn,
  );
}

export function getOrderCount(
  eventId: string,
): number {
  return getOrdersByEvent(eventId).length;
}

export function getOrderRevenue(
  eventId: string,
): number {
  return getOrdersByEvent(eventId)
    .filter(
      (order) => order.status === "Confirmed",
    )
    .reduce(
      (total, order) =>
        total + order.amount,
      0,
    );
}

export function checkInOrder(
  eventId: string,
  orderId: string,
): Order | undefined {
  const orders = getOrdersByEvent(eventId);

  const order = orders.find(
    (item) => item.id === orderId,
  );

  if (!order) {
    return undefined;
  }

  order.checkedIn = true;

  return order;
}

export function cancelOrder(
  eventId: string,
  orderId: string,
): Order | undefined {
  const orders = getOrdersByEvent(eventId);

  const order = orders.find(
    (item) => item.id === orderId,
  );

  if (!order) {
    return undefined;
  }

  order.status = "Cancelled";

  return order;
}

export function searchOrders(
  eventId: string,
  searchTerm: string,
): Order[] {
  const query = searchTerm
    .trim()
    .toLowerCase();

  const orders = getOrdersByEvent(eventId);

  if (!query) {
    return orders;
  }

  return orders.filter(
    (order) =>
      order.id
        .toLowerCase()
        .includes(query) ||
      order.name
        .toLowerCase()
        .includes(query) ||
      order.email
        .toLowerCase()
        .includes(query) ||
      order.ticket
        .toLowerCase()
        .includes(query),
  );
}