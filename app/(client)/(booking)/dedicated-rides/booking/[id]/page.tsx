import { BreadCrumb } from "@/components/common/breadcrumb";
import VehicleBooking from "@/components/dedicated-rides/vehicleBooking";
import { DEDICATED_RIDES_URL, HOME_URL } from "@/config/routes";
import { cars } from "@/lib/data/car-data";
import { ParamProps } from "@/types/declaration";

export default function page({ params }: Readonly<ParamProps>) {
  console.log('params', params);
  const car = cars.filter((elm) => elm.id == params.id)[0] || cars[0];

  const breadcrumbLink = [
    { id: 1, path: HOME_URL, text: "Home" },
    { id: 2, path: DEDICATED_RIDES_URL, text: "Dedicated Rides" },
    { id: 3, path: `/dedicated-rides/${params.id}`, text: "Dedicated Rides Booking" },
    {
      id: 4, path: `/dedicated-rides/booking/${params.id}`, text: "Rides Booking"
    }
  ]
  return (
    <main>
      <BreadCrumb title="Dedicated Rides Booking" links={breadcrumbLink} />
      Booking
    </main>
  )
}