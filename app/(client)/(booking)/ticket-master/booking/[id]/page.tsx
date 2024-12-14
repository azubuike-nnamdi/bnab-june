'use client'

import SkeletonBookingTicketCard from "@/components/common/booking-card-skeleton";
import TicketBookingTab from "@/components/ticket-master/ticketBookingTab";
import useGetEventById from "@/hooks/useGetEventsById";
import useTicketMasterById from "@/hooks/useTicketMasterById";
import { PageProps } from "@/types/declaration";
export default function Page({ params }: Readonly<PageProps>) {
  const id = params?.id

  // const { data, isPending } = useTicketMasterById({ id });

  // const event = data?.data?.ticket
  const { data: singleEvent, isPending, error } = useGetEventById(id);

  // const event = data?.data?.ticket
  const event = singleEvent?.data
  return (
    <main>
      {isPending ? <SkeletonBookingTicketCard /> : (
        <TicketBookingTab event={event} />
      )}
    </main>
  )
}