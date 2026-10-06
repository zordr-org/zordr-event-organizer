import type { OrderStatus } from "./common";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  institution?: string;
  departmentYear?: string;
};

export type Order = {
  id: string;

  name: string;
  email: string;

  ticket: string;
  quantity: number;
  amount: number;

  payment: string;
  status: OrderStatus;

  date: string;
  time: string;

  checkedIn: boolean;

  teamMembers?: TeamMember[];
};