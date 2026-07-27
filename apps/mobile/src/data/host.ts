import type { ImageSourcePropType } from "react-native";

export type Space = {
  id: string;
  name: string;
  summary: string;
  area: string;
  standing: number;
  seated: number;
  price: string;
  access: string;
  features: string[];
  image: ImageSourcePropType;
};

export type HireRequest = {
  id: string;
  organiser: string;
  eventName: string;
  eventType: string;
  space: string;
  date: string;
  time: string;
  guests: number;
  status:
    | "New"
    | "Under review"
    | "Quoted"
    | "Accepted"
    | "Changes requested"
    | "Declined";
  received: string;
  note: string;
};

export const venue = {
  name: "The Island",
  address: "Nelson Street, Bristol, BS1 2LE",
  organisation: "Artspace Lifespace",
  published: true,
};

export const spaces: Space[] = [
  {
    id: "dance-studio",
    name: "Dance Studio",
    summary:
      "Bright rehearsal room with sprung floor, mirrors and natural light.",
    area: "146 m²",
    standing: 120,
    seated: 80,
    price: "£35–£60 per hour",
    access: "Step-free via lift",
    features: [
      "Sprung floor",
      "Full-length mirrors",
      "PA system",
      "Changing room",
      "Wi-Fi",
      "Natural light",
    ],
    image: require("../../assets/artspace/dance-studio.jpg"),
  },
  {
    id: "gallery",
    name: "Gallery",
    summary:
      "Flexible exhibition and workshop space with clean walls and track lighting.",
    area: "92 m²",
    standing: 70,
    seated: 45,
    price: "£30–£50 per hour",
    access: "Step-free access",
    features: [
      "Track lighting",
      "Projector",
      "Kitchen access",
      "Wi-Fi",
      "Exhibition fixings",
    ],
    image: require("../../assets/artspace/gallery-community.jpg"),
  },
  {
    id: "community-room",
    name: "Community Room",
    summary:
      "Affordable, informal room for meetings, classes and small workshops.",
    area: "54 m²",
    standing: 40,
    seated: 28,
    price: "£18–£32 per hour",
    access: "Step-free access",
    features: [
      "Tables and chairs",
      "Sink",
      "Whiteboard",
      "Wi-Fi",
      "Quiet space nearby",
    ],
    image: require("../../assets/artspace/broadmead-xp.png"),
  },
];

export const hireRequests: HireRequest[] = [
  {
    id: "HR-2041",
    organiser: "Bristol Movement Lab",
    eventName: "Open Floor: Summer Session",
    eventType: "Dance workshop",
    space: "Dance Studio",
    date: "Mon 3 Aug 2026",
    time: "18:00–22:00",
    guests: 68,
    status: "New",
    received: "Today, 09:42",
    note: "We need 45 minutes for setup and would like to use the PA system. The group includes two wheelchair users.",
  },
  {
    id: "HR-2038",
    organiser: "Stokes Croft Cinema",
    eventName: "Neighbourhood Shorts",
    eventType: "Film screening",
    space: "Gallery",
    date: "Fri 7 Aug 2026",
    time: "16:00–23:00",
    guests: 55,
    status: "Quoted",
    received: "Yesterday",
    note: "Screening with a short panel discussion. We can bring our own screen if required.",
  },
  {
    id: "HR-2034",
    organiser: "Open Floor Collective",
    eventName: "Sunday Movement Practice",
    eventType: "Rehearsal",
    space: "Dance Studio",
    date: "Mon 10 Aug 2026",
    time: "09:00–13:00",
    guests: 24,
    status: "Accepted",
    received: "24 Jul",
    note: "Regular rehearsal session. No public audience or amplified music.",
  },
  {
    id: "HR-2029",
    organiser: "Bristol Zine Club",
    eventName: "Make & Share",
    eventType: "Workshop",
    space: "Community Room",
    date: "Fri 14 Aug 2026",
    time: "11:00–17:00",
    guests: 30,
    status: "Changes requested",
    received: "22 Jul",
    note: "A relaxed zine-making day with drop-in participation.",
  },
];

export const unavailableDays = [3, 7, 10, 14, 18, 22, 29];
export const partialDays = [5, 12, 20, 27];
