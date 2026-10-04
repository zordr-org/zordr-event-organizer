import type { CheckInStatus } from "./common";

export type CheckIn = {
  id: string;

  name: string;
  ticket: string;
  order: string;

  time: string;

  status: CheckInStatus;
};