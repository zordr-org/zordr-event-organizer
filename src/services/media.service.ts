import { getMockEventById } from "@/mock/db";

import type { EventMedia, MediaItem } from "@/types/media";

function createBanner(
  eventId: string,
  bannerName: string,
): MediaItem {
  return {
    id: `${eventId}-banner`,
    name: bannerName,
    url: `/images/events/${bannerName}`,
    type: "image",
  };
}

function createGalleryItems(
  eventId: string,
  count: number,
): MediaItem[] {
  const gallery: MediaItem[] = [];

  for (let index = 1; index <= count; index += 1) {
    gallery.push({
      id: `${eventId}-gallery-${index}`,
      name: `gallery-${index}.jpg`,
      url: `/images/events/${eventId}/gallery-${index}.jpg`,
      type: "image",
    });
  }

  return gallery;
}

export function getEventMedia(
  eventId: string,
): EventMedia | undefined {
  const event = getMockEventById(eventId);

  if (!event) {
    return undefined;
  }

  const media: EventMedia = {
    banner: event.bannerName
      ? createBanner(eventId, event.bannerName)
      : undefined,
    gallery: createGalleryItems(
      eventId,
      event.galleryCount,
    ),
  };

  if (event.promoVideo) {
    media.promoVideo = {
      id: `${eventId}-promo`,
      name: event.promoVideo,
      url: `/images/events/${event.promoVideo}`,
      type: "video",
    };
  }

  return media;
}

export function getEventBanner(
  eventId: string,
): MediaItem | undefined {
  return getEventMedia(eventId)?.banner;
}

export function getEventGallery(
  eventId: string,
): MediaItem[] {
  return getEventMedia(eventId)?.gallery ?? [];
}

export function getEventPromoVideo(
  eventId: string,
): MediaItem | undefined {
  return getEventMedia(eventId)?.promoVideo;
}