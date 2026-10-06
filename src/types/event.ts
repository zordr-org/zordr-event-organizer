import type {
  EventMode,
  EventStatus,
  PublishMode,
  RegistrationType,
} from "./common";

export type TeamMemberFields = {
  name: boolean;
  email: boolean;
  phone: boolean;
  institution: boolean;
  departmentYear: boolean;
};

export type EventOrderMetrics = {
  registrations: number;
  ticketsSold: number;
  pending: number;
  checkedIn: number;
};

export type EventItem = {
  id: string;
  title: string;
  tags: string[];
  category: string;

  date: string;
  time: string;
  venue: string;

  status: EventStatus;

  sold: number;
  capacity: number;
  revenue: number;

  gradient: string;
};

export type EventDetails = EventItem & {
  shortDescription: string;
  detailedDescription: string;

  eventMode: EventMode;

  venueName: string;
  address: string;
  mapLocation: string;
  venueInstructions: string;

  startDate: string;
  startTime: string;
  endTime: string;

  bannerName: string;
  galleryCount: number;
  promoVideo: string;

  ticketName: string;
  ticketDescription: string;
  ticketPrice: string;
  ticketQuantity: string;
  purchaseLimit: string;

  registrationEnabled: boolean;
  registrationType: RegistrationType;

  minTeamSize: string;
  maxTeamSize: string;

  teamMemberFields: TeamMemberFields;

  registrationDeadline: string;
  maxAttendees: string;

  waitlistEnabled: boolean;

  publishMode: PublishMode;
  publishDate: string;

  orderMetrics: EventOrderMetrics;
};