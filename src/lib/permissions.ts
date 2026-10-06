import type {
  TeamMemberPermission,
  TeamRole,
} from "@/types/team";

const rolePermissions: Record<
  TeamRole,
  readonly TeamMemberPermission[]
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

export function getRolePermissions(
  role: TeamRole,
): readonly TeamMemberPermission[] {
  return rolePermissions[role];
}

export function hasPermission(
  role: TeamRole,
  permission: TeamMemberPermission,
): boolean {
  return rolePermissions[role].includes(permission);
}

export function hasAnyPermission(
  role: TeamRole,
  permissions: readonly TeamMemberPermission[],
): boolean {
  return permissions.some((permission) =>
    hasPermission(role, permission),
  );
}

export function hasAllPermissions(
  role: TeamRole,
  permissions: readonly TeamMemberPermission[],
): boolean {
  return permissions.every((permission) =>
    hasPermission(role, permission),
  );
}