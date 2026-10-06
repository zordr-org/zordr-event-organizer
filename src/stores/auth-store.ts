"use client";

import {
  create,
} from "zustand";

import type {
  AuthUser,
} from "@/types/auth";

import {
  getCurrentUser,
  isAuthenticated,
  logout as logoutService,
} from "@/services/auth.service";

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;

  setUser: (
    user: AuthUser,
  ) => void;

  clearUser: () => void;

  hydrate: () => void;

  logout: () => void;
};

export const useAuthStore =
  create<AuthState>((set) => ({
    user: null,

    isAuthenticated: false,

    setUser: (user) => {
      set({
        user,
        isAuthenticated:
          user.isAuthenticated,
      });
    },

    clearUser: () => {
      set({
        user: null,
        isAuthenticated: false,
      });
    },

    hydrate: () => {
      const authenticated =
        isAuthenticated();

      const user =
        getCurrentUser();

      set({
        user,
        isAuthenticated:
          authenticated,
      });
    },

    logout: () => {
      logoutService();

      set({
        user: null,
        isAuthenticated: false,
      });
    },
  }));