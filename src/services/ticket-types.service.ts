import { getMockEventById, getMockEvents } from "@/mock/db";

import type { EventDetails } from "@/types/event";
import type { Ticket, TicketSummary, TicketStatus } from "@/types/ticket-type";

function getTicketStatus(
  sold: number,
  quantity: number,
  eventStatus: EventDetails["status"],
): TicketStatus {
  if (eventStatus === "Cancelled") {
    return "Cancelled";
  }

  if (sold >= quantity) {
    return "Sold Out";
  }

  if (
    eventStatus === "Draft" ||
    eventStatus === "Completed"
  ) {
    return "Paused";
  }

  return "Available";
}

function eventToTicket(event: EventDetails): Ticket {
  const quantity = Number(event.ticketQuantity) || event.capacity;
  const sold = event.sold;

  return {
    id: `${event.id}-ticket-1`,
    eventId: event.id,
    name: event.ticketName,
    description: event.ticketDescription,
    price: Number(event.ticketPrice) || 0,
    quantity,
    sold,
    purchaseLimit: Number(event.purchaseLimit) || 1,
    status: getTicketStatus(
      sold,
      quantity,
      event.status,
    ),
    salesStart: event.publishDate,
    salesEnd: event.registrationDeadline,
  };
}

export function getTicketTypes(eventId: string): Ticket[] {
  const event = getMockEventById(eventId);

  if (!event) {
    return [];
  }

  return [eventToTicket(event)];
}

export function getTicketTypeById(
  eventId: string,
  ticketId: string,
): Ticket | undefined {
  return getTicketTypes(eventId).find(
    (ticket) => ticket.id === ticketId,
  );
}

export function getAllTicketTypes(): Ticket[] {
  return getMockEvents().map(
    (event) => eventToTicket(event as EventDetails),
  );
}

export function getTicketSummary(
  eventId: string,
): TicketSummary {
  const tickets = getTicketTypes(eventId);

  return tickets.reduce<TicketSummary>(
    (summary, ticket) => {
      summary.totalTickets += ticket.quantity;
      summary.soldTickets += ticket.sold;
      summary.availableTickets += Math.max(
        ticket.quantity - ticket.sold,
        0,
      );
      summary.revenue += ticket.sold * ticket.price;

      return summary;
    },
    {
      totalTickets: 0,
      soldTickets: 0,
      availableTickets: 0,
      revenue: 0,
    },
  );
}