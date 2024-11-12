'use client'

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import ZoneFormCreation from "./zone-creation-form";
import { DataTable } from "@/components/common/dataTable";
import useGetZones from "@/hooks/useGetZones";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ZoneCreationType } from "@/types/declaration";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


export function ZoneHomepage() {
  const [isViewingData, setIsViewingData] = useState(false);
  const { isPending, data } = useGetZones();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<ZoneCreationType | null>(null);
  const [zoneToDelete, setZoneToDelete] = useState(null);

  console.log('data', data?.data);

  const zoneData = data?.data ?? [];

  const headers = [
    "Range",
    "Cost",
    "Zone",
  ];

  const handleDelete = (_id: string) => {
    // try {
    //   handleDeleteEvent(_id);
    //   if (isSuccess) {
    //     setIsDeleteModalOpen(false);
    //   }
    //   // Optionally, you can refresh the data here
    // } catch (error) {
    //   console.error("Error deleting ticket:", error);
    //   // Optionally, show an error message to the user
    // }
  };

  const handleUpdate = (zone: ZoneCreationType) => {
    // setSelectedZone(ticket);
    console.log(zone)
  };
  const mappedTicketData = (data: any[]) => {
    return data?.map(zone => ({
      "Range": zone?.range,
      "Cost": zone?.cost,
      "Zone": zone?.zone,
      "Actions": (
        <div className="flex space-x-2">
          <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => setZoneToDelete(zone._id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the ticket.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(zone._id)}
                  // disabled={isDeleting}
                  className="text-white"
                >
                  {/* {isDeleting ? (
                    <div>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </div>
                  ) : (
                    'Delete'
                  )} */}
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => handleUpdate(zone)}>
                <Pencil className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Ticket</DialogTitle>
                <DialogDescription>
                  Make changes to the ticket here. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              {/* <UpdateTicketEventForm
                isPending={isUpdating}
                ticket={selectedZone}
                onUpdate={(updatedTicket) => {
                  if (updatedTicket?.id) {
                    handlePatchEvent(updatedTicket?.id, updatedTicket)
                  }
                }}
              /> */}
            </DialogContent>
          </Dialog>
        </div>
      ),
    }));
  };

  const toggleView = () => {
    setIsViewingData(!isViewingData);
  };
  return (
    <div className="overflow-x-hidden flex-nowrap whitespace-nowrap flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            {isViewingData ? "View Details" : "Create Zones"}
          </h2>
          <Button
            onClick={toggleView}
            className="text-white"
          >
            {isViewingData ? "Create Zone +" : "View Details"}
          </Button>
        </div>
        <div className="overflow-x-auto">
          {!isViewingData && (
            <Tabs defaultValue="ticket-master" className="space-y-4">
              <TabsList className="grid w-[400px]">
                <TabsTrigger value="ticket-master">Zones</TabsTrigger>
                {/* <TabsTrigger value="dedicated-rides">Dedicated Rides</TabsTrigger> */}
              </TabsList>
              <TabsContent value="ticket-master" className="space-y-4">
                <ZoneFormCreation />
              </TabsContent>
              {/* <TabsContent value="dedicated-rides">
                <CreateRideForm />
              </TabsContent> */}
            </Tabs>
          )}
          {isViewingData && (
            <Tabs defaultValue="view-ticket-master" className="space-y-4">
              <TabsList className="grid w-[400px]">
                <TabsTrigger value="view-ticket-master">Zones</TabsTrigger>
              </TabsList>
              <TabsContent value="view-ticket-master" className="space-y-4">
                <DataTable
                  caption="All Zone Record"
                  headers={headers}
                  data={zoneData}
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