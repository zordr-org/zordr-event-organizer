import type { EventDetails, EventItem } from "@/types/event";
import type { Order } from "@/types/order";
import type { CheckIn } from "@/types/checkin";
import type {
  SettlementTransaction,
  SettlementHistoryItem,
  Invoice,
} from "@/types/settlement";
import type { Organizer } from "@/types/organizer";
import type { Notification } from "@/types/notification";

/* =========================================================
   ORGANIZER
   ========================================================= */

export const mockOrganizer: Organizer = {
  id: "ORG-001",
  name: "KITSW Cultural Club",
  type: "College Club / Student Body",
  contactName: "Rohit Varma",
  email: "organizer@kitsw.ac.in",
  phone: "+91 98765 43210",
  city: "Warangal",
  state: "Telangana",
  pincode: "506015",
  status: "Active",
};


/* =========================================================
   EVENTS
   ========================================================= */

export const mockEvents: EventDetails[] = [
  {
    id: "1",
    title: "Crescendo Fest 2026",
    tags: ["Music", "Flagship"],
    category: "Music",
    date: "Oct 12, 2026",
    time: "4:00 PM",
    venue: "KITSW Campus, Warangal",

    status: "On Sale",

    sold: 642,
    capacity: 800,
    revenue: 321000,

    gradient:
      "linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f97316 100%)",

    shortDescription:
      "KITSW's flagship music and cultural festival featuring live performances and student artists.",

    detailedDescription:
      "Crescendo Fest 2026 brings together students, performers and music enthusiasts for an evening of live performances, cultural activities and entertainment.",

    eventMode: "offline",

    venueName: "Main Auditorium, KITSW",
    address:
      "Kakatiya Institute of Technology & Science, Warangal, Telangana",
    mapLocation: "Warangal, Telangana",
    venueInstructions:
      "Entry through the main gate. Carry your college ID.",

    startDate: "2026-10-12",
    startTime: "16:00",
    endTime: "20:00",

    bannerName: "crescendo-fest-2026.png",
    galleryCount: 6,
    promoVideo: "",

    ticketName: "General Pass",
    ticketDescription: "Access to all Crescendo Fest activities.",
    ticketPrice: "499",
    ticketQuantity: "800",
    purchaseLimit: "2",

    registrationEnabled: true,
    registrationType: "individual",

    minTeamSize: "2",
    maxTeamSize: "5",

    teamMemberFields: {
      name: true,
      email: true,
      phone: true,
      institution: true,
      departmentYear: true,
    },

    registrationDeadline: "2026-10-11",
    maxAttendees: "800",
    waitlistEnabled: true,

    publishMode: "now",
    publishDate: "2026-10-01",

    orderMetrics: {
      registrations: 940,
      ticketsSold: 642,
      pending: 298,
      checkedIn: 642,
    },
  },

  {
    id: "2",
    title: "Tech Talk Series",
    tags: ["Talks", "Educational"],
    category: "Technology",
    date: "Oct 18, 2026",
    time: "2:00 PM",
    venue: "Main Auditorium, KITSW",

    status: "On Sale",

    sold: 210,
    capacity: 300,
    revenue: 105000,

    gradient:
      "linear-gradient(135deg, #0f766e 0%, #14b8a6 50%, #67e8f9 100%)",

    shortDescription:
      "Technology talks and expert sessions for students and developers.",

    detailedDescription:
      "Tech Talk Series is an educational event featuring technical talks, industry discussions and interactive sessions.",

    eventMode: "offline",

    venueName: "Seminar Hall, KITSW",
    address:
      "Kakatiya Institute of Technology & Science, Warangal, Telangana",
    mapLocation: "Warangal, Telangana",
    venueInstructions:
      "Please arrive 15 minutes before the session.",

    startDate: "2026-10-18",
    startTime: "14:00",
    endTime: "17:00",

    bannerName: "tech-talk-series.png",
    galleryCount: 4,
    promoVideo: "",

    ticketName: "General Pass",
    ticketDescription: "Entry to all Tech Talk Series sessions.",
    ticketPrice: "500",
    ticketQuantity: "300",
    purchaseLimit: "1",

    registrationEnabled: true,
    registrationType: "individual",

    minTeamSize: "2",
    maxTeamSize: "5",

    teamMemberFields: {
      name: true,
      email: true,
      phone: true,
      institution: true,
      departmentYear: true,
    },

    registrationDeadline: "2026-10-17",
    maxAttendees: "300",
    waitlistEnabled: true,

    publishMode: "now",
    publishDate: "2026-10-01",

    orderMetrics: {
      registrations: 520,
      ticketsSold: 386,
      pending: 134,
      checkedIn: 271,
    },
  },

  {
    id: "3",
    title: "Inferno 2026",
    tags: ["Cultural", "Fest"],
    category: "Cultural",
    date: "Nov 2, 2026",
    time: "6:00 PM",
    venue: "KITSW Open Grounds",

    status: "Draft",

    sold: 0,
    capacity: 500,
    revenue: 0,

    gradient:
      "linear-gradient(135deg, #111827 0%, #7f1d1d 50%, #f97316 100%)",

    shortDescription:
      "A large-scale cultural fest celebrating music, dance and student talent.",

    detailedDescription:
      "Inferno 2026 is a campus cultural festival featuring performances, competitions and student-led activities.",

    eventMode: "offline",

    venueName: "KITSW Open Grounds",
    address:
      "Kakatiya Institute of Technology & Science, Warangal, Telangana",
    mapLocation: "Warangal, Telangana",
    venueInstructions:
      "Event entry will be through the designated festival entrance.",

    startDate: "2026-11-02",
    startTime: "18:00",
    endTime: "22:00",

    bannerName: "inferno-2026.png",
    galleryCount: 0,
    promoVideo: "",

    ticketName: "Festival Pass",
    ticketDescription: "Access to Inferno 2026.",
    ticketPrice: "299",
    ticketQuantity: "500",
    purchaseLimit: "2",

    registrationEnabled: true,
    registrationType: "team",

    minTeamSize: "2",
    maxTeamSize: "5",

    teamMemberFields: {
      name: true,
      email: true,
      phone: true,
      institution: true,
      departmentYear: true,
    },

    registrationDeadline: "2026-11-01",
    maxAttendees: "500",
    waitlistEnabled: true,

    publishMode: "draft",
    publishDate: "2026-11-02",

    orderMetrics: {
      registrations: 0,
      ticketsSold: 0,
      pending: 0,
      checkedIn: 0,
    },
  },

  {
    id: "4",
    title: "Open Mic Night",
    tags: ["Performing Arts", "Student Led"],
    category: "Performing Arts",
    date: "Nov 10, 2026",
    time: "5:00 PM",
    venue: "Cafeteria Lawn",

    status: "Upcoming",

    sold: 12,
    capacity: 200,
    revenue: 5400,

    gradient:
      "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #c084fc 100%)",

    shortDescription:
      "A student-led evening of music, poetry, comedy and performances.",

    detailedDescription:
      "Open Mic Night provides students with a platform to showcase their creative talents.",

    eventMode: "offline",

    venueName: "Cafeteria Lawn",
    address:
      "Kakatiya Institute of Technology & Science, Warangal, Telangana",
    mapLocation: "Warangal, Telangana",
    venueInstructions:
      "Audience entry begins 30 minutes before the event.",

    startDate: "2026-11-10",
    startTime: "17:00",
    endTime: "20:00",

    bannerName: "open-mic-night.png",
    galleryCount: 2,
    promoVideo: "",

    ticketName: "Entry Pass",
    ticketDescription: "Entry to Open Mic Night.",
    ticketPrice: "450",
    ticketQuantity: "200",
    purchaseLimit: "2",

    registrationEnabled: true,
    registrationType: "individual",

    minTeamSize: "2",
    maxTeamSize: "5",

    teamMemberFields: {
      name: true,
      email: true,
      phone: true,
      institution: false,
      departmentYear: false,
    },

    registrationDeadline: "2026-11-09",
    maxAttendees: "200",
    waitlistEnabled: false,

    publishMode: "now",
    publishDate: "2026-10-01",

    orderMetrics: {
      registrations: 12,
      ticketsSold: 12,
      pending: 0,
      checkedIn: 0,
    },
  },

  {
    id: "5",
    title: "Cultural Night",
    tags: ["Cultural", "Annual"],
    category: "Cultural",
    date: "Aug 15, 2026",
    time: "6:00 PM",
    venue: "Main Ground, KITSW",

    status: "Completed",

    sold: 500,
    capacity: 500,
    revenue: 250000,

    gradient:
      "linear-gradient(135deg, #be123c 0%, #e11d48 45%, #fb923c 100%)",

    shortDescription:
      "Annual cultural celebration featuring music, dance and performances.",

    detailedDescription:
      "Cultural Night is an annual KITSW celebration featuring performances from students across different departments.",

    eventMode: "offline",

    venueName: "Open Air Theatre, KITSW",
    address:
      "Kakatiya Institute of Technology & Science, Warangal, Telangana",
    mapLocation: "Warangal, Telangana",
    venueInstructions:
      "Entry through the main ground entrance.",

    startDate: "2026-08-15",
    startTime: "18:00",
    endTime: "22:00",

    bannerName: "cultural-night.png",
    galleryCount: 8,
    promoVideo: "",

    ticketName: "Cultural Night Pass",
    ticketDescription: "Entry to Cultural Night.",
    ticketPrice: "500",
    ticketQuantity: "500",
    purchaseLimit: "2",

    registrationEnabled: true,
    registrationType: "individual",

    minTeamSize: "2",
    maxTeamSize: "5",

    teamMemberFields: {
      name: true,
      email: true,
      phone: true,
      institution: true,
      departmentYear: true,
    },

    registrationDeadline: "2026-08-14",
    maxAttendees: "500",
    waitlistEnabled: false,

    publishMode: "now",
    publishDate: "2026-08-01",

    orderMetrics: {
      registrations: 410,
      ticketsSold: 295,
      pending: 115,
      checkedIn: 194,
    },
  },

  {
    id: "6",
    title: "Design Workshop",
    tags: ["Workshop", "Skills"],
    category: "Workshop",
    date: "Jul 20, 2026",
    time: "10:00 AM",
    venue: "Seminar Hall, KITSW",

    status: "Completed",

    sold: 120,
    capacity: 120,
    revenue: 36000,

    gradient:
      "linear-gradient(135deg, #0f172a 0%, #334155 50%, #64748b 100%)",

    shortDescription:
      "Hands-on design workshop for students interested in creative skills.",

    detailedDescription:
      "A practical workshop focused on design thinking, visual communication and creative tools.",

    eventMode: "offline",

    venueName: "Seminar Hall, KITSW",
    address:
      "Kakatiya Institute of Technology & Science, Warangal, Telangana",
    mapLocation: "Warangal, Telangana",
    venueInstructions:
      "Participants should carry their college ID.",

    startDate: "2026-07-20",
    startTime: "10:00",
    endTime: "14:00",

    bannerName: "design-workshop.png",
    galleryCount: 3,
    promoVideo: "",

    ticketName: "Workshop Pass",
    ticketDescription: "Access to the complete workshop.",
    ticketPrice: "300",
    ticketQuantity: "120",
    purchaseLimit: "1",

    registrationEnabled: true,
    registrationType: "individual",

    minTeamSize: "2",
    maxTeamSize: "5",

    teamMemberFields: {
      name: true,
      email: true,
      phone: true,
      institution: true,
      departmentYear: true,
    },

    registrationDeadline: "2026-07-19",
    maxAttendees: "120",
    waitlistEnabled: false,

    publishMode: "now",
    publishDate: "2026-07-01",

    orderMetrics: {
      registrations: 120,
      ticketsSold: 120,
      pending: 0,
      checkedIn: 120,
    },
  },

  {
    id: "7",
    title: "Marathon 2026",
    tags: ["Sports", "Outdoor"],
    category: "Sports",
    date: "Dec 5, 2026",
    time: "6:00 AM",
    venue: "KITSW Campus",

    status: "Cancelled",

    sold: 0,
    capacity: 300,
    revenue: 0,

    gradient:
      "linear-gradient(135deg, #064e3b 0%, #059669 50%, #34d399 100%)",

    shortDescription:
      "Campus marathon and outdoor fitness event.",

    detailedDescription:
      "Marathon 2026 is a campus-wide outdoor fitness event planned for students and participants.",

    eventMode: "offline",

    venueName: "KITSW Campus",
    address:
      "Kakatiya Institute of Technology & Science, Warangal, Telangana",
    mapLocation: "Warangal, Telangana",
    venueInstructions:
      "The event has currently been cancelled.",

    startDate: "2026-12-05",
    startTime: "06:00",
    endTime: "09:00",

    bannerName: "marathon-2026.png",
    galleryCount: 1,
    promoVideo: "",

    ticketName: "Marathon Pass",
    ticketDescription: "Entry to Marathon 2026.",
    ticketPrice: "200",
    ticketQuantity: "300",
    purchaseLimit: "1",

    registrationEnabled: false,
    registrationType: "individual",

    minTeamSize: "2",
    maxTeamSize: "5",

    teamMemberFields: {
      name: true,
      email: true,
      phone: true,
      institution: true,
      departmentYear: true,
    },

    registrationDeadline: "2026-12-04",
    maxAttendees: "300",
    waitlistEnabled: false,

    publishMode: "draft",
    publishDate: "2026-12-05",

    orderMetrics: {
      registrations: 0,
      ticketsSold: 0,
      pending: 0,
      checkedIn: 0,
    },
  },

  {
    id: "8",
    title: "Freshers' Welcome",
    tags: ["Social", "Onboarding"],
    category: "Social",
    date: "Sep 1, 2026",
    time: "5:00 PM",
    venue: "Main Auditorium, KITSW",

    status: "Upcoming",

    sold: 88,
    capacity: 400,
    revenue: 44000,

    gradient:
      "linear-gradient(135deg, #312e81 0%, #6366f1 50%, #a78bfa 100%)",

    shortDescription:
      "Welcome event for the incoming student batch.",

    detailedDescription:
      "Freshers' Welcome introduces new students to campus life through performances, activities and interactions.",

    eventMode: "offline",

    venueName: "Main Auditorium, KITSW",
    address:
      "Kakatiya Institute of Technology & Science, Warangal, Telangana",
    mapLocation: "Warangal, Telangana",
    venueInstructions:
      "Carry your college ID for entry.",

    startDate: "2026-09-01",
    startTime: "17:00",
    endTime: "20:00",

    bannerName: "freshers-welcome.png",
    galleryCount: 5,
    promoVideo: "",

    ticketName: "Welcome Pass",
    ticketDescription: "Entry to Freshers' Welcome.",
    ticketPrice: "500",
    ticketQuantity: "400",
    purchaseLimit: "1",

    registrationEnabled: true,
    registrationType: "individual",

    minTeamSize: "2",
    maxTeamSize: "5",

    teamMemberFields: {
      name: true,
      email: true,
      phone: true,
      institution: true,
      departmentYear: true,
    },

    registrationDeadline: "2026-08-31",
    maxAttendees: "400",
    waitlistEnabled: true,

    publishMode: "now",
    publishDate: "2026-08-01",

    orderMetrics: {
      registrations: 88,
      ticketsSold: 88,
      pending: 0,
      checkedIn: 88,
    },
  },
];


