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
  price: string;
  phoneNo: string;
}

export type BookingTicket = {
  event: EventCardProps;
}

export type CheckoutProps = {
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
  onFormSubmit: (formData: TicketBookingFormDataProps) => void;
}

export type TicketBookingFormDataProps = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export type AirportBookingData = {
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  numberOfPassengers: string;
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
};