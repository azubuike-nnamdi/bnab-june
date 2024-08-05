import AirportBooking from "@/components/airport/airportBooking";
import { BreadCrumb } from "@/components/common/breadcrumb";
import Faq from "@/components/common/faq";
import { airportBookingLink } from "@/lib/data/breadcrumb";

export default function page() {
  return (
    <main className="">
      <BreadCrumb title="Airport Pickup & Dropoff Booking" links={airportBookingLink} />
      <AirportBooking />
      <Faq />
    </main>
  )
}