/* =========================================================
   BASE ORDERS
   ========================================================= */

const baseOrders: Order[] = [
  {
    id: "#CF260001",
    name: "Aditi Sharma",
    email: "aditi.sharma@example.com",
    ticket: "General Pass",
    quantity: 1,
    amount: 499,
    payment: "UPI",
    status: "Confirmed",
    date: "Oct 5, 2026",
    time: "10:32 AM",
    checkedIn: true,
  },
  {
    id: "#CF260002",
    name: "Rohan Mehta",
    email: "rohan.mehta@example.com",
    ticket: "VIP Pass",
    quantity: 1,
    amount: 999,
    payment: "Card",
    status: "Confirmed",
    date: "Oct 5, 2026",
    time: "10:15 AM",
    checkedIn: true,
  },
  {
    id: "#CF260003",
    name: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    ticket: "General Pass",
    quantity: 1,
    amount: 499,
    payment: "UPI",
    status: "Confirmed",
    date: "Oct 5, 2026",
    time: "09:48 AM",
    checkedIn: true,
  },
  {
    id: "#CF260004",
    name: "Arjun Nair",
    email: "arjun.nair@example.com",
    ticket: "Backstage Pass",
    quantity: 1,
    amount: 1499,
    payment: "Card",
    status: "Confirmed",
    date: "Oct 5, 2026",
    time: "09:32 AM",
    checkedIn: true,
  },
  {
    id: "#CF260005",
    name: "Priya Kulkarni",
    email: "priya.kulkarni@example.com",
    ticket: "VIP Pass",
    quantity: 1,
    amount: 999,
    payment: "UPI",
    status: "Confirmed",
    date: "Oct 5, 2026",
    time: "09:18 AM",
    checkedIn: true,
  },
  {
    id: "#CF260006",
    name: "Karthik Rao",
    email: "karthik.rao@example.com",
    ticket: "General Pass",
    quantity: 1,
    amount: 499,
    payment: "UPI",
    status: "Confirmed",
    date: "Oct 5, 2026",
    time: "08:54 AM",
    checkedIn: true,
  },
  {
    id: "#CF260007",
    name: "Meghana Patel",
    email: "meghana.patel@example.com",
    ticket: "General Pass",
    quantity: 1,
    amount: 499,
    payment: "Card",
    status: "Confirmed",
    date: "Oct 5, 2026",
    time: "08:41 AM",
    checkedIn: true,
  },
  {
    id: "#CF260008",
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    ticket: "VIP Pass",
    quantity: 1,
    amount: 999,
    payment: "UPI",
    status: "Confirmed",
    date: "Oct 5, 2026",
    time: "08:25 AM",
    checkedIn: true,
  },
  {
    id: "#CF260009",
    name: "Vishnu Teja",
    email: "vishnu.teja@example.com",
    ticket: "Student Pass",
    quantity: 1,
    amount: 299,
    payment: "UPI",
    status: "Confirmed",
    date: "Oct 5, 2026",
    time: "08:12 AM",
    checkedIn: true,
  },
  {
    id: "#CF260010",
    name: "Ananya Rao",
    email: "ananya.rao@example.com",
    ticket: "General Pass",
    quantity: 1,
    amount: 499,
    payment: "Card",
    status: "Confirmed",
    date: "Oct 5, 2026",
    time: "07:58 AM",
    checkedIn: true,
  },
];


