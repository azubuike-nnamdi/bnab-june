'use client';

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

// Define schemas with common fields and additional fields
const commonFieldsSchema = z.object({
  firstName: z.string().min(1, { message: "Name is required" }),
  lastName: z.string().min(1, { message: "Name is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  budget: z.string().min(1, { message: "Budget is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  dateOfArrival: z.string().refine(date => isValid(parseISO(date)), { message: "Invalid date" }),
  timeOfArrival: z.string().min(1, { message: "Time of arrival is required" }),
  departureDate: z.string().refine(date => isValid(parseISO(date)), { message: "Invalid date" }),
  additionalInfo: z.string().optional(),
});

// Schema for booking self
const bookingForSelfSchema = commonFieldsSchema.extend({
  isBookingForSelf: z.literal(true), // Explicitly define as true for self-booking
});

// Schema for booking for someone else
const bookingForOtherSchema = commonFieldsSchema.extend({
  isBookingForSelf: z.literal(false), // Explicitly define as false for booking for someone else
  forBookingFirstName: z.string().min(1, { message: "Name is required" }),
  forBookingLastName: z.string().min(1, { message: "Name is required" }),
  forBookingEmail: z.string().email({ message: "Invalid email address" }),
  forBookingPhoneNumber: z.string().min(1, { message: "Phone number is required" }),
});

// Combine schemas into a union
const BookingSchema = z.union([bookingForSelfSchema, bookingForOtherSchema]);

// Type inference for form data
type BookingFormInputs = z.infer<typeof BookingSchema>;

export default function AccommodationBookingForm() {
  const router = useRouter();
  const { setCheckout } = useCheckoutContext();
  const [transactionType, setTransactionType] = useState<TransactionType>('accommodation');

  const defaultValues: Partial<BookingFormInputs> = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    budget: "",
    email: "",
    dateOfArrival: format(new Date(), "yyyy-MM-dd"),
    timeOfArrival: format(new Date(), "HH:mm"),
    additionalInfo: "",
    departureDate: format(new Date(), "yyyy-MM-dd"),
    isBookingForSelf: true,
  };

  // If `isBookingForSelf` is false, include additional fields
  if (!defaultValues.isBookingForSelf) {
    Object.assign(defaultValues, {
      forBookingFirstName: "",
      forBookingLastName: "",
      forBookingEmail: "",
      forBookingPhoneNumber: "",
    });
  }

  const form = useForm<BookingFormInputs>({
    resolver: zodResolver(BookingSchema),
    mode: "onChange",
    defaultValues,
  });



  const { watch, formState } = form;


  const handleRadioChange = (value: boolean, form: any) => {
    form.setValue('isBookingForSelf', value);

    // Clear non-self-booking fields when booking for self
    if (value) {
      form.resetField('forBookingFirstName');
      form.resetField('forBookingLastName');
      form.resetField('forBookingEmail');
      form.resetField('forBookingPhoneNumber');
    }
  };

  const isFormValid = formState.isValid && (watch('isBookingForSelf') || (
    watch('forBookingFirstName') &&
    watch('forBookingLastName') &&
    watch('forBookingEmail') &&
    watch('forBookingPhoneNumber')
  ));


  const onSubmit = (data: BookingFormInputs) => {
    setTransactionType("accommodation");

    const payload: AccommodationBookingType = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      budget: data.budget,
      dateOfArrival: data.dateOfArrival,
      timeOfArrival: data.timeOfArrival,
      additionalInfo: data.additionalInfo,
      isBookingForSelf: data.isBookingForSelf,
      departureDate: data.departureDate,
      // Conditionally include fields for non-self booking
      ...(data.isBookingForSelf ? {} : {
        forBookingFirstName: data.forBookingFirstName,
        forBookingLastName: data.forBookingLastName,
        forBookingEmail: data.forBookingEmail,
        forBookingPhoneNumber: data.forBookingPhoneNumber,
      }),
    };

    router.push(`${CHECKOUT_URL}/${transactionType}`);
    setCheckout(payload);

  };

  const budgetOptions = [
    { id: 1, name: "Economy", price: "$80.00 - $120.00" },
    { id: 2, name: "Standard", price: "$120.00 - $200.00" },
    { id: 3, name: "Premium", price: "$200.00 - $300.00" },
    { id: 4, name: "Luxury", price: "$300.00 - $500.00" },
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
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
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
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">

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
              <FormField
                control={form.control}
                name="departureDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departure Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
            <FormField
              control={form.control}
              name="isBookingForSelf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Is this booking for you?</FormLabel>
                  <FormControl>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <Input
                          id="yes"
                          type="radio"
                          value="true"
                          checked={field.value === true}
                          onChange={() => handleRadioChange(true, form)}
                        />
                        <label htmlFor="yes">
                          <span>Yes</span>
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="no"
                          type="radio"
                          value="false"
                          checked={field.value === false}
                          onChange={() => handleRadioChange(false, form)}
                        />
                        <label htmlFor="no">
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!watch('isBookingForSelf') && (
              <section>
                <div className='grid sm:grid-cols-2 grid-cols-1 gap-3'>
                  <FormField
                    control={form.control}
                    name="forBookingFirstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name of the Person Booking</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="forBookingLastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name of the Person Booking</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 my-4">
                  <FormField
                    control={form.control}
                    name="forBookingEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email of the Person Booking</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="forBookingPhoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number of the Person Booking</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>
            )}
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter any additional information" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full disabled:cursor-not-allowed"
              disabled={!isFormValid}
            >
              Book Now
            </Button>
          </form>
        </Form>
      </div>
    </Fade>
  );
}
