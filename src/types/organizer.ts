export type OrganizerStatus =
  | "Active"
  | "Inactive"
  | "Pending";

export type Organizer = {
  id: string;

  name: string;
  type: string;

  contactName: string;
  email: string;
  phone: string;

  city: string;
  state: string;
  pincode: string;

  status: OrganizerStatus;
};