"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabs } from "@/lib/data/tabs-data";
import { DedicatedRideBookingProps } from "@/types/declaration";
import React, { useState } from "react";
import PassengerDetails from "./passengerDetails";
import BookingSidebar from "./bookingSidebar";
import BookingSummary from "./bookingSummary";
import { format } from "date-fns";
import clsx from "clsx";

export default function DedicatedRideBookingTab({ car }: any) {

  const [activeTab, setActiveTab] = useState<string>("billing");
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

  const handleFormSubmit = (data: DedicatedRideBookingProps) => {
    setFormData(data);
  };
  return (
    <div className="container mx-auto my-8">
      <Tabs defaultValue="billing" value={activeTab} onValueChange={handleTabClick} className="w-full bg-white">
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
        <TabsContent value="billing" className="mt-4">
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
              <BookingSummary formData={formData} />
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