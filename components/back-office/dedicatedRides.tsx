'use client';

import useBookings from "@/hooks/useBookings"
import { DataTable } from "../common/dataTable";

export default function DedicatedRides() {

  const { isPending, data } = useBookings();
  const bookingsData = data?.data || []

  //heading
  const headers = [
    "Full Name",
    "Email",
    "Phone Number",
    "Time",
    "Address",
    "Drop Off Location",
    "Passengers",
    "Status"
  ]

  const mappedBookingData = (data: any[]) => {
    return data.map(booking => ({
      "Full Name": `${booking.firstName} ${booking.lastName}`,
      "Email": booking.email,
      "Phone Number": booking.phoneNumber,
      "Time": booking.pickUpDate,
      "Address": booking.pickUpLocation,
      "Drop Off Address": booking.dropOffLocation,
      "Passengers": booking.numberOfPassengers,
      "Status": booking.paymentStatus,
    }));
  };
  return (
    <main>
      <DataTable
        caption="Ticket Master Information"
        headers={headers}
        data={data?.data || []}
        isPending={isPending}
        mapData={mappedBookingData}
      />
    </main>
  )
}