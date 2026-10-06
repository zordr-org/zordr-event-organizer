export type TeamRole =
  | "Owner"
  | "Team Member"
  | "Event Manager"
  | "Scanner Operator"
  | "Finance Viewer";

export type TeamMemberStatus =
  | "Invited"
  | "Active"
  | "Suspended";

export type TeamMember = {
  id: string;

  organizerId: string;

  name: string;
  email: string;

  role: TeamRole;

  status: TeamMemberStatus;

  eventIds: string[];

  invitedAt?: string;
  joinedAt?: string;
};

export type TeamMemberPermission =
  | "events:view"
  | "events:create"
  | "events:edit"
  | "events:publish"
  | "events:cancel"
  | "events:delete"
  | "scanner:use"
  | "settlements:view"
  | "settings:view"
  | "settings:edit"
  | "team:view"
  | "team:manage";

export type TeamMemberInvite = {
  email: string;
  role: TeamRole;
  eventIds: string[];
};