/* =========================================================
   ORDER GENERATOR
   ========================================================= */

const generatedNames = [
  "Rahul Kumar",
  "Ananya Reddy",
  "Vivek Sharma",
  "Sakshi Rao",
  "Nikhil Varma",
  "Pooja Singh",
  "Harshith Reddy",
  "Keerthi Patel",
  "Manoj Kumar",
  "Divya Nair",
  "Aditya Verma",
  "Swathi Rao",
  "Kiran Kumar",
  "Meghana Reddy",
  "Sanjay Patel",
  "Nandini Sharma",
];

const ticketTypes = [
  "General Pass",
  "Student Pass",
  "VIP Pass",
];

function generateOrders(
  eventCode: string,
  count: number,
  confirmedCount: number,
  checkedInCount: number,
  date: string,
  startingAmount: number,
): Order[] {
  const orders: Order[] = [];

  for (let i = 0; i < count; i += 1) {
    const number = i + 1;

    const base = baseOrders[i % baseOrders.length];

    const isConfirmed = i < confirmedCount;
    const isCheckedIn = i < checkedInCount;

    orders.push({
      id:
        i < baseOrders.length && eventCode === "CF26"
          ? base.id
          : `#${eventCode}${String(number).padStart(4, "0")}`,

      name:
        i < baseOrders.length && eventCode === "CF26"
          ? base.name
          : generatedNames[i % generatedNames.length],

      email:
        i < baseOrders.length && eventCode === "CF26"
          ? base.email
          : `attendee${number}@example.com`,

      ticket:
        i < baseOrders.length && eventCode === "CF26"
          ? base.ticket
          : ticketTypes[i % ticketTypes.length],

      quantity: 1,

      amount:
        i < baseOrders.length && eventCode === "CF26"
          ? base.amount
          : startingAmount + (i % 3) * 200,

      payment: i % 3 === 0 ? "UPI" : i % 3 === 1 ? "Card" : "Net Banking",

      status: isConfirmed ? "Confirmed" : "Pending",

      date,

      time: `${String(8 + (i % 10)).padStart(2, "0")}:${String(
        i % 60,
      ).padStart(2, "0")} AM`,

      checkedIn: isCheckedIn,
    });
  }

  return orders;
}


