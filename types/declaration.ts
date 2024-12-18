import { TransportOptions } from "nodemailer";

export type TransactionIdParams = {
  entropy: 'alphabet' | 'alphanumeric' | 'numeric'
  len: number
}

type BreadcrumbLink = {
  id: number;
  path: string;
  text: string;
}

export type BreadCrumbProps = {
  title: string
  links: BreadcrumbLink[]
}


export type ServiceItem = {
  id: number;
  title: string;
  description: string;
  image: string;
}

export type ExpandedState = {
  [key: string]: boolean;
};

export type PageProps = {
  params: {
    id: string;
  };
}
export type CheckoutPageProps = {
  params: {
    id: TransactionType;
  };
}
export type ParamProps = {
  params: {
    id: number
  }
}


export type EventCardProps = {
  _id: string;
  title: string;
  description: string;
  address: string;
  image: string;
  city: string;
  date: string;
  time: string;
  price?: string;
  phoneNumber: string;
}

export type TicketProps = {

  id: number;
  name: string;
  quantity: number;
  max_per_ticket: number;
  stop_sales: boolean;
  price: string;
  real_price: string;
  fee: number;
  insurance_fee: number;

}
export type EventsProps = {
  id: number;
  name: string;
  truncated_name: string;
  category_name: string;
  date_status: string;
  city: string;
  country_name: string;
  currency: string;
  text_description: string;
  venue_name: string;
  address: string;
  longitude: number;
  latitude: number;
  slug: string;
  ussd_code: string;
  friendly_price: string;
  base_url: string;
  startdate: string;
  enddate: string;
  banner_photo: {
    url: string;
    social: { url: string };
    portrait_thumb: { url: string };
    micro_blurred: { url: string };
    thumb: { url: string };
    cover_art_thumb: { url: string };
    mobile: { url: string };
    square_thumb: { url: string };
    blurred: { url: string };
  };
  organizer_name: string;
  organizer_email: string;
  organizer_phone: string;
  organizer_logo: {
    url: string;
    thumb: { url: string };
  };
  tickets: {
    id: number;
    name: string;
    quantity: number;
    max_per_ticket: number;
    stop_sales: boolean;
    price: string;
    real_price: string;
    fee: number;
    insurance_fee: number;
  }[];
}
export type BookingTicket = {
  event: EventsProps;
}

export type CheckoutProps = {
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
  onFormDataChange: (updatedData: Partial<TicketBookingFormDataProps>) => void;
  onFormSubmit: (formData: TicketBookingFormDataProps) => void;
  ticketOptions: TicketProps[]
}

export type TicketEvent = {
  id: string;
  price?: string;
  title: string;
  desc: string;
  venue: string;
  img: string;
  city: string;
  date: string;
  time: string;
  phoneNo: string;
}

export type TicketBookingProps = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  event: string;
  paymentStatus: "not paid" | "paid";
  createdAt: Date;
  updatedAt: Date;
  isBookingForSelf: boolean;
  forBookingFirstName?: string;
  forBookingLastName?: string;
  forBookingEmail?: string;
  forBookingPhoneNumber?: string;
}
export type TicketBookingFormDataProps = {
  transactionId: string;
  id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  event?: EventsProps
  transID?: string;
  ticketType?: string;
  price: string;
  isBookingForSelf: boolean;
  forBookingFirstName?: string;
  forBookingLastName?: string;
  forBookingEmail?: string;
  forBookingPhoneNumber?: string
  paymentStatus?: string;
  createdAt?: Date;
  updatedAt?: Date;
  bookingType: string;
  budget: string;
  quantity: number;
  ticketId?: number
}

export type AirportBookingData = {
  transactionId: string
  firstName: string;
  lastName: string;
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  phoneNumber: string;
  email: string;
  airlineName: string;
  timeOfArrival: string;
  numberOfPassengers: string;
  additionalNote: string;
  isBookingForSelf: boolean;
  forBookingFirstName?: string,
  forBookingLastName?: string;
  forBookingEmail?: string;
  forBookingPhoneNumber?: string;
  bookingType: string;
  budget: string;
}

export type AccommodationBookingType = {
  transactionId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  budget: string;
  accommodationType: string;
  dateOfArrival: string;
  timeOfArrival: string;
  departureDate: string;
  numberOfDays: number;
  additionalInfo?: string;
  isBookingForSelf: boolean;
  forBookingFirstName?: string,
  forBookingLastName?: string;
  forBookingEmail?: string;
  bookingType: string;
  forBookingPhoneNumber?: string;
}

export type Car = {
  id: number;
  imgSrc: string;
  title: string;
  description: string;
  passenger: number;
  luggage: number;
  // price: number;
  carType: string;
  brand: string;
  amt: string;
  duration: string;
};

