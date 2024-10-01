'use client'
import SkeletonBookingTicketCard from "@/components/common/booking-card-skeleton";
import { BreadCrumb } from "@/components/common/breadcrumb";
import Faq from "@/components/common/faq";
import BookingTicketCard from "@/components/ticket-master/bookingTicketCard";
import useTicketMasterById from "@/hooks/useTicketMasterById";
import { ticketMasterBookingLink } from "@/lib/data/breadcrumb";
import { PageProps } from "@/types/declaration";


export default function Page({ params }: Readonly<PageProps>) {
  const id = params?.id

  // const event = eventData?.find((e) => e?.id === params?.id);
  const { data, isPending } = useTicketMasterById({ id });

  const event = data?.data?.ticket

  return (
    <main>
      <BreadCrumb title={"Ticket Booking"} links={ticketMasterBookingLink} />
      {isPending ? (
        <SkeletonBookingTicketCard />
      ) : (
        <BookingTicketCard event={event} />
      )}
      <Faq />
    </main>
  )
}