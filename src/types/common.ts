export type ID = string;

export type EventStatus =
  | "On Sale"
  | "Upcoming"
  | "Ongoing"
  | "Completed"
  | "Draft"
  | "Cancelled";

export type EventMode = "offline" | "online" | "hybrid";

export type RegistrationType = "individual" | "team";

export type OrderStatus =
  | "Confirmed"
  | "Pending"
  | "Cancelled";

export type PaymentStatus =
  | "Paid"
  | "Pending"
  | "Failed";

export type SettlementStatus =
  | "Settled"
  | "Processing"
  | "Pending"
  | "Completed"
  | "Failed";

export type CheckInStatus =
  | "Checked In"
  | "Not Checked In"
  | "Invalid";

export type PublishMode =
  | "now"
  | "schedule"
  | "draft";