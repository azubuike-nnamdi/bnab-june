import TicketBookingTab from "@/components/ticket-master/ticketBookingTab";
import { eventData } from "@/lib/data/event-data";
import { PageProps } from "@/types/declaration";
import { redirect } from "next/navigation";

export default function page({ params }: PageProps) {
  const event = eventData.find((e) => e.id === params.id)

  if (!event) {
    redirect('/not-found');
  }
  return (
    <main>
      <TicketBookingTab event={event} />
    </main>
  )
}