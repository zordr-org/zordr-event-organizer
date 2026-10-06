export function getAvailableTickets(
  capacity: number,
  sold: number,
): number {
  return Math.max(
    capacity - sold,
    0,
  );
}

export function getRemainingTickets(
  capacity: number,
  sold: number,
): number {
  return getAvailableTickets(
    capacity,
    sold,
  );
}

export function getTicketSoldPercentage(
  capacity: number,
  sold: number,
): number {
  if (capacity <= 0) {
    return 0;
  }

  return Math.min(
    (sold / capacity) * 100,
    100,
  );
}

export function isSoldOut(
  capacity: number,
  sold: number,
): boolean {
  return (
    capacity > 0 &&
    sold >= capacity
  );
}

export function getTicketRevenue(
  price: number,
  sold: number,
): number {
  return price * sold;
}