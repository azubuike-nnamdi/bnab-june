import { Home, Phone, Settings, User } from "lucide-react";

import { ABOUT_URL, ACCOMMODATION_URL, ADMINCONTACT_URL, AIRPORT_PICK_UP_DROP_OFF_URL, CONTACT_URL, CUSTOMER_URL, DASHBOARD_URL, DEDICATED_RIDES_URL, HOME_URL, SERVICES_URL, SETTING_URL, TICKET_MASTER_URL, TRAINING_URL } from "@/config/routes";

export const menuItems = [
  {
    id: 1,
    title: "Home",
    path: HOME_URL,
  },
  {
    id: 2,
    title: "Services",
    path: SERVICES_URL,
  },
  {
    id: 3,
    title: "About Us",
    path: ABOUT_URL,
  },
  {
    id: 4,
    title: "Booking",
    path: "#",
    subMenu: [
      {
        id: 41,
        title: "Ticket Master",
        path: TICKET_MASTER_URL,
      },
      {
        id: 42,
        title: "Airport Pickup & Dropoff",
        path: AIRPORT_PICK_UP_DROP_OFF_URL,
      },
      {
        id: 43,
        title: "Accommodation",
        path: ACCOMMODATION_URL,
      },
      { id: 44, title: "Dedicated Rides", path: DEDICATED_RIDES_URL },
      { id: 45, title: "Training", path: TRAINING_URL },
    ],
  },
  {
    id: 5,
    title: "Contact",
    path: CONTACT_URL,
  },
];

export const socialMediaPlatforms = [
  {
    id: 1,
    name: "Facebook",
    img: "/img/facebook.png",
    href: "#",
  },
  { id: 2, name: "Twitter", img: '/img/twitter.png', href: "#" },
  {
    id: 3,
    name: "Instagram",
    img: "/img/facebook.png",
    href: "#",
  },
  {
    id: 4,
    name: "LinkedIn",
    img: "/img/linkedin.png",
    href: "#",
  },
];

export const links1 = [
  { id: 1, text: "Home", href: HOME_URL },
  { id: 2, text: "About us", href: ABOUT_URL },
  // { id: 3, text: "Newsroom", href: "#blog-grid" },
  { id: 3, text: "Contact", href: CONTACT_URL },
  { id: 4, text: "Services", href: SERVICES_URL },
  // { id: 6, text: "Blog", href: "#blog-grid" },
  // { id: 7, text: "Gift cards", href: "#" },
];
export const links2 = [
  { id: 1, name: "Accra", href: "#" },
  { id: 2, name: "Kumasi", href: "#" },
  { id: 3, name: "Tamale", href: "#" },
  { id: 4, name: "Tema", href: "#" },
  // { id: 5, name: "Achimota", href: "#" },
];
export const links3 = [
  { id: 1, name: "Airport Pickup & Dropoff", href: AIRPORT_PICK_UP_DROP_OFF_URL },
  { id: 2, name: "Accommodation", href: ACCOMMODATION_URL },
  { id: 3, name: "Dedicated Rides", href: DEDICATED_RIDES_URL },
  { id: 4, name: "Ticket Master", href: TICKET_MASTER_URL },
  { id: 5, name: "Training", href: TRAINING_URL },
  // { id: 6, name: "Airport transfer", href: "#" },
];
export const links4 = [
  { id: 1, name: "Saloon", href: "#" },
  { id: 2, name: "SUV", href: "#" },
  { id: 3, name: "Coach", href: "#" },
  { id: 4, name: "Mini Bus", href: "#" },
];
export const legalLinks = [
  { id: 1, name: "Terms", href: "#about" },
  { id: 2, name: "Privacy policy", href: "#about" },
  { id: 3, name: "Legal notice", href: "#about" },
  { id: 4, name: "Accessibility", href: "#about" },
];


export const ticketmaster = [
  {
    id: 1,
    url: "https://bnab-june.s3.amazonaws.com/img/transfer-2.png",
    // title: "Embark on an Unforgettable Journey",
    text: "Live the Moment",
  },
  {
    id: 2,
    url: "https://bnab-june.s3.amazonaws.com/img/event-2.png",
    // title: "Adventure Awaits",
    text: "Unforgettable Moments",
  },
  {
    id: 3,
    url: "https://bnab-june.s3.amazonaws.com/img/event-6.png",
    // title: "Luxury Redefined",
    text: "Experience the Magic Live",
  },
  {
    id: 4,
    url: "https://bnab-june.s3.amazonaws.com/img/event-4.png",
    // title: "Serenity at Its Best",
    text: "Create Memories Together",
  },
  {
    id: 5,
    url: "https://bnab-june.s3.amazonaws.com/img/event-5.png",
    // title: "Taste the Adventure",
    text: "Unleash the Excitement",
  },
];

