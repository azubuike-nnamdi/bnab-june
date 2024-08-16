'use client';


import useAirport from "@/hooks/useAirport"
import { DataTable } from "../common/dataTable";

export default function AirportDataTable() {

  const { isPending, data } = useAirport();
  const airportData = data?.data || []

  const headers = [
    "Full Name",
    "Contact",
    // "Pick Up Address",
    "Email",
    "Pick Up Date",
    "Drop Off Address",
    "Passenger",
    "Note",
    "Status",
  ];

  const mappedAirportData = (data: any[]) => {
    return data.map(airport => ({
      "Full Name": airport.fullName,
      "Contact": airport.phoneNumber,
      "Email": airport.email,
      // "Pick Up Address": airport.pickUpLocation,
      "Pick Up Date": ` ${airport.pickUpDate} ${airport.pickUpTime} `,
      "Drop Off Address": airport.dropOffLocation,
      "Passenger": airport.numberOfPassengers,
      "Note": airport.additionalNote,
      "Status": airport.paymentStatus,
    }));
  };

  return (
    <main>
      <DataTable
        caption="Airport Pick Up & Drop Off"
        headers={headers}
        data={airportData}
        isPending={isPending}
        mapData={mappedAirportData}
      />
    </main>
  )
}