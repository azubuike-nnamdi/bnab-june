import { Metadata } from "next";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AdminOverView from "@/components/back-office/overview";
import DedicatedRides from "@/components/back-office/dedicatedRides";
import AirportDataTable from "@/components/back-office/airportDataTable";
import AccommodationTable from "@/components/back-office/accommodationTable";
import { TicketmasterDataTable } from "@/components/back-office/ticketMasterDataTable";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Dashboard.",
};

export default function Page() {
  return (
    <div className="overflow-x-hidden flex-nowrap whitespace-nowrap flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="overflow-x-auto">
          <Tabs defaultValue="ticket-master" className="space-y-4">
            <TabsList>
              <TabsTrigger value="ticket-master">Ticket Master</TabsTrigger>
              <TabsTrigger value="airport">Airport Pickup & Drop-off</TabsTrigger>
              <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
              <TabsTrigger value="dedicated-rides">Dedicated Rides</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <AdminOverView />
            </TabsContent>
            <TabsContent value="ticket-master">
              <TicketmasterDataTable />
            </TabsContent>
            <TabsContent value="airport">
              <AirportDataTable />
            </TabsContent>
            <TabsContent value="accommodation">
              <AccommodationTable />
            </TabsContent>
            <TabsContent value="dedicated-rides">
              <DedicatedRides />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
