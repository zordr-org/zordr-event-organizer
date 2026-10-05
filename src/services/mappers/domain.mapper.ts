import type { EventDetails } from "@/types/event";
import type { EventMedia, MediaItem } from "@/types/media";
import type { Notification } from "@/types/notification";
import type { Organizer } from "@/types/organizer";
import type {
  PlatformPolicy,
  PolicyDecision,
} from "@/types/platform-policy";
import type { Registration } from "@/types/registration";
import type { TeamMember as RegistrationTeamMember } from "@/types/order";
import type {
  TeamMember as OrganizerTeamMember,
  TeamMemberStatus,
  TeamRole,
} from "@/types/team";
import type {
  Ticket,
  TicketStatus,
} from "@/types/ticket-type";

import type {
  ApiEventDto,
  ApiEventMediaDto,
  ApiMediaItemDto,
  ApiNotificationDto,
  ApiOrganizerDto,
  ApiOrganizerTeamMemberDto,
  ApiPlatformPolicyDto,
  ApiPolicyDecisionDto,
  ApiRegistrationDto,
  ApiRegistrationTeamMemberDto,
  ApiTicketDto,
} from "@/services/wire";

/* =========================================================
   ORGANIZER
   ========================================================= */

export function mapOrganizerDtoToDomain(
  dto: ApiOrganizerDto,
): Organizer {
  return {
    id: dto.id,
    name: dto.name,
    type: dto.type,
    contactName: dto.contactName,
    email: dto.email,
    phone: dto.phone,
    city: dto.city,
    state: dto.state,
    pincode: dto.pincode,
    status: dto.status as Organizer["status"],
  };
}

export function mapOrganizerToDto(
  organizer: Organizer,
): ApiOrganizerDto {
  return {
    id: organizer.id,
    name: organizer.name,
    type: organizer.type,
    contactName: organizer.contactName,
    email: organizer.email,
    phone: organizer.phone,
    city: organizer.city,
    state: organizer.state,
    pincode: organizer.pincode,
    status: organizer.status,
  };
}

/* =========================================================
   EVENTS
   ========================================================= */

export function mapEventDtoToDomain(
  dto: ApiEventDto,
): EventDetails {
  return {
    id: dto.id,
    title: dto.title,
    tags: dto.tags,
    category: dto.category,
    date: dto.date,
    time: dto.time,
    venue: dto.venue,
    status: dto.status as EventDetails["status"],

    sold: dto.sold,
    capacity: dto.capacity,
    revenue: dto.revenue,

    gradient: dto.gradient,

    shortDescription: dto.shortDescription,
    detailedDescription: dto.detailedDescription,

    eventMode:
      dto.eventMode as EventDetails["eventMode"],

    venueName: dto.venueName,
    address: dto.address,
    mapLocation: dto.mapLocation,
    venueInstructions: dto.venueInstructions,

    startDate: dto.startDate,
    startTime: dto.startTime,
    endTime: dto.endTime,

    bannerName: dto.bannerName,
    galleryCount: dto.galleryCount,
    promoVideo: dto.promoVideo,

    ticketName: dto.ticketName,
    ticketDescription: dto.ticketDescription,
    ticketPrice: dto.ticketPrice,
    ticketQuantity: dto.ticketQuantity,
    purchaseLimit: dto.purchaseLimit,

    registrationEnabled: dto.registrationEnabled,

    registrationType:
      dto.registrationType as EventDetails["registrationType"],

    minTeamSize: dto.minTeamSize,
    maxTeamSize: dto.maxTeamSize,

    teamMemberFields: dto.teamMemberFields,

    registrationDeadline: dto.registrationDeadline,
    maxAttendees: dto.maxAttendees,
    waitlistEnabled: dto.waitlistEnabled,

    publishMode:
      dto.publishMode as EventDetails["publishMode"],

    publishDate: dto.publishDate,

    orderMetrics: dto.orderMetrics,
  };
}

