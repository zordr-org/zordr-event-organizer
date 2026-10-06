export type ApiOrganizerDto = {
  id: string;
  name: string;
  type: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  pincode: string;
  status: string;
};

export type ApiEventDto = {
  id: string;
  title: string;
  tags: string[];
  category: string;
  date: string;
  time: string;
  venue: string;
  status: string;

  sold: number;
  capacity: number;
  revenue: number;

  gradient: string;

  shortDescription: string;
  detailedDescription: string;

  eventMode: string;

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
  registrationType: string;

  minTeamSize: string;
  maxTeamSize: string;

  teamMemberFields: {
    name: boolean;
    email: boolean;
    phone: boolean;
    institution: boolean;
    departmentYear: boolean;
  };

  registrationDeadline: string;
  maxAttendees: string;
  waitlistEnabled: boolean;

  publishMode: string;
  publishDate: string;

  orderMetrics: {
    registrations: number;
    ticketsSold: number;
    pending: number;
    checkedIn: number;
  };
};

export type ApiTicketDto = {
  id: string;
  eventId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
  purchaseLimit: number;
  status: string;
  salesStart?: string;
  salesEnd?: string;
};

export type ApiRegistrationTeamMemberDto = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  institution?: string;
  departmentYear?: string;
};

export type ApiRegistrationDto = {
  id: string;
  eventId: string;
  orderId: string;

  participantName: string;
  participantEmail: string;
  participantPhone?: string;

  registrationType: string;
  status: string;

  ticketType: string;
  quantity: number;
  amount: number;

  registeredAt: string;

  teamMembers?: ApiRegistrationTeamMemberDto[];
};

export type ApiMediaItemDto = {
  id: string;
  name: string;
  url: string;
  type: string;
  size?: number;
  mimeType?: string;
  uploadedAt?: string;
};

export type ApiEventMediaDto = {
  banner?: ApiMediaItemDto;
  gallery: ApiMediaItemDto[];
  promoVideo?: ApiMediaItemDto;
};

export type ApiOrganizerTeamMemberDto = {
  id: string;
  organizerId: string;

  name: string;
  email: string;

  role: string;
  status: string;

  eventIds: string[];

  invitedAt?: string;
  joinedAt?: string;
};

export type ApiTeamMemberInviteDto = {
  email: string;
  role: string;
  eventIds: string[];
};

export type ApiPlatformPolicyDto = {
  requireApprovedKycForPortalAccess: boolean;
  requireApprovedKycForEventCreation: boolean;
  requireApprovedKycForEventPublishing: boolean;
  allowEventCreationForRejectedKyc: boolean;
  platformFeePercent: number;
  platformFeePerTicket: number;
  settlementCycle: string;
};

export type ApiPolicyDecisionDto = {
  allowed: boolean;
  reason?: string;
  code?: string;
};

export type ApiNotificationDto = {
  id: string;
  title: string;
  description: string;
  time: string;
  read?: boolean;
};