/* =========================================================
   ORDERS BY EVENT
   ========================================================= */

export const mockOrdersByEvent: Record<string, Order[]> = {
  "1": generateOrders(
    "CF26",
    940,
    642,
    642,
    "Oct 5, 2026",
    499,
  ),

  "2": generateOrders(
    "TT26",
    520,
    386,
    271,
    "Sep 28, 2026",
    500,
  ),

  "5": generateOrders(
    "CN26",
    410,
    295,
    194,
    "Sep 20, 2026",
    500,
  ),

  "4": generateOrders(
    "OM26",
    12,
    12,
    0,
    "Oct 20, 2026",
    450,
  ),

  "8": generateOrders(
    "FW26",
    88,
    88,
    88,
    "Aug 25, 2026",
    500,
  ),

  "6": generateOrders(
    "DW26",
    120,
    120,
    120,
    "Jul 10, 2026",
    300,
  ),

  "3": [],
  "7": [],
};


/* =========================================================
   SCANNER / CHECK-IN DATA
   ========================================================= */

export const mockCheckIns: CheckIn[] = [
  {
    id: "SCAN-001",
    name: "Aditi Sharma",
    ticket: "General Pass",
    order: "#CF260001",
    time: "Oct 12, 4:02 PM",
    status: "Checked In",
  },
  {
    id: "SCAN-002",
    name: "Rohan Mehta",
    ticket: "VIP Pass",
    order: "#CF260002",
    time: "Oct 12, 4:01 PM",
    status: "Checked In",
  },
  {
    id: "SCAN-003",
    name: "Sneha Reddy",
    ticket: "General Pass",
    order: "#CF260003",
    time: "Oct 12, 3:59 PM",
    status: "Checked In",
  },
  {
    id: "SCAN-004",
    name: "Arjun Nair",
    ticket: "Backstage Pass",
    order: "#CF260004",
    time: "Oct 12, 3:58 PM",
    status: "Checked In",
  },
  {
    id: "SCAN-005",
    name: "Priya Kulkarni",
    ticket: "VIP Pass",
    order: "#CF260005",
    time: "Oct 12, 3:56 PM",
    status: "Checked In",
  },
  {
    id: "SCAN-006",
    name: "Karthik Rao",
    ticket: "General Pass",
    order: "#CF260006",
    time: "Oct 12, 3:54 PM",
    status: "Checked In",
  },
  {
    id: "SCAN-007",
    name: "Meghana Patel",
    ticket: "General Pass",
    order: "#CF260007",
    time: "Oct 12, 3:52 PM",
    status: "Checked In",
  },
  {
    id: "SCAN-008",
    name: "Rahul Verma",
    ticket: "VIP Pass",
    order: "#CF260008",
    time: "Oct 12, 3:49 PM",
    status: "Checked In",
  },
];


