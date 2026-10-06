"use client";

import {
  create,
} from "zustand";

type UIState = {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  notificationsOpen: boolean;

  setSidebarOpen: (
    open: boolean,
  ) => void;

  toggleSidebar: () => void;

  setMobileMenuOpen: (
    open: boolean,
  ) => void;

  toggleMobileMenu: () => void;

  setNotificationsOpen: (
    open: boolean,
  ) => void;

  toggleNotifications: () => void;

  closeAllPanels: () => void;
};

export const useUIStore =
  create<UIState>((set) => ({
    sidebarOpen: true,

    mobileMenuOpen: false,

    notificationsOpen: false,

    setSidebarOpen: (open) => {
      set({
        sidebarOpen: open,
      });
    },

    toggleSidebar: () => {
      set((state) => ({
        sidebarOpen:
          !state.sidebarOpen,
      }));
    },

    setMobileMenuOpen: (open) => {
      set({
        mobileMenuOpen: open,
      });
    },

    toggleMobileMenu: () => {
      set((state) => ({
        mobileMenuOpen:
          !state.mobileMenuOpen,
      }));
    },

    setNotificationsOpen: (open) => {
      set({
        notificationsOpen: open,
      });
    },

    toggleNotifications: () => {
      set((state) => ({
        notificationsOpen:
          !state.notificationsOpen,
      }));
    },

    closeAllPanels: () => {
      set({
        mobileMenuOpen: false,
        notificationsOpen: false,
      });
    },
  }));