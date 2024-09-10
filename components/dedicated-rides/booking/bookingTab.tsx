'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabs } from "@/lib/data/tabs-data";
import { DedicatedRideBookingProps, TransactionType } from "@/types/declaration";
import React, { useState, useEffect } from "react";
import PassengerDetails from "./passengerDetails";
import BookingSidebar from "./bookingSidebar";
import BookingSummary from "./bookingSummary";
import PaymentMethod from "@/components/common/payment-method";
import { format } from "date-fns";
import clsx from "clsx";
import { vehiclePrice } from "@/lib/data/car-data";

export default function DedicatedRideBookingTab({ car }: any) {
  const [activeTab, setActiveTab] = useState<string>("passenger");
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [transactionType, setTransactionType] = useState<TransactionType>('booking');
  const [formData, setFormData] = useState<DedicatedRideBookingProps>({
    transactionId: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    pickUpLocation: "",
    vehicleType: 'Regular', // Default vehicle type
    price: vehiclePrice['Regular'], // Initial price
    isBookingForSelf: true,
    pickUpDate: format(new Date(), "yyyy-MM-dd"),
    pickUpTime: format(new Date(), "HH:mm"),
    dropOffLocation: "",
    dropOffDate: format(new Date(), "yyyy-MM-dd"),
    dropOffTime: format(new Date(), "HH:mm"),
    numberOfPassengers: car?.passenger,
    additionalInfo: "",
    numberOfDays: "",
    bookingForFirstName: "",
    bookingForLastName: "",
    bookingForEmail: "",
    bookingForPhoneNumber: "",
    totalAmount: 0, // Initialize totalAmount as a number
    bookingType: "dedicatedRides",
    budget: 0,
  });

  useEffect(() => {
    // Calculate total amount based on price and number of days
    const price = parseFloat(formData.price || "0");
    const days = parseInt(formData.numberOfDays || "0", 10);
    const totalAmount = price * days;

    // Update formData with the new total amount
    setFormData(prevData => ({ ...prevData, totalAmount, budget: totalAmount }));
  }, [formData.price, formData.numberOfDays, formData.totalAmount, formData.budget]);

  const handlePaymentSelect = (method: string) => {
    setPaymentMethod(method);
  };

  const handleFormSubmit = (data: DedicatedRideBookingProps) => {
    setTransactionType('booking');
    setFormData(data);
    setActiveTab('summary'); // Move to Booking Summary after form submission
  };

  const handleFormDataChange = (updatedData: Partial<DedicatedRideBookingProps>) => {
    setFormData(prevData => ({ ...prevData, ...updatedData }));
  };

  const goToNextTab = () => {
    if (activeTab === 'passenger' && formData.firstName && formData.lastName && formData.email && formData.phoneNumber) {
      setActiveTab('summary');
    } else if (activeTab === 'summary') {
      setActiveTab('billing');
    }
  };

  const goToPreviousTab = () => {
    if (activeTab === 'summary') {
      setActiveTab('passenger');
    } else if (activeTab === 'billing') {
      setActiveTab('summary');
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="flex flex-col md:flex-row">
        {/* Tabs and Main Content */}
        <div className="md:w-2/3 p-4">
          <Tabs defaultValue="passenger" value={activeTab} onValueChange={setActiveTab} className="w-full bg-white">
            <TabsList className="flex justify-center space-x-4 bg-white">
              {tabs.map((elm) => (
                <TabsTrigger key={elm.id} value={elm.value} className={clsx(
                  "px-4 py-2 sm:text-2xl text-xl font-medium border-b-2",
                  {
                    "font-bold border-b-4 border-black": activeTab === elm.value,
                    "border-gray-400 text-gray-500": activeTab !== elm.value,
                  }
                )} disabled>
                  {elm.text}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Passenger Details Tab */}
            <TabsContent value="passenger" className="mt-4">
              <PassengerDetails
                activeTab={activeTab}
                numberOfPassengers={formData.numberOfPassengers}
                setActiveTab={setActiveTab}
                onFormSubmit={handleFormSubmit}
                onFormDataChange={handleFormDataChange}
                goToNextTab={goToNextTab}
              />
            </TabsContent>

            {/* Booking Summary Tab */}
            <TabsContent value="summary" className="mt-4">
              <BookingSummary
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                formData={formData}
                goToNextTab={goToNextTab}
                goToPreviousTab={goToPreviousTab}
              />
            </TabsContent>

            {/* Payment Method Tab */}
            <TabsContent value="billing" className="mt-4">
              <PaymentMethod
                paymentMethod={paymentMethod}
                onPaymentSelect={handlePaymentSelect}
                transactionType={transactionType}
                formData={formData}
                goToPreviousTab={goToPreviousTab}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Booking Sidebar */}
        <div className="md:w-1/3 p-4">
          <BookingSidebar formData={formData} />
        </div>
      </div>
    </div>
  );
}
