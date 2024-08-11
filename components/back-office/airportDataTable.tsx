'use client';


import useAirport from "@/hooks/useAirport"
import { DataTable } from "../common/dataTable";

export default function AirportDataTable() {

  const { isPending, data } = useAirport();
  const airportData = data?.data || []

  const headers = [
    "Phone Number",
    "Pick Up Address",
    "Pick Up Time",
    "Pick Up Date",
    "Drop Off Address",
    "Passenger",
    "Status",
  ];

  const mappedAirportData = (data: any[]) => {
    return data.map(airport => ({
      "Phone Number": airport.phoneNumber,
      "Pick Up Address": airport.pickUpLocation,
      "Pick Up Time": airport.pickUpTime,
      "Pick Up Date": airport.pickUpDate,
      "Drop Off Address": airport.dropOffLocation,
      "Passenger": airport.numberOfPassengers,
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