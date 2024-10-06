'use client';

import { useState } from "react";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import CreateEventForm from "@/components/back-office/dashboard/bookings/createEventForm";
import CreateRideForm from "@/components/back-office/dashboard/bookings/createRideForm";
import { DataTable } from "@/components/common/dataTable";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDeleteTicketById } from "@/hooks/delete/useDeleteTicketmaster";
import useGetAllTicketEvents from "@/hooks/useGetAllTicketEvent";
import { truncateString } from "@/lib/helper";
import { EventTicket } from "@/types/declaration";
import UpdateTicketEventForm from "@/components/back-office/dashboard/bookings/updateTicketEventForm";
import { usePatchEventTicket } from "@/hooks/patch/usePatchEventTicket";

export default function Page() {
  const [isViewingData, setIsViewingData] = useState(false);
  const { data, isPending } = useGetAllTicketEvents();
  const [selectedTicket, setSelectedTicket] = useState<EventTicket | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);


  const { handleDeleteEvent, isPending: isDeleting, isSuccess } = useDeleteTicketById();
  const { handlePatchEvent, isPending: isUpdating } = usePatchEventTicket();

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
    "Actions"
  ];

  const handleDelete = (_id: string) => {
    try {
      handleDeleteEvent(_id);
      if (isSuccess) {
        setIsDeleteModalOpen(false);
      }
      // Optionally, you can refresh the data here
    } catch (error) {
      console.error("Error deleting ticket:", error);
      // Optionally, show an error message to the user
    }
  };

  const handleUpdate = (ticket: EventTicket) => {
    setSelectedTicket(ticket);
  };

  const mappedTicketData = (data: any[]) => {
    return data?.map(ticket => ({
      "Title": ticket?.title,
      "Description": truncateString(ticket?.description, 20),
      "Address": truncateString(ticket?.address, 10),
      "Phone Number": ticket?.phoneNumber,
      "Price": ticket?.price,
      "Date & Time": `${ticket?.date} ${ticket?.time}`,
      "Slots": ticket?.noOfTickets,
      "Actions": (
        <div className="flex space-x-2">
          <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => setTicketToDelete(ticket._id)}>
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
                  onClick={() => handleDelete(ticket._id)}
                  disabled={isDeleting}
                  className="text-white"
                >
                  {isDeleting ? (
                    <div>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </div>
                  ) : (
                    'Delete'
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => handleUpdate(ticket)}>
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
              <UpdateTicketEventForm
                isPending={isUpdating}
                ticket={selectedTicket}
                onUpdate={(updatedTicket) => {
                  if (updatedTicket?.id) {
                    handlePatchEvent(updatedTicket?.id, updatedTicket)
                  }
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      ),
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