'use client'

import SkeletonBookingTicketCard from "@/components/common/booking-card-skeleton";
import TicketBookingTab from "@/components/ticket-master/ticketBookingTab";
import useTicketMasterById from "@/hooks/useTicketMasterById";
import { PageProps } from "@/types/declaration";
export default function Page({ params }: Readonly<PageProps>) {
  const id = params?.id

  const { data, isPending } = useTicketMasterById({ id });

  const event = data?.data?.ticket
  return (
    <main>
      {isPending ? <SkeletonBookingTicketCard /> : (
        <TicketBookingTab event={event} />
      )}
    </main>
  )
}