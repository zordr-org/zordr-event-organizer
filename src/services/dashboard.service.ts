import {
  mockDashboardStats,
  mockNotifications,
  mockQuickActions,
  mockRecentActivity,
  mockUpcomingEvents,
} from "@/mock/db";

export function getDashboardStats() {
  return mockDashboardStats;
}

export function getRecentActivity() {
  return mockRecentActivity;
}

export function getUpcomingEvents() {
  return mockUpcomingEvents;
}

export function getQuickActions() {
  return mockQuickActions;
}

export function getNotifications() {
  return mockNotifications;
}

export function getUnreadNotificationCount(): number {
  return mockNotifications.filter(
    (notification) =>
      notification.read !== true,
  ).length;
}

export function markNotificationAsRead(
  notificationId: string,
) {
  const notification = mockNotifications.find(
    (item) => item.id === notificationId,
  );

  if (!notification) {
    return undefined;
  }

  notification.read = true;

  return notification;
}

export function markAllNotificationsAsRead(): void {
  mockNotifications.forEach(
    (notification) => {
      notification.read = true;
    },
  );
}

export function getDashboardData() {
  return {
    stats: getDashboardStats(),
    recentActivity: getRecentActivity(),
    upcomingEvents: getUpcomingEvents(),
    quickActions: getQuickActions(),
    notifications: getNotifications(),
  };
}