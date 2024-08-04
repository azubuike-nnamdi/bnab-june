import { BreadCrumb } from "@/components/common/breadcrumb";
import { airportBookingLink } from "@/lib/data/breadcrumb";

export default function page() {
  return (
    <main className="">
      <BreadCrumb title="Airport Pickup & Dropoff Booking" links={airportBookingLink} />
    </main>
  )
}