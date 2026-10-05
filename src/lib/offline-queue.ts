const STORAGE_KEY = "zordr-offline-queue";

export type OfflineQueueItem<T> = {
  id: string;
  createdAt: string;
  payload: T;
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readQueue<T>(): OfflineQueueItem<T>[] {
  if (!isBrowser()) {
    return [];
  }

  const stored = window.localStorage.getItem(
    STORAGE_KEY,
  );

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as OfflineQueueItem<T>[];
  } catch {
    return [];
  }
}

function writeQueue<T>(
  queue: OfflineQueueItem<T>[],
): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(queue),
  );
}

export function getOfflineQueue<T>():
  OfflineQueueItem<T>[] {
  return readQueue<T>();
}

export function enqueueOffline<T>(
  payload: T,
): OfflineQueueItem<T> {
  const item: OfflineQueueItem<T> = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    payload,
  };

  const queue = readQueue<T>();
  queue.push(item);
  writeQueue(queue);

  return item;
}

export function removeOfflineItem(
  itemId: string,
): void {
  const queue = readQueue<unknown>().filter(
    (item) => item.id !== itemId,
  );

  writeQueue(queue);
}

export function clearOfflineQueue(): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}