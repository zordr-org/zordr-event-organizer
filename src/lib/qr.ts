export type QrPayload = {
  type: "zordr-ticket";
  eventId: string;
  orderId: string;
};

export function createQrPayload(
  eventId: string,
  orderId: string,
): string {
  const payload: QrPayload = {
    type: "zordr-ticket",
    eventId,
    orderId,
  };

  return JSON.stringify(payload);
}

export function parseQrPayload(
  value: string,
): QrPayload | null {
  try {
    const parsed = JSON.parse(value) as Partial<QrPayload>;

    if (
      parsed.type !== "zordr-ticket" ||
      typeof parsed.eventId !== "string" ||
      typeof parsed.orderId !== "string"
    ) {
      return null;
    }

    return {
      type: "zordr-ticket",
      eventId: parsed.eventId,
      orderId: parsed.orderId,
    };
  } catch {
    return null;
  }
}

export function isValidQrPayload(
  value: string,
): boolean {
  return parseQrPayload(value) !== null;
}