import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/back-office/dashboard/overview"
import { RecentSales } from "@/components/back-office/dashboard/recent-sales"
import { TicketmasterDataTable } from "@/components/back-office/ticketMasterDataTable"
import AdminOverView from "@/components/back-office/overview"
import DedicatedRides from "@/components/back-office/dedicatedRides"
import AirportDataTable from "@/components/back-office/airportDataTable"
import AccommodationTable from "@/components/back-office/accommodationTable"


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Dashboard.",
}

export default function page() {
  return (
    <div className="overflow-x-hidden flex-nowrap whitespace-nowrap flex-col md:flex">

      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <Tabs defaultValue="ticket-master" className="space-y-4 ">
          <TabsList>
            {/* <TabsTrigger value="overview">Overview</TabsTrigger> */}
            <TabsTrigger value="ticket-master">
              Ticket Master
            </TabsTrigger>
            <TabsTrigger value="airport">
              Airport Pickup & Drop-off
            </TabsTrigger>
            <TabsTrigger value="accommodation">
              Accommodation
            </TabsTrigger>
            <TabsTrigger value="dedicated-rides">
              Dedicated Rides
            </TabsTrigger>
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
  )
}
