import AccommodationBookingForm from "@/components/accommodation/accommodationForm";
import { BreadCrumb } from "@/components/common/breadcrumb";
import { accommodationLink } from "@/lib/data/breadcrumb";

export default function page() {
  return (
    <main>
      <BreadCrumb title="Accommodation" links={accommodationLink} />
      <AccommodationBookingForm />
    </main>
  )
}