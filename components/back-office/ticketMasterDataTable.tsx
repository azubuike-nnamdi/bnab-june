'use client';

import { DataTable } from "@/components/common/dataTable";
import useTicketMaster from "@/hooks/useTicketMaster";

export function TicketmasterDataTable() {
  const { isPending, data } = useTicketMaster();

  const headers = [
    "Full Name",
    "Email",
    "Phone Number",
    "Event Price",
    "Payment Status"
  ];

  // Define a function to map the ticket master data to the table format
  const mapTicketMasterData = (data: any[]) => {
    return data.map(ticket => ({
      "Full Name": `${ticket.firstName} ${ticket.lastName}`,
      "Email": ticket.email,
      "Phone Number": ticket.phoneNumber,
      "Event Price": ticket.event.price,
      "Payment Status": ticket.paymentStatus,
    }));
  };

  return (
    <main>
      <DataTable
        caption="Ticket Master Information"
        headers={headers}
        data={data?.data || []}
        isPending={isPending}
        mapData={mapTicketMasterData}
      />
    </main>
  );
}
