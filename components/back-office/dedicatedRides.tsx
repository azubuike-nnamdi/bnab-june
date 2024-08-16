'use client';

import useBookings from "@/hooks/useBookings"
import { DataTable } from "../common/dataTable";

export default function DedicatedRides() {

  const { isPending, data } = useBookings();
  const bookingsData = data?.data || []

  console.log(bookingsData)
  //heading
  const headers = [
    "Full Name",
    "Email",
    "Contact",
    "Date",
    "Address",
    "Drop-off Location",
    "Passengers",
    "Status"
  ]

  const mappedBookingData = (data: any[]) => {
    return data.map(booking => ({
      "Full Name": `${booking.firstName} ${booking.lastName}`,
      "Email": booking.email,
      "Contact": booking.phoneNumber,
      "Date": `${booking.pickUpDate}`,
      "Address": booking.pickUpLocation,
      "Drop-off Address": booking.dropOffLocation,
      "Passengers": booking.numberOfPassengers,
      "Status": booking.paymentStatus,
    }));
  };
  return (
    <main>
      <DataTable
        caption="Ticket Master Information"
        headers={headers}
        data={bookingsData}
        isPending={isPending}
        mapData={mappedBookingData}
      />
    </main>
  )
}