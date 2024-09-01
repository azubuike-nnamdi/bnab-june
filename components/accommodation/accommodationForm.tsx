'use client';


import { zodResolver } from "@hookform/resolvers/zod";
import { format, isValid, parseISO } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Fade } from "react-awesome-reveal";
import { useAccommodationBooking } from "@/hooks/mutations/useAccommodationBooking";
import { useRouter } from "next/navigation";
import { CHECKOUT_URL } from "@/config/routes";
import { useCheckoutContext } from "@/context/checkoutContext";
import { TransactionType } from "@/types/declaration";
import { useState } from "react";


const BookingSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  budget: z.string().min(1, { message: "Budget is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  dateOfArrival: z.string().refine(date => isValid(parseISO(date)), { message: "Invalid date" }),
  timeOfArrival: z.string().min(1, { message: "Time of arrival is required" }),
  additionalInfo: z.string().optional(),
});

type BookingFormInputs = z.infer<typeof BookingSchema>;

export default function AccommodationBookingForm() {

  const router = useRouter();
  const { setCheckout } = useCheckoutContext();
  const [transactionType, setTransactionType] = useState<TransactionType>('accommodation');



  const form = useForm<BookingFormInputs>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      name: "",
      budget: "",
      phoneNumber: "",
      email: "",
      dateOfArrival: format(new Date(), "yyyy-MM-dd"),
      timeOfArrival: format(new Date(), "HH:mm"),
      additionalInfo: "",
    },
  });

  const onSubmit = (data: BookingFormInputs) => {
    setTransactionType("accommodation");
    router.push(`${CHECKOUT_URL}/${transactionType}`);
    setCheckout(data)
  };
  return (
    <Fade direction="up" triggerOnce cascade>
      <div className="container sm:p-24 p-4 mx-auto my-5">
        <h3 className="mb-4 sm:text-3xl text-xl sm:font-bold font-medium">Guest Details</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guest Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget $</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter your budget" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid sm:grid-cols-2 grid-cols-1 gap-3'>
              <FormField
                control={form.control}
                name="dateOfArrival"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Of Arrival</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeOfArrival"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Of Arrival</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder="Enter any other concern" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full disabled:cursor-not-allowed">
              Book Now
            </Button>
          </form>
        </Form>
      </div>
    </Fade>
  )
}