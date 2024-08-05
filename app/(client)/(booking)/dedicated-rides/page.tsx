import { BreadCrumb } from "@/components/common/breadcrumb";
import PickUpVehicles from "@/components/dedicated-rides/pickupVehicles";
import { dedicatedRidesLink } from "@/lib/data/breadcrumb";

export default function page() {
  return (
    <main>
      <BreadCrumb title="Dedicated Rides" links={dedicatedRidesLink} />
      <PickUpVehicles />
    </main>
  )
}