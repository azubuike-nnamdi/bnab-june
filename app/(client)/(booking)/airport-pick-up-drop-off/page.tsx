import AirportCard from "@/components/airport/airportCard";
import { BreadCrumb } from "@/components/common/breadcrumb";
import Faq from "@/components/common/faq";
import { airportLink } from "@/lib/data/breadcrumb";

export default function page() {
  return (
    <main>
      <BreadCrumb title="Airport Pickup & Dropoff" links={airportLink} />
      <AirportCard />
      <Faq />
    </main>
  )
}