'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { format, isValid, parseISO } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Fade } from "react-awesome-reveal";
import { useRouter } from "next/navigation";
import { CHECKOUT_URL } from "@/config/routes";
import { useCheckoutContext } from "@/context/checkoutContext";
import { AccommodationBookingType, TransactionType } from "@/types/declaration";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const BookingSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  bookingForName: z.string().optional(),
  bookingForPhone: z.string().optional(),
  budget: z.string().min(1, { message: "Budget is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  dateOfArrival: z.string().refine(date => isValid(parseISO(date)), { message: "Invalid date" }),
  timeOfArrival: z.string().min(1, { message: "Time of arrival is required" }),
  additionalInfo: z.string().optional(),
  isBookingSelf: z.boolean(),
}).refine(data => {
  if (data.isBookingSelf) {
    return data.name && data.phoneNumber;
  } else {
    return data.name && data.phoneNumber && data.bookingForName && data.bookingForPhone;
  }
}, {
  message: "Required fields are missing",
});



type BookingFormInputs = z.infer<typeof BookingSchema>;

export default function AccommodationBookingForm() {
  const router = useRouter();
  const { setCheckout } = useCheckoutContext();
  const [transactionType, setTransactionType] = useState<TransactionType>('accommodation');

  const form = useForm<BookingFormInputs>({
    resolver: zodResolver(BookingSchema),
    mode: "onChange", // Validate on each change
    defaultValues: {
      name: "",
      budget: "",
      phoneNumber: "",
      email: "",
      dateOfArrival: format(new Date(), "yyyy-MM-dd"),
      timeOfArrival: format(new Date(), "HH:mm"),
      additionalInfo: "",
      isBookingSelf: true,
      bookingForName: "",
      bookingForPhone: "",
    },
  });

  const onSubmit = (data: BookingFormInputs) => {
    setTransactionType("accommodation");

    if (data.isBookingSelf) {
      // Only include self-booking fields
      const selfBookingPayload: Omit<AccommodationBookingType, 'bookingForName' | 'bookingForPhone'> = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        budget: data.budget,
        dateOfArrival: data.dateOfArrival,
        timeOfArrival: data.timeOfArrival,
        additionalInfo: data.additionalInfo,
        isBookingSelf: data.isBookingSelf,
      };

      router.push(`${CHECKOUT_URL}/${transactionType}`);
      setCheckout(selfBookingPayload as AccommodationBookingType);
    } else {
      // Include all fields
      const fullBookingPayload: AccommodationBookingType = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        budget: data.budget,
        dateOfArrival: data.dateOfArrival,
        timeOfArrival: data.timeOfArrival,
        additionalInfo: data.additionalInfo,
        isBookingSelf: data.isBookingSelf,
        bookingForName: data.bookingForName!,
        bookingForPhone: data.bookingForPhone!,
      };

      router.push(`${CHECKOUT_URL}/${transactionType}`);
      setCheckout(fullBookingPayload);
    }
  };



  const budgetOptions = [
    { id: 1, name: "Economy", price: "$80.00" },
    { id: 2, name: "Standard", price: "$120.00" },
    { id: 3, name: "Premium", price: "$200.00" },
    { id: 4, name: "Luxury", price: "$300.00" },
  ];

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
                    <FormLabel>Budget</FormLabel>
                    <FormControl>
                      <Controller
                        name="budget"
                        control={form.control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Select
                            onValueChange={(value) => {
                              // Update form value with the selected price
                              onChange(value);
                            }}
                            defaultValue={value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your budget" />
                            </SelectTrigger>
                            <SelectContent>
                              {budgetOptions.map((option) => (
                                <SelectItem key={option.id} value={option.price}>
                                  {option.name} ({option.price})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
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
              name="isBookingSelf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Is this booking for you?</FormLabel>
                  <FormControl>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <Input
                          type="radio"
                          value="true"
                          checked={field.value}
                          onChange={() => field.onChange(true)}
                        />
                        <label>
                          Yes
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="radio"
                          value="false"
                          checked={!field.value}
                          onChange={() => field.onChange(false)}
                        />
                        <label>
                          No
                        </label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!form.watch('isBookingSelf') && (
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
                <FormField
                  control={form.control}
                  name="bookingForName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Person Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bookingForPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Person Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
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
              className="w-full disabled:cursor-not-allowed"
              disabled={!form.formState.isValid}>
              Book Now
            </Button>
          </form>
        </Form>
      </div>
    </Fade>
  );
}