/* =========================================================
   SETTLEMENT DATA
   ========================================================= */

export const mockSettlementTransactions: SettlementTransaction[] = [
  {
    id: "TXN-001",
    orderId: "#CF260001",
    name: "Aditi Sharma",
    ticketType: "General Pass",
    amount: 499,
    paymentMethod: "UPI",
    status: "Settled",
    date: "Oct 5, 2026",
    time: "10:32 AM",
  },
  {
    id: "TXN-002",
    orderId: "#CF260002",
    name: "Rohan Mehta",
    ticketType: "VIP Pass",
    amount: 999,
    paymentMethod: "Card",
    status: "Settled",
    date: "Oct 5, 2026",
    time: "10:15 AM",
  },
  {
    id: "TXN-003",
    orderId: "#CF260003",
    name: "Sneha Reddy",
    ticketType: "General Pass",
    amount: 499,
    paymentMethod: "UPI",
    status: "Processing",
    date: "Oct 5, 2026",
    time: "09:48 AM",
  },
  {
    id: "TXN-004",
    orderId: "#CF260004",
    name: "Arjun Nair",
    ticketType: "Backstage Pass",
    amount: 1499,
    paymentMethod: "Card",
    status: "Settled",
    date: "Oct 5, 2026",
    time: "09:32 AM",
  },
  {
    id: "TXN-005",
    orderId: "#CF260005",
    name: "Priya Kulkarni",
    ticketType: "VIP Pass",
    amount: 999,
    paymentMethod: "UPI",
    status: "Processing",
    date: "Oct 5, 2026",
    time: "09:18 AM",
  },
];


