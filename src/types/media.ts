export type MediaType =
  | "image"
  | "video"
  | "document";

export type MediaItem = {
  id: string;
  name: string;
  url: string;
  type: MediaType;
  size?: number;
  mimeType?: string;
  uploadedAt?: string;
};

export type EventMedia = {
  banner?: MediaItem;
  gallery: MediaItem[];
  promoVideo?: MediaItem;
};