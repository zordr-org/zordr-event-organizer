import type {
  LucideIcon,
} from "lucide-react";

import {
  LayoutDashboard,
  CalendarDays,
  ShoppingCart,
  ScanLine,
  BarChart3,
  Wallet,
  Settings,
} from "lucide-react";

import { routes } from "./routes";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
};

export const mainNavigation: NavigationItem[] = [
  {
    label: "Dashboard",
    href: routes.dashboard,
    icon: LayoutDashboard,
    description:
      "Overview of your organizer account",
  },

  {
    label: "Events",
    href: routes.events.root,
    icon: CalendarDays,
    description:
      "Create and manage events",
  },

  {
    label: "Orders",
    href: routes.orders,
    icon: ShoppingCart,
    description:
      "Manage registrations and orders",
  },

  {
    label: "Scanner",
    href: routes.scanner,
    icon: ScanLine,
    description:
      "Check in event attendees",
  },

  {
    label: "Analytics",
    href: routes.analytics,
    icon: BarChart3,
    description:
      "View event performance",
  },

  {
    label: "Settlements",
    href: routes.settlements,
    icon: Wallet,
    description:
      "Manage payouts and settlements",
  },

  {
    label: "Settings",
    href: routes.settings,
    icon: Settings,
    description:
      "Manage organizer settings",
  },
];

export const navigationItems =
  mainNavigation;