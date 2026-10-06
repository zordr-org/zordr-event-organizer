"use client";

import {
  getCurrentUser,
} from "@/services/auth.service";

import type {
  UserRole,
} from "@/types/auth";

export function usePermission(
  allowedRoles?: UserRole[],
) {
  const user =
    getCurrentUser();

  const role =
    user?.role ?? null;

  const isAuthenticated =
    user?.isAuthenticated === true;

  const hasPermission =
    isAuthenticated &&
    (
      !allowedRoles ||
      allowedRoles.length === 0 ||
      (role !== null &&
        allowedRoles.includes(role))
    );

  return {
    user,
    role,
    isAuthenticated,
    hasPermission,
  };
}

export function useIsOrganizer(): boolean {
  const {
    role,
    isAuthenticated,
  } = usePermission();

  return (
    isAuthenticated &&
    role === "organizer"
  );
}

export function useIsAdmin(): boolean {
  const {
    role,
    isAuthenticated,
  } = usePermission();

  return (
    isAuthenticated &&
    role === "admin"
  );
}