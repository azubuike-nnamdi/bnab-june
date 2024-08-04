import { BreadCrumb } from "@/components/common/breadcrumb";
import Faq from "@/components/common/faq";
import BookingTicketCard from "@/components/ticket-master/bookingTicketCard";
import { ticketMasterBookingLink } from "@/lib/data/breadcrumb";
import { eventData } from "@/lib/data/event-data";
import { PageProps } from "@/types/declaration";
import { redirect } from "next/navigation";

export default function page({ params }: PageProps) {
  const event = eventData?.find((e) => e?.id === params?.id);

  // Handle case where event is undefined
  if (!event) {
    redirect('/not-found');
  }
  return (
    <main>
      <BreadCrumb title={"Ticket Booking"} links={ticketMasterBookingLink} />
      <BookingTicketCard event={event} />
      <Faq />
    </main>
  )
}