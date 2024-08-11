'use client'

import useAccommodation from "@/hooks/useAccommodation"
import { DataTable } from "../common/dataTable";

export default function AccommodationTable() {

  const { isPending, data } = useAccommodation();

  const accommodationData = data?.data || []

  const headers = [
    "Full Name",
    "Email",
    "Phone Number",
    "Budget",
    "Arrival Date",
    "Arrival Time",
    "Status",
  ];

  const mappedAccommodationData = (data: any[]) => {
    return data.map(accommodation => ({
      "Full Name": accommodation.name,
      "Email": accommodation.email,
      "Phone Number": accommodation.phoneNumber,
      "Budget": accommodation.budget,
      "Arrival Date": accommodation.dateOfArrival,
      "Arrival Time": accommodation.timeOfArrival,
      "Status": accommodation.paymentStatus,
    }));
  };

  return (
    <DataTable
      caption="Accommodation Details"
      headers={headers}
      data={accommodationData}
      isPending={isPending}
      mapData={mappedAccommodationData}
    />
  )
}