export type DedicatedRidesBooking = {
  transactionId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  pickUpLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  dropOffLocation: string;
  dropOffDate: string;
  dropOffTime: string;
  numberOfPassengers: string;
  additionalInfo?: string;
  vehicleType: string;
  price: string;
  numberOfDays: string;
  isBookingForSelf: boolean;
  bookingForName?: string;
  bookingForPhone?: string;
  paymentStatus?: string;
  bookingForFirstName?: string;
  bookingForLastName?: string;
  bookingForEmail?: string;
  bookingForPhoneNumber?: string;
  totalAmount: number,
  bookingType: string;
  budget: number;
  createdAt: string;
}
export type DedicatedRideBookingProps = {
  transactionId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  pickUpLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  dropOffLocation: string;
  dropOffDate: string;
  dropOffTime: string;
  numberOfPassengers: string;
  additionalInfo: string;
  vehicleType: string;
  price: string;
  numberOfDays: string;
  isBookingForSelf: boolean;
  bookingForFirstName: string;
  bookingForLastName: string;
  bookingForEmail: string;
  bookingForPhoneNumber: string;
  totalAmount: number,
  bookingType: string;
  budget: number;
};

export type SendEmailOptions = {
  to: string;
  subject: string;
  text: string;
}

export type ContactType = {
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

export type SingleServiceProps = {
  subTitle1?: string;
  paragraph1?: string;
  image1?: string;
  subTitle2?: string;
  paragraph2?: string;
  subTitle3?: string;
  paragraph3?: string;
  image2?: string;
}

// Define a common interface for the basic service structure
export interface BaseService {
  id: number;
  title: string;
  description: string;
  image: string;
}

// Extend the BaseService for more detailed services
export interface DetailedService extends BaseService {
  subTitle1?: string;
  paragraph1?: string;
  image1?: string;
  subTitle2?: string;
  paragraph2?: string;
  subTitle3?: string;
  paragraph3?: string;
  image2?: string;
  alt?: string; // for services4
}

// For the services array
export interface Services extends DetailedService { }

// For the services2 array
export interface SimpleService {
  id: number;
  text: string;
}

// For services4 and services5
export interface ServiceWithAlt extends DetailedService {
  alt?: string;
}

// Type for allServices, which includes a mix of different service types
export type AllServices = Services | ServiceWithAlt;


export type Contact = {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
  createdAt: string;
  createdDate?: string;
  createdTime?: string;
}

export interface PaymentMethodProps {
  onPaymentSelect: (method: string) => void;
  formData: TicketBookingFormDataProps | DedicatedRideBookingProps;
  paymentMethod: string;
  transactionType: TransactionType;
  goToPreviousTab?: () => void;
}

export type PaymentMethodOption = {
  id: number;
  method: string;
  icon: React.ReactNode;
};


// Union type that includes all booking data types
export type CheckoutData = AirportBookingData | AccommodationBookingType;

export type CheckoutContextType = {
  checkout: CheckoutData | null;
  setCheckout: (data: CheckoutData) => void;
};

// Define the transaction types and their corresponding hooks and data types
export type TransactionType = "airportBooking" | "accommodation" | "booking" | "ticket";

// This utility type maps transaction types to their corresponding data types
export type TransactionDataMap = {
  airportBooking: AirportBookingData;
  accommodation: AccommodationBookingType;
  booking: DedicatedRideBookingProps
  ticket: TicketBookingFormDataProps
};

export interface TransactionData {
  transactionId: string;
  firstName: string;
  lastName: string;
  bookingType: string;
  email: string;
  phoneNumber: string;
  budget: number;
}

export interface Event {
  title: string;
  description: string;
  address: string;
  date: string; // ISO date string (e.g., '2024-01-01')
  time: string; // Time string (e.g., '12:00')
  file: string | null; // This could be a URL or file path after uploading
  createdAt: Date;
  updateAt: Date;
  noOfTicket: number;
}


export interface CreateRide {
  title: string;
  description: string;
  passenger: string;
  luggage: string;
  file: string | null;
  createdAt: Date;
  updateAt: Date;
}

export type TransStatus = "success" | "failure" | "pending"

export type ThankYouPropType = {
  // status: string;
  reference: string;
}



export type RegisterProps = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}


export interface ExtendedTransportOptions extends TransportOptions {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

// Define the type for OTP verification payload
export type VerifyOtpType = {
  email: string;
  otp: string;
}

export type ForgotPasswordType = {
  email: string;
}

export type ResetPasswordPropType = {
  password: string;
  confirmPassword: string;
  token: string;
}

export type Payment = {
  transactionId: string;
  firstName: string;
  lastName: string;
  bookingType: string;
  email: string;
  phoneNumber: string;
  budget: number;
  transaction_status: string;
  createdAt: Date;
  count: number;
  price?: string;
  quantity?: number;
  ticketType?: string;
  ticketId?: number;
  event?: any; // Make event optional and of type 'any' for flexibility
}


export type EventTicket = {
  id?: string;
  _id: string;
  title: string;
  description: string;
  address: string;
  date: string;
  time: string;
  phoneNumber: string;
  price: number;
  noOfTickets: number;
  createdAt: string;
  updatedAt: string;
};



export interface TransactionEmailData {
  email: string;
  status: string;
  amount: number;
  currency: string;
  paid_at: string;
  channel: string;
  reference: string;
}


export type ZoneCreationType = {
  range: string
  cost: string
  zone: string
}

export type Suggestion = {
  place_id: string;
  description: string;
}


export type Ticket = {
  ticket_id: string;
  quantity: number;
}

export type TicketRequestBody = {
  tickets: Ticket[];
}

export type BuyEventTicket = {
  customer_name: string;
  customer_mobile: string;
  thirdparty_txid: string;
  tickets: Ticket[];
}