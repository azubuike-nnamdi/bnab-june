import { BreadCrumb } from "@/components/common/breadcrumb";
import Faq from "@/components/common/faq";
import EventCard from "@/components/ticket-master/eventCard";
import { ticketMasterLink } from "@/lib/data/breadcrumb";

export default function page() {
  return (
    <main>
      <BreadCrumb title="Ticket Master" links={ticketMasterLink} />
      <EventCard />
      <Faq />
    </main>
  )
}