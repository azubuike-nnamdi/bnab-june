'use client';

import CreateEventForm from "@/components/back-office/dashboard/bookings/createEventForm";
import CreateRideForm from "@/components/back-office/dashboard/bookings/createRideForm";
import { DataTable } from "@/components/common/dataTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetAllTicketEvents from "@/hooks/useGetAllTicketEvent";
import { truncateString } from "@/lib/helper";
import { useState } from "react";

export default function Page() {
  const [isViewingData, setIsViewingData] = useState(false);
  const { data, isPending } = useGetAllTicketEvents();

  const toggleView = () => {
    setIsViewingData(!isViewingData);
  };

  const ticketData = data?.data?.events ?? [];
  const headers = [
    "Title",
    "Description",
    "Address",
    "Phone Number",
    "Price",
    "Date & Time",
    "Slots",
  ];

  const mappedTicketData = (data: any[]) => {
    return data?.map(ticket => ({
      "Title": ticket?.title,
      "Description": truncateString(ticket?.description, 20),
      "Address": truncateString(ticket?.address, 10),
      "Phone Number": ticket?.phoneNumber,
      "Price": ticket?.price,
      "Date & Time": `${ticket?.date} ${ticket?.time}`,
      "Slots": ticket?.noOfTickets,

    }));
  };
  return (
    <div className="overflow-x-hidden flex-nowrap whitespace-nowrap flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            {isViewingData ? "View Details" : "Create Bookings"}
          </h2>
          <Button
            onClick={toggleView}
            className="text-white"
          >
            {isViewingData ? "Create Booking +" : "View Details"}
          </Button>
        </div>
        <div className="overflow-x-auto">
          {!isViewingData && (
            <Tabs defaultValue="ticket-master" className="space-y-4">
              <TabsList className="grid w-[400px] grid-cols-2">
                <TabsTrigger value="ticket-master">Ticket Master</TabsTrigger>
                <TabsTrigger value="dedicated-rides">Dedicated Rides</TabsTrigger>
              </TabsList>
              <TabsContent value="ticket-master" className="space-y-4">
                <CreateEventForm />
              </TabsContent>
              <TabsContent value="dedicated-rides">
                <CreateRideForm />
              </TabsContent>
            </Tabs>
          )}
          {isViewingData && (
            <Tabs defaultValue="view-ticket-master" className="space-y-4">
              <TabsList className="grid w-[400px]">
                <TabsTrigger value="view-ticket-master">Ticket Master</TabsTrigger>
              </TabsList>
              <TabsContent value="view-ticket-master" className="space-y-4">
                <DataTable
                  caption="All Ticket Record"
                  headers={headers}
                  data={ticketData}
                  isPending={isPending}
                  mapData={mappedTicketData}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  )
}