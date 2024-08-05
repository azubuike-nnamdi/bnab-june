import { ABOUT_URL, ACCOMMODATION_URL, AIRPORT_PICK_UP_DROP_OFF_BOOKING_URL, AIRPORT_PICK_UP_DROP_OFF_URL, CONTACT_URL, DEDICATED_RIDES_URL, HOME_URL, SERVICES_URL, TICKET_MASTER_URL, TRAINING_URL } from "@/config/routes"

export const servicesLink = [
  {
    id: 1,
    path: HOME_URL,
    text: 'Home'
  },
  {
    id: 2,
    path: SERVICES_URL,
    text: 'Services'
  }
]

export const aboutLink = [
  {
    id: 1,
    path: HOME_URL,
    text: 'Home'
  },
  {
    id: 2,
    path: ABOUT_URL,
    text: 'About Us'
  }
]

export const contactLink = [
  {
    id: 1,
    path: HOME_URL,
    text: 'Home'
  },
  {
    id: 2,
    path: CONTACT_URL,
    text: "Contact Us"
  }
]

export const ticketMasterLink = [
  {
    id: 1,
    path: HOME_URL,
    text: 'Home'
  },
  {
    id: 2,
    path: TICKET_MASTER_URL,
    text: "Ticket Master"
  }
]

export const ticketMasterBookingLink = [
  {
    id: 1,
    path: HOME_URL,
    text: 'Home'
  },
  {
    id: 2,
    path: TICKET_MASTER_URL,
    text: "Ticket Master"
  },
  {
    id: 3,
    path: TICKET_MASTER_URL,
    text: 'Ticket Booking'
  }
]

export const airportLink = [
  {
    id: 1,
    path: HOME_URL,
    text: 'Home'
  },
  {
    id: 2,
    path: AIRPORT_PICK_UP_DROP_OFF_URL,
    text: 'Airport Pick-up & Drop-off'
  }
]

export const airportBookingLink = [
  { id: 1, path: HOME_URL, text: 'Home' },
  { id: 2, path: AIRPORT_PICK_UP_DROP_OFF_URL, text: 'Airport Pick Up & Drop Off' },
  { id: 3, path: AIRPORT_PICK_UP_DROP_OFF_BOOKING_URL, text: 'Airport Pick Up & Drop Off Booking' },
]

export const dedicatedRidesLink = [
  { id: 1, path: HOME_URL, text: "Home" },
  { id: 2, path: DEDICATED_RIDES_URL, text: 'Dedicated Rides' }
]


export const accommodationLink = [
  { id: 1, path: HOME_URL, text: 'Home' },
  { id: 2, path: ACCOMMODATION_URL, text: 'Accommodation' },
]

export const trainingLink = [
  { id: 1, path: HOME_URL, text: 'Home' },
  { id: 2, path: TRAINING_URL, text: 'Training' }
]