export const airport = [
  {
    id: 1,
    url: "https://bnab-june.s3.amazonaws.com/img/airport1.png",
    // title: "BANNER 2",
    text: "A Stress-free Journey",
  },
  {
    id: 2,
    url: "https://bnab-june.s3.amazonaws.com/img/airportpick-2.png",
    // title: "BANNER 2",
    text: "We Get You There",
  },
  {
    id: 3,
    url: "https://bnab-june.s3.amazonaws.com/img/airportpick-3.png",
    // title: "BANNER 2",
    text: "Convenience at Your Fingertips",
  },
  {
    id: 4,
    url: "https://bnab-june.s3.amazonaws.com/img/airportpick-4.png",
    // title: "BANNER 2",
    text: "Airport Pickup & Drop-off",
  },
  {
    id: 5,
    url: "https://bnab-june.s3.amazonaws.com/img/port-6.png",
    // title: "BANNER 2",
    text: "Your Ride Awaits",
  },
];

export const accommodation = [
  {
    id: 1,
    url: "https://bnab-june.s3.amazonaws.com/img/room-1.png",
    // title: "BANNER 3",
    text: "Experience True Hospitality",
  },
  {
    id: 2,
    url: "https://bnab-june.s3.amazonaws.com/img/accommodate-2.png",
    // title: "BANNER 3",
    text: "Discover Comfort",
  },
  {
    id: 3,
    url: "https://bnab-june.s3.amazonaws.com/img/accommodation3.png",
    // title: "BANNER 3",
    text: "Perfect Place to Rest",
  },
  {
    id: 4,
    url: "https://bnab-june.s3.amazonaws.com/img/accommodation4.png",
    // title: "BANNER 3",
    text: "Comfortable Rooms",
  },
  {
    id: 5,
    url: "https://bnab-june.s3.amazonaws.com/img/room-5.png",
    // title: "BANNER 3",
    text: "Peace and Relaxation",
  },
];

export const training = [
  {
    id: 1,
    url: "https://bnab-june.s3.amazonaws.com/img/skills-1.png",
    // title: "BANNER 4",
    text: "Master New Skills",
  },
  {
    id: 2,
    url: "https://bnab-june.s3.amazonaws.com/img/skills-6.png",
    // title: "BANNER 4",
    text: "Unlock Your Potential",
  },
  {
    id: 3,
    url: "https://bnab-june.s3.amazonaws.com/img/skills-3.png",
    // title: "BANNER 4",
    text: "Specialized Training",
  },
  {
    id: 4,
    url: "https://bnab-june.s3.amazonaws.com/img/skills-7.png",
    // title: "BANNER 4",
    text: "Become Your Best",
  },
  {
    id: 5,
    url: "https://bnab-june.s3.amazonaws.com/img/skills-5.png",
    // title: "BANNER 4",
    text: "Skill Development",
  },
];

export const transport = [
  {
    id: 1,
    url: "https://bnab-june.s3.amazonaws.com/img/portservice-7.png",
    // title: "BANNER 5",
    text: "Get There with Ease",
  },
  {
    id: 2,
    url: "https://bnab-june.s3.amazonaws.com/img/portservice-8.png",
    // title: "BANNER 5",
    text: "Wherever You Need to Go",
  },
  {
    id: 3,
    url: "https://bnab-june.s3.amazonaws.com/img/transfer-3.png",
    // title: "BANNER 5",
    text: "Transport Transfer",
  },
  {
    id: 4,
    url: "https://bnab-june.s3.amazonaws.com/img/transfer-4.png",
    // title: "BANNER 5",
    text: "Travel Without Worries",
  },
  {
    id: 5,
    url: "https://bnab-june.s3.amazonaws.com/img/portservice-9.png",
    // title: "BANNER 5",
    text: "Effortless Travel",
  },
];

export const tabs = [
  { name: "Ticket Master", banners: ticketmaster },
  { name: "Airport Pickup & Dropoff", banners: airport },
  { name: "Accommodation", banners: accommodation },
  { name: "⁠Dedicated Rides", banners: transport },
  { name: "Training", banners: training },
];



export const BackOfficeNavItem = [
  {
    id: 1,
    href: DASHBOARD_URL,
    icon: Home,
    tooltip: "Dashboard",
    title: 'Dashboard'
  },
  // {
  //   id: 2,
  //   href: CUSTOMER_URL,
  //   icon: User,
  //   tooltip: "Customers",
  //   title: 'Customers'
  // },
  {
    id: 2,
    href: ADMINCONTACT_URL,
    icon: Phone,
    tooltip: "Contact",
    title: 'Contact'
  },
  // {
  //   id: 4,
  //   href: SETTING_URL,
  //   icon: Settings,
  //   tooltip: "Settings",
  //   title: 'Settings'
  // },
];