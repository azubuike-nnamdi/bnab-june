"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabs } from "@/lib/data/tabs-data";
import { DedicatedRideBookingProps, TransactionType } from "@/types/declaration";
import React, { useState } from "react";
import PassengerDetails from "./passengerDetails";
import BookingSidebar from "./bookingSidebar";
import BookingSummary from "./bookingSummary";
import { format } from "date-fns";
import clsx from "clsx";
import PaymentMethod from "@/components/common/payment-method";

export default function DedicatedRideBookingTab({ car }: any) {

  const [activeTab, setActiveTab] = useState<string>("passenger");
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [transactionType, setTransactionType] = useState<TransactionType>('booking');
  const [formData, setFormData] = useState<DedicatedRideBookingProps>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    pickUpLocation: "",
    pickUpDate: format(new Date(), "yyyy-MM-dd"),
    pickUpTime: format(new Date(), "HH:mm"),
    dropOffLocation: "",
    dropOffDate: format(new Date(), "yyyy-MM-dd"),
    dropOffTime: format(new Date(), "HH:mm"),
    numberOfPassengers: "",
    additionalInfo: "",
  });

  const handleTabClick = (value: string) => {
    setActiveTab(value);
  };

  const handlePaymentSelect = (method: string) => {
    setPaymentMethod(method);
  };

  const handleFormSubmit = (data: DedicatedRideBookingProps) => {
    setTransactionType('booking');
    setFormData(data);
  };

  return (
    <div className="container mx-auto my-8">
      <Tabs defaultValue="passenger" value={activeTab} onValueChange={handleTabClick} className="w-full bg-white">
        <TabsList className="flex justify-center space-x-4 bg-white">
          {tabs.map((elm) => (
            <TabsTrigger key={elm.id} value={elm.value} className={clsx(
              "px-4 py-2 sm:text-2xl text-xl font-medium border-b-2",
              {
                "font-bold border-b-4 border-black": activeTab === elm.value,
                "border-gray-400 text-gray-500": activeTab !== elm.value,
              }
            )}>
              {elm.text}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="passenger" className="mt-4">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 p-4">
              <PassengerDetails
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onFormSubmit={handleFormSubmit}
              />
            </div>
            <div className="md:w-1/3 p-4">
              <BookingSidebar car={car} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="summary" className="mt-4">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 p-4">
              <BookingSummary
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                formData={formData} />
            </div>
            <div className="md:w-1/3 p-4">
              <BookingSidebar car={car} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="billing" className="mt-4">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 p-4">
              <PaymentMethod
                paymentMethod={paymentMethod}
                onPaymentSelect={handlePaymentSelect}
                transactionType={transactionType}
                formData={formData} />
            </div>
            <div className="md:w-1/3 p-4">
              <BookingSidebar car={car} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>

  )
}