export function mapEventToDto(
  event: EventDetails,
): ApiEventDto {
  return {
    id: event.id,
    title: event.title,
    tags: event.tags,
    category: event.category,
    date: event.date,
    time: event.time,
    venue: event.venue,
    status: event.status,

    sold: event.sold,
    capacity: event.capacity,
    revenue: event.revenue,

    gradient: event.gradient,

    shortDescription: event.shortDescription,
    detailedDescription: event.detailedDescription,

    eventMode: event.eventMode,

    venueName: event.venueName,
    address: event.address,
    mapLocation: event.mapLocation,
    venueInstructions: event.venueInstructions,

    startDate: event.startDate,
    startTime: event.startTime,
    endTime: event.endTime,

    bannerName: event.bannerName,
    galleryCount: event.galleryCount,
    promoVideo: event.promoVideo,

    ticketName: event.ticketName,
    ticketDescription: event.ticketDescription,
    ticketPrice: event.ticketPrice,
    ticketQuantity: event.ticketQuantity,
    purchaseLimit: event.purchaseLimit,

    registrationEnabled: event.registrationEnabled,
    registrationType: event.registrationType,

    minTeamSize: event.minTeamSize,
    maxTeamSize: event.maxTeamSize,

    teamMemberFields: event.teamMemberFields,

    registrationDeadline: event.registrationDeadline,
    maxAttendees: event.maxAttendees,
    waitlistEnabled: event.waitlistEnabled,

    publishMode: event.publishMode,
    publishDate: event.publishDate,

    orderMetrics: event.orderMetrics,
  };
}

/* =========================================================
   TICKETS
   ========================================================= */

export function mapTicketDtoToDomain(
  dto: ApiTicketDto,
): Ticket {
  return {
    id: dto.id,
    eventId: dto.eventId,
    name: dto.name,
    description: dto.description,
    price: dto.price,
    quantity: dto.quantity,
    sold: dto.sold,
    purchaseLimit: dto.purchaseLimit,
    status: dto.status as TicketStatus,
    salesStart: dto.salesStart,
    salesEnd: dto.salesEnd,
  };
}

export function mapTicketToDto(
  ticket: Ticket,
): ApiTicketDto {
  return {
    id: ticket.id,
    eventId: ticket.eventId,
    name: ticket.name,
    description: ticket.description,
    price: ticket.price,
    quantity: ticket.quantity,
    sold: ticket.sold,
    purchaseLimit: ticket.purchaseLimit,
    status: ticket.status,
    salesStart: ticket.salesStart,
    salesEnd: ticket.salesEnd,
  };
}

/* =========================================================
   REGISTRATION TEAM MEMBERS
   ========================================================= */

function mapRegistrationTeamMemberToDomain(
  member: ApiRegistrationTeamMemberDto,
): RegistrationTeamMember {
  return {
    id: member.id,
    name: member.name,
    email: member.email,
    phone: member.phone,
    institution: member.institution,
    departmentYear: member.departmentYear,
  };
}

function mapRegistrationTeamMemberToDto(
  member: RegistrationTeamMember,
): ApiRegistrationTeamMemberDto {
  return {
    id: member.id,
    name: member.name,
    email: member.email,
    phone: member.phone,
    institution: member.institution,
    departmentYear: member.departmentYear,
  };
}

/* =========================================================
   REGISTRATIONS
   ========================================================= */

export function mapRegistrationDtoToDomain(
  dto: ApiRegistrationDto,
): Registration {
  return {
    id: dto.id,
    eventId: dto.eventId,
    orderId: dto.orderId,

    participantName: dto.participantName,
    participantEmail: dto.participantEmail,
    participantPhone: dto.participantPhone,

    registrationType:
      dto.registrationType as Registration["registrationType"],

    status:
      dto.status as Registration["status"],

    ticketType: dto.ticketType,
    quantity: dto.quantity,
    amount: dto.amount,

    registeredAt: dto.registeredAt,

    teamMembers: dto.teamMembers?.map(
      mapRegistrationTeamMemberToDomain,
    ),
  };
}

export function mapRegistrationToDto(
  registration: Registration,
): ApiRegistrationDto {
  return {
    id: registration.id,
    eventId: registration.eventId,
    orderId: registration.orderId,

    participantName: registration.participantName,
    participantEmail: registration.participantEmail,
    participantPhone: registration.participantPhone,

    registrationType:
      registration.registrationType,

    status: registration.status,

    ticketType: registration.ticketType,
    quantity: registration.quantity,
    amount: registration.amount,

    registeredAt: registration.registeredAt,

    teamMembers: registration.teamMembers?.map(
      mapRegistrationTeamMemberToDto,
    ),
  };
}

/* =========================================================
   MEDIA
   ========================================================= */

export function mapMediaItemDtoToDomain(
  dto: ApiMediaItemDto,
): MediaItem {
  return {
    id: dto.id,
    name: dto.name,
    url: dto.url,
    type: dto.type as MediaItem["type"],
    size: dto.size,
    mimeType: dto.mimeType,
    uploadedAt: dto.uploadedAt,
  };
}

