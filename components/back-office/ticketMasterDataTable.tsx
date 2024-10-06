'use client';

import { DataTable } from "@/components/common/dataTable";
import useTicketMaster from "@/hooks/useTicketMaster";

export function TicketmasterDataTable() {
  const { isPending, data } = useTicketMaster();
  const ticketData = data?.data ?? [];

  const headers = [
    "Full Name",
    "Email",
    "Contact",
    "Cost",
    "Event Title",
    "Timestamp",
    "Status"
  ];

  // Define a function to map the ticket master data to the table format
  const mapTicketMasterData = (data: any[]) => {
    return data?.map(ticket => ({
      "Full Name": `${ticket.firstName} ${ticket.lastName}`,
      "Email": ticket.email,
      "Contact": ticket.phoneNumber,
      "Cost": ticket.event.price,
      "Event Title": ticket.event.title,
      "Timestamp": `${ticket.event.date} ${ticket.event.time}`,
      "Status": ticket.paymentStatus,
    }));
  };

  return (
    <main>
      <DataTable
        caption="Ticket Master Information"
        headers={headers}
        data={ticketData}
        isPending={isPending}
        mapData={mapTicketMasterData}
      />
    </main>
  );
}
