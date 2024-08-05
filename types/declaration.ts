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