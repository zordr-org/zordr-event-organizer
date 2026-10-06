import { getMockOrdersByEvent } from "@/mock/db";

import type { Registration } from "@/types/registration";
import type { Order } from "@/types/order";

function orderToRegistration(
  eventId: string,
  order: Order,
): Registration {
  return {
    id: `REG-${order.id.replace("#", "")}`,
    eventId,
    orderId: order.id,
    participantName: order.name,
    participantEmail: order.email,
    registrationType: order.teamMembers?.length
      ? "team"
      : "individual",
    status: order.status,
    ticketType: order.ticket,
    quantity: order.quantity,
    amount: order.amount,
    registeredAt: `${order.date} ${order.time}`,
    teamMembers: order.teamMembers,
  };
}

export function getRegistrations(
  eventId: string,
): Registration[] {
  return getMockOrdersByEvent(eventId).map(
    (order) => orderToRegistration(eventId, order),
  );
}

export function getRegistrationById(
  eventId: string,
  registrationId: string,
): Registration | undefined {
  return getRegistrations(eventId).find(
    (registration) => registration.id === registrationId,
  );
}

export function getConfirmedRegistrations(
  eventId: string,
): Registration[] {
  return getRegistrations(eventId).filter(
    (registration) =>
      registration.status === "Confirmed",
  );
}

export function getPendingRegistrations(
  eventId: string,
): Registration[] {
  return getRegistrations(eventId).filter(
    (registration) =>
      registration.status === "Pending",
  );
}

export function getRegistrationCount(
  eventId: string,
): number {
  return getRegistrations(eventId).length;
}

export function getConfirmedRegistrationCount(
  eventId: string,
): number {
  return getConfirmedRegistrations(eventId).length;
}