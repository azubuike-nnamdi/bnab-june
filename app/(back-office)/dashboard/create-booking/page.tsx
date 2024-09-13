import CreateEventForm from "@/components/back-office/dashboard/bookings/createEventForm";
import CreateRideForm from "@/components/back-office/dashboard/bookings/createRideForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <div className="overflow-x-hidden flex-nowrap whitespace-nowrap flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Create Bookings</h2>
        </div>
        <div className="overflow-x-auto">
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
        </div>
      </div>
    </div>
  )
}