import { mockNotifications } from "@/mock/db";

import type { Notification } from "@/types/notification";

export function getNotifications(): Notification[] {
  return mockNotifications;
}

export function getNotificationById(
  notificationId: string,
): Notification | undefined {
  return mockNotifications.find(
    (notification) => notification.id === notificationId,
  );
}

export function getUnreadNotifications(): Notification[] {
  return mockNotifications.filter(
    (notification) => notification.read !== true,
  );
}

export function getUnreadNotificationCount(): number {
  return getUnreadNotifications().length;
}

export function markNotificationAsRead(
  notificationId: string,
): Notification | undefined {
  const notification = getNotificationById(
    notificationId,
  );

  if (!notification) {
    return undefined;
  }

  notification.read = true;

  return notification;
}

export function markAllNotificationsAsRead(): void {
  mockNotifications.forEach((notification) => {
    notification.read = true;
  });
}