export const mockSettlementHistory: SettlementHistoryItem[] = [
  {
    date: "Sep 30, 2026",
    amount: 120000,
    status: "Completed",
  },
  {
    date: "Aug 31, 2026",
    amount: 98500,
    status: "Completed",
  },
  {
    date: "Jul 31, 2026",
    amount: 75600,
    status: "Completed",
  },
];


export const mockInvoices: Invoice[] = [
  {
    id: "INV-2026-001",
    date: "Sep 30, 2026",
    amount: 120000,
    status: "Paid",
  },
  {
    id: "INV-2026-002",
    date: "Aug 31, 2026",
    amount: 98500,
    status: "Paid",
  },
  {
    id: "INV-2026-003",
    date: "Jul 31, 2026",
    amount: 75600,
    status: "Paid",
  },
];


/* =========================================================
   DASHBOARD DATA
   ========================================================= */

export const mockDashboardStats = [
  {
    title: "Active Events",
    value: "3",
    change: "↑ 1 vs last month",
    icon: "calendar",
    style: "green",
  },
  {
    title: "Tickets Sold",
    value: "1,248",
    change: "↑ 22% vs last month",
    icon: "users",
    style: "blue",
  },
  {
    title: "Total Revenue",
    value: "₹2,49,600",
    change: "↑ 28% vs last month",
    icon: "revenue",
    style: "purple",
  },
  {
    title: "Today's Check-ins",
    value: "326",
    change: "↑ 12% vs yesterday",
    icon: "qr",
    style: "yellow",
  },
  {
    title: "Pending Settlement",
    value: "₹1,87,200",
    change: "Processing",
    icon: "wallet",
    style: "red",
  },
];


