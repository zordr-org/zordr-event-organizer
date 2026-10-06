import type { RegistrationType } from "./common";
import type { TeamMember, } from "./order";
import type { TeamMemberFields } from "./event";

export type RegistrationStatus =
  | "Confirmed"
  | "Pending"
  | "Cancelled"
  | "Waitlisted";

export type Registration = {
  id: string;

  eventId: string;
  orderId: string;

  participantName: string;
  participantEmail: string;
  participantPhone?: string;

  registrationType: RegistrationType;

  status: RegistrationStatus;

  ticketType: string;
  quantity: number;

  amount: number;

  registeredAt: string;

  teamMembers?: TeamMember[];
};

export type RegistrationConfig = {
  enabled: boolean;

  type: RegistrationType;

  minTeamSize?: number;
  maxTeamSize?: number;

  teamMemberFields: TeamMemberFields;

  deadline: string;

  maxAttendees: number;

  waitlistEnabled: boolean;
};