export function mapMediaItemToDto(
  media: MediaItem,
): ApiMediaItemDto {
  return {
    id: media.id,
    name: media.name,
    url: media.url,
    type: media.type,
    size: media.size,
    mimeType: media.mimeType,
    uploadedAt: media.uploadedAt,
  };
}

export function mapEventMediaDtoToDomain(
  dto: ApiEventMediaDto,
): EventMedia {
  return {
    banner: dto.banner
      ? mapMediaItemDtoToDomain(dto.banner)
      : undefined,

    gallery: dto.gallery.map(
      mapMediaItemDtoToDomain,
    ),

    promoVideo: dto.promoVideo
      ? mapMediaItemDtoToDomain(dto.promoVideo)
      : undefined,
  };
}

export function mapEventMediaToDto(
  media: EventMedia,
): ApiEventMediaDto {
  return {
    banner: media.banner
      ? mapMediaItemToDto(media.banner)
      : undefined,

    gallery: media.gallery.map(
      mapMediaItemToDto,
    ),

    promoVideo: media.promoVideo
      ? mapMediaItemToDto(media.promoVideo)
      : undefined,
  };
}

/* =========================================================
   ORGANIZER TEAM
   ========================================================= */

export function mapOrganizerTeamMemberDtoToDomain(
  dto: ApiOrganizerTeamMemberDto,
): OrganizerTeamMember {
  return {
    id: dto.id,
    organizerId: dto.organizerId,
    name: dto.name,
    email: dto.email,
    role: dto.role as TeamRole,
    status: dto.status as TeamMemberStatus,
    eventIds: dto.eventIds,
    invitedAt: dto.invitedAt,
    joinedAt: dto.joinedAt,
  };
}

export function mapOrganizerTeamMemberToDto(
  member: OrganizerTeamMember,
): ApiOrganizerTeamMemberDto {
  return {
    id: member.id,
    organizerId: member.organizerId,
    name: member.name,
    email: member.email,
    role: member.role,
    status: member.status,
    eventIds: member.eventIds,
    invitedAt: member.invitedAt,
    joinedAt: member.joinedAt,
  };
}

/* =========================================================
   PLATFORM POLICY
   ========================================================= */

export function mapPlatformPolicyDtoToDomain(
  dto: ApiPlatformPolicyDto,
): PlatformPolicy {
  return {
    requireApprovedKycForPortalAccess:
      dto.requireApprovedKycForPortalAccess,

    requireApprovedKycForEventCreation:
      dto.requireApprovedKycForEventCreation,

    requireApprovedKycForEventPublishing:
      dto.requireApprovedKycForEventPublishing,

    allowEventCreationForRejectedKyc:
      dto.allowEventCreationForRejectedKyc,

    platformFeePercent:
      dto.platformFeePercent,

    platformFeePerTicket:
      dto.platformFeePerTicket,

    settlementCycle:
      dto.settlementCycle,
  };
}

export function mapPlatformPolicyToDto(
  policy: PlatformPolicy,
): ApiPlatformPolicyDto {
  return {
    requireApprovedKycForPortalAccess:
      policy.requireApprovedKycForPortalAccess,

    requireApprovedKycForEventCreation:
      policy.requireApprovedKycForEventCreation,

    requireApprovedKycForEventPublishing:
      policy.requireApprovedKycForEventPublishing,

    allowEventCreationForRejectedKyc:
      policy.allowEventCreationForRejectedKyc,

    platformFeePercent:
      policy.platformFeePercent,

    platformFeePerTicket:
      policy.platformFeePerTicket,

    settlementCycle:
      policy.settlementCycle,
  };
}

export function mapPolicyDecisionDtoToDomain(
  dto: ApiPolicyDecisionDto,
): PolicyDecision {
  return {
    allowed: dto.allowed,
    reason: dto.reason,
    code: dto.code as PolicyDecision["code"],
  };
}

export function mapPolicyDecisionToDto(
  decision: PolicyDecision,
): ApiPolicyDecisionDto {
  return {
    allowed: decision.allowed,
    reason: decision.reason,
    code: decision.code,
  };
}

/* =========================================================
   NOTIFICATIONS
   ========================================================= */

export function mapNotificationDtoToDomain(
  dto: ApiNotificationDto,
): Notification {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    time: dto.time,
    read: dto.read,
  };
}

export function mapNotificationToDto(
  notification: Notification,
): ApiNotificationDto {
  return {
    id: notification.id,
    title: notification.title,
    description: notification.description,
    time: notification.time,
    read: notification.read,
  };
}