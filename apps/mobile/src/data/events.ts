import type { ImageSourcePropType } from "react-native";

export type EventItem = {
  id: string;
  title: string;
  category: string;
  venue: string;
  date: string;
  time: string;
  price: string;
  accessibility: string;
  image: ImageSourcePropType;
  tint: string;
};

export const events: EventItem[] = [
  {
    id: "broadmead-xp",
    title: "Broadmead XP",
    category: "Dance",
    venue: "The Island",
    date: "Mon 27 Jul 2026",
    time: "19:00–20:30",
    price: "From £8",
    accessibility: "Step-free access",
    image: require("../../assets/artspace/dance-studio.jpg"),
    tint: "#DB2F67",
  },
  {
    id: "summer-sounds",
    title: "Sparks Presents: Summer Sounds",
    category: "Live music",
    venue: "Sparks Bristol",
    date: "Tue 28 Jul 2026",
    time: "20:00",
    price: "From £6",
    accessibility: "Quiet space available",
    image: require("../../assets/artspace/broadmead-xp.png"),
    tint: "#18C9C1",
  },
  {
    id: "open-doors",
    title: "Open Doors: Arts Mansion",
    category: "Visual arts",
    venue: "Arts Mansion",
    date: "Wed 29 Jul 2026",
    time: "11:00–16:00",
    price: "Free",
    accessibility: "Limited step access",
    image: require("../../assets/artspace/gallery-community.jpg"),
    tint: "#FFE800",
  },
  {
    id: "making-space",
    title: "Gallery Talk: Making Space",
    category: "Talks & workshops",
    venue: "The Vestibules",
    date: "Sun 2 Aug 2026",
    time: "14:00",
    price: "Free",
    accessibility: "Step-free access",
    image: require("../../assets/artspace/gallery-community.jpg"),
    tint: "#DB2F67",
  },
];

export const dates = [
  ["MON", "27", "JUL"],
  ["TUE", "28", "JUL"],
  ["WED", "29", "JUL"],
  ["THU", "30", "JUL"],
  ["FRI", "31", "JUL"],
  ["SAT", "1", "AUG"],
  ["SUN", "2", "AUG"],
] as const;