export const mockRecentActivity = [
  {
    title: "New ticket booked - Inferno 2026",
    description: "Arjun Reddy • ₹499 • General Pass",
    time: "2 min ago",
    icon: "ticket",
    style: "green",
  },
  {
    title: "Check-in completed - Tech Talk Series",
    description: "Sneha Kulkarni • VIP Pass",
    time: "12 min ago",
    icon: "qr",
    style: "blue",
  },
  {
    title: "New registration - Crescendo Fest",
    description: "Vishnu Teja • ₹299 • Student Pass",
    time: "28 min ago",
    icon: "user",
    style: "purple",
  },
  {
    title: "Settlement initiated",
    description: "₹1,20,000 • Bank transfer",
    time: "2 hours ago",
    icon: "revenue",
    style: "orange",
  },
  {
    title: "Event updated - Cultural Night",
    description: "Event details modified",
    time: "4 hours ago",
    icon: "zap",
    style: "gray",
  },
];


export const mockUpcomingEvents = [
  {
    date: "12",
    month: "OCT",
    title: "Crescendo Fest 2026",
    time: "4:00 PM",
    location: "KITSW Campus, Warangal",
    tickets: "642 / 800",
    status: "On Sale",
    style: "pink",
  },
  {
    date: "18",
    month: "OCT",
    title: "Tech Talk Series",
    time: "2:00 PM",
    location: "Main Auditorium, KITSW",
    tickets: "210 / 300",
    status: "On Sale",
    style: "dark",
  },
  {
    date: "02",
    month: "NOV",
    title: "Inferno 2026",
    time: "6:00 PM",
    location: "KITSW Open Grounds",
    tickets: "396 / 500",
    status: "Draft",
    style: "blue",
  },
];


