export type TicketStatus =
  | "Available"
  | "Sold Out"
  | "Paused"
  | "Cancelled";

export type Ticket = {
  id: string;

  eventId: string;

  name: string;
  description: string;

  price: number;

  quantity: number;
  sold: number;

  purchaseLimit: number;

  status: TicketStatus;

  salesStart?: string;
  salesEnd?: string;
};

export type TicketSummary = {
  totalTickets: number;
  soldTickets: number;
  availableTickets: number;
  revenue: number;
};