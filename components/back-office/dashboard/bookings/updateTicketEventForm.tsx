"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { EventTicket } from "@/types/declaration";

// Define your validation schema with Zod
const EventTicketSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  address: z.string().min(1, "Address is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  price: z.preprocess((value) => Number(value), z.number().min(0, "Price must be a positive number")), // Preprocess to handle strings
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  noOfTickets: z.preprocess((value) => Number(value), z.number().min(1, "Number of tickets is required")), // Preprocess to handle strings
});


type UpdateTicketEventFormProps = {
  ticket: EventTicket | null;
  isPending: boolean;
  onUpdate: (updatedTicket: EventTicket) => void;
};

export default function UpdateTicketEventForm({
  ticket,
  isPending,
  onUpdate,
}: UpdateTicketEventFormProps) {
  const form = useForm<EventTicket>({
    resolver: zodResolver(EventTicketSchema),
    defaultValues: ticket || {},
  });

  // Reset form with new ticket data whenever ticket changes
  useEffect(() => {
    if (ticket) {
      form.reset(ticket);
    }
  }, [ticket, form]);

  const onSubmit = (data: EventTicket) => {
    // Convert price and noOfTickets to numbers

    const updatedData = {
      ...data,
      price: Number(data.price),
      id: ticket?._id,
      noOfTickets: Number(data.noOfTickets),
    };
    onUpdate(updatedData);
  };

  if (!ticket) {
    return <p>No ticket selected.</p>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input id="title" placeholder="Event Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input id="description" placeholder="Event Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input id="address" placeholder="Event Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input id="phoneNumber" placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input id="price" type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input id="date" type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input id="time" type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="noOfTickets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slots</FormLabel>
                <FormControl>
                  <Input id="noOfTickets" type="number" placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isPending} className="w-full text-white">
          {isPending ? (
            <div>
              <Loader2 className="h-5 w-5 inline-block animate-spin" /> Submitting...
            </div>
          ) : (
            "Update"
          )}
        </Button>
      </form>
    </Form>
  );
}
