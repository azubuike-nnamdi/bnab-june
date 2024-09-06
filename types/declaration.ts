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
  id: string;
  title: string;
  desc: string;
  venue: string;
  img: string;
  city: string;
  date: string;
  time: string;
  price?: number;
  phoneNo: string;
}

export type BookingTicket = {
  event: EventCardProps;
}

export type CheckoutProps = {
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
  onFormDataChange: (updatedData: Partial<TicketBookingFormDataProps>) => void;
  onFormSubmit: (formData: TicketBookingFormDataProps) => void;
}

export type TicketEvent = {
  id: string;
  price?: number;
  title: string;
  desc: string;
  venue: string;
  img: string;
  city: string;
  date: string;
  time: string;
  phoneNo: string;
}
export type TicketBookingFormDataProps = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  event?: TicketEvent
  transID?: string;
  ticketType?: string;
  price?: number
  isBookingForSelf: boolean;
  personName: string;
  personPhoneNumber: string
}

export type AirportBookingData = {
  fullName: string;
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  phoneNumber: string;
  email: string;
  numberOfPassengers: string;
  additionalNote: string;
  isBookingForSelf: boolean;
  personName: string | undefined;
  personPhoneNumber: string | undefined
}

export type AccommodationBookingType = {
  name: string;
  email: string;
  phoneNumber: string;
  budget: string;
  dateOfArrival: string;
  timeOfArrival: string;
  additionalInfo?: string;
  isBookingSelf: boolean;
  personName: string;
  personPhoneNumber: string;
}

export type Car = {
  id: number;
  imgSrc: string;
  title: string;
  description: string;
  passenger: number;
  luggage: number;
  price: number;
  carType: string;
  brand: string;
  amt: string;
  duration: string;
};

export type DedicatedRideBookingProps = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  pickUpLocation?: string;
  pickUpDate?: string;
  pickUpTime?: string;
  dropOffLocation?: string;
  dropOffDate?: string;
  dropOffTime?: string;
  numberOfPassengers?: string;
  additionalInfo?: string;
  vehicleType?: string;
  price?: number;
  isBookingForSelf: boolean;
  bookingForName: string;
  bookingForPhone: string;
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