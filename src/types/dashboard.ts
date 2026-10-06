export type DashboardStat = {
  label: string;
  value: string | number;
  delta?: string;
  deltaDirection?: "up" | "down" | "neutral";
};

export type DashboardStats = {
  activeEvents: number;
  ticketsSold: number;
  totalRevenue: number;
  todaysCheckIns: number;
  pendingSettlement: number;
};

export type DashboardActivity = {
  id: string;

  title: string;
  description: string;
  time: string;

  type?:
    | "ticket"
    | "check-in"
    | "registration"
    | "settlement"
    | "event";

  style?:
    | "blue"
    | "purple"
    | "orange"
    | "gray"
    | "green";
};

export type DashboardUpcomingEvent = {
  id: string;

  title: string;

  date: string;
  time: string;
  venue: string;

  registrations?: number;

  status:
    | "On Sale"
    | "Upcoming"
    | "Ongoing"
    | "Draft";
};

export type DashboardQuickAction = {
  id: string;

  title: string;
  description: string;
  href: string;

  style?:
    | "blue"
    | "purple"
    | "yellow"
    | "green";
};

export type DashboardNotification = {
  id: string;

  title: string;
  description: string;
  time: string;

  read?: boolean;
};

export type DashboardData = {
  stats: DashboardStats;

  recentActivity: DashboardActivity[];

  upcomingEvents: DashboardUpcomingEvent[];

  quickActions: DashboardQuickAction[];

  notifications: DashboardNotification[];
};
