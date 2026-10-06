import { mockOrganizer } from "@/mock/db";

import type {
  TeamMember,
  TeamMemberInvite,
  TeamMemberPermission,
  TeamRole,
} from "@/types/team";

const mockTeamMembers: TeamMember[] = [
  {
    id: "TEAM-001",
    organizerId: mockOrganizer.id,
    name: mockOrganizer.contactName,
    email: mockOrganizer.email,
    role: "Owner",
    status: "Active",
    eventIds: [],
    joinedAt: "2026-01-01",
  },
  {
    id: "TEAM-002",
    organizerId: mockOrganizer.id,
    name: "Event Manager",
    email: "event.manager@kitsw.ac.in",
    role: "Event Manager",
    status: "Active",
    eventIds: ["1", "2", "5"],
    joinedAt: "2026-02-10",
  },
  {
    id: "TEAM-003",
    organizerId: mockOrganizer.id,
    name: "Scanner Operator",
    email: "scanner@kitsw.ac.in",
    role: "Scanner Operator",
    status: "Active",
    eventIds: ["1", "2"],
    joinedAt: "2026-03-05",
  },
];

const permissionsByRole: Record<
  TeamRole,
  TeamMemberPermission[]
> = {
  Owner: [
    "events:view",
    "events:create",
    "events:edit",
    "events:publish",
    "events:cancel",
    "events:delete",
    "scanner:use",
    "settlements:view",
    "settings:view",
    "settings:edit",
    "team:view",
    "team:manage",
  ],

  "Team Member": [
    "events:view",
    "settings:view",
    "team:view",
  ],

  "Event Manager": [
    "events:view",
    "events:create",
    "events:edit",
    "events:publish",
    "events:cancel",
    "scanner:use",
    "team:view",
  ],

  "Scanner Operator": [
    "events:view",
    "scanner:use",
  ],

  "Finance Viewer": [
    "events:view",
    "settlements:view",
  ],
};

export function getTeamMembers(): TeamMember[] {
  return mockTeamMembers;
}

export function getTeamMemberById(
  memberId: string,
): TeamMember | undefined {
  return mockTeamMembers.find(
    (member) => member.id === memberId,
  );
}

export function getActiveTeamMembers(): TeamMember[] {
  return mockTeamMembers.filter(
    (member) => member.status === "Active",
  );
}

export function getTeamMembersForEvent(
  eventId: string,
): TeamMember[] {
  return mockTeamMembers.filter(
    (member) =>
      member.eventIds.includes(eventId) ||
      member.role === "Owner",
  );
}

export function getPermissionsForRole(
  role: TeamRole,
): TeamMemberPermission[] {
  return permissionsByRole[role] ?? [];
}

export function hasPermission(
  memberId: string,
  permission: TeamMemberPermission,
): boolean {
  const member = getTeamMemberById(memberId);

  if (!member || member.status !== "Active") {
    return false;
  }

  return getPermissionsForRole(member.role).includes(
    permission,
  );
}

export function inviteTeamMember(
  invite: TeamMemberInvite,
): TeamMember {
  const newMember: TeamMember = {
    id: `TEAM-${String(mockTeamMembers.length + 1).padStart(
      3,
      "0",
    )}`,
    organizerId: mockOrganizer.id,
    name: invite.email.split("@")[0],
    email: invite.email,
    role: invite.role,
    status: "Invited",
    eventIds: invite.eventIds,
    invitedAt: new Date().toISOString(),
  };

  mockTeamMembers.push(newMember);

  return newMember;
}