export const mockNotifications: Notification[] = [
  {
    id: "N-001",
    title: "New ticket booked",
    description: "A new ticket was booked for Crescendo Fest.",
    time: "2 min ago",
  },
  {
    id: "N-002",
    title: "Check-in completed",
    description: "A ticket was successfully checked in.",
    time: "12 min ago",
  },
  {
    id: "N-003",
    title: "Settlement initiated",
    description: "₹1,20,000 settlement has been initiated.",
    time: "2 hours ago",
  },
];


/* =========================================================
   DASHBOARD QUICK ACTIONS
   ========================================================= */

export const mockQuickActions = [
  {
    title: "Create Event",
    description: "Launch a new event",
    icon: "plus",
    href: "/events/new",
    style: "green",
  },
  {
    title: "View My Events",
    description: "Manage your events",
    icon: "ticket",
    href: "/events",
    style: "blue",
  },
  {
    title: "Open Scanner",
    description: "Check-in attendees",
    icon: "scan",
    href: "/scanner",
    style: "purple",
  },
  {
    title: "View Analytics",
    description: "See detailed insights",
    icon: "trending",
    href: "/analytics",
    style: "yellow",
  },
];


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

export function getMockEventById(
  eventId: string,
): EventDetails | undefined {
  return mockEvents.find((event) => event.id === eventId);
}


export function getMockEvents(): EventItem[] {
  return mockEvents;
}


export function getMockOrdersByEvent(
  eventId: string,
): Order[] {
  return mockOrdersByEvent[eventId] ?? [];
}


export function getMockCheckIns(): CheckIn[] {
  return mockCheckIns;
}


export function getMockSettlementTransactions(): SettlementTransaction[] {
  return mockSettlementTransactions;
}


export function getMockSettlementHistory(): SettlementHistoryItem[] {
  return mockSettlementHistory;
}


export function getMockInvoices(): Invoice[] {
  return mockInvoices;
}


/* =========================================================
   UPDATE MOCK EVENT
   ========================================================= */

export function updateMockEvent(
  eventId: string,
  updates: Partial<EventDetails>,
): EventDetails | undefined {
  const index = mockEvents.findIndex(
    (event) => event.id === eventId,
  );

  if (index === -1) {
    return undefined;
  }

  mockEvents[index] = {
    ...mockEvents[index],
    ...updates,
  };

  return mockEvents[index];
}


/* =========================================================
   CREATE MOCK EVENT
   ========================================================= */

export function createMockEvent(
  event: EventDetails,
): EventDetails {
  mockEvents.push(event);

  if (!mockOrdersByEvent[event.id]) {
    mockOrdersByEvent[event.id] = [];
  }

  return event;
}


/* =========================================================
   DELETE MOCK EVENT
   ========================================================= */

export function deleteMockEvent(
  eventId: string,
): boolean {
  const index = mockEvents.findIndex(
    (event) => event.id === eventId,
  );

  if (index === -1) {
    return false;
  }

  mockEvents.splice(index, 1);

  delete mockOrdersByEvent[eventId];

  return true;
}