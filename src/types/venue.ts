import type { EventMode } from "./common";

export type Venue = {
  id: string;

  name: string;

  address: string;
  city: string;
  state: string;
  pincode: string;

  mapLocation?: string;

  instructions?: string;

  capacity?: number;

  supportedModes: EventMode[];
};