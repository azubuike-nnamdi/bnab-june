"use client";


import React, { useState } from "react";
import { format, parseISO, isValid } from "date-fns";
import { Button } from "@/components/ui/button";
import { DedicatedRideBookingProps } from "@/types/declaration";

interface PassengerDetailsProps {
  activeTab: string;
  setActiveTab: (index: string) => void;
  onFormSubmit: (data: DedicatedRideBookingProps) => void;

}

export default function PassengerDetails({ activeTab, setActiveTab, onFormSubmit }: Readonly<PassengerDetailsProps>) {

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const date = e.target.value;
    if (isValid(parseISO(date))) {
      setFormData({ ...formData, [field]: date });
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const time = e.target.value;
    setFormData({ ...formData, [field]: time });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(formData);
    setActiveTab("summary");
  };
  return (
    <main>
      <h3 className="text-2xl font-semibold mb-4">Passenger Details</h3>
      <form onSubmit={handleSubmit}>
        {/* Personal details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="number"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
        </div>

        {/* Pick Up Info Section */}
        <h3 className="text-xl font-semibold mb-4">Pick Up Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="pickUpLocation" className="block text-sm font-medium text-gray-700">
              Pick Up Location
            </label>
            <input
              type="text"
              id="pickUpLocation"
              value={formData.pickUpLocation}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <div>
            <label htmlFor="pickUpDate" className="block text-sm font-medium text-gray-700">
              Pick Up Date
            </label>
            <input
              type="date"
              id="pickUpDate"
              value={formData.pickUpDate}
              onChange={(e) => handleDateChange(e, "pickUpDate")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <div>
            <label htmlFor="pickUpTime" className="block text-sm font-medium text-gray-700">
              Pick Up Time
            </label>
            <input
              type="time"
              id="pickUpTime"
              value={formData.pickUpTime}
              onChange={(e) => handleTimeChange(e, "pickUpTime")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
        </div>

        {/* Drop Off Info Section */}
        <h3 className="text-xl font-semibold mb-4">Drop Off Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="dropOffLocation" className="block text-sm font-medium text-gray-700">
              Drop Off Location
            </label>
            <input
              type="text"
              id="dropOffLocation"
              value={formData.dropOffLocation}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <div>
            <label htmlFor="dropOffDate" className="block text-sm font-medium text-gray-700">
              Drop Off Date
            </label>
            <input
              type="date"
              id="dropOffDate"
              value={formData.dropOffDate}
              onChange={(e) => handleDateChange(e, "dropOffDate")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <div>
            <label htmlFor="dropOffTime" className="block text-sm font-medium text-gray-700">
              Drop Off Time
            </label>
            <input
              type="time"
              id="dropOffTime"
              value={formData.dropOffTime}
              onChange={(e) => handleTimeChange(e, "dropOffTime")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
        </div>

        {/* Other options */}
        <h3 className="text-xl font-semibold mb-4">Other Options</h3>
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label htmlFor="numberOfPassengers" className="block text-sm font-medium text-gray-700">
              Number of passengers
            </label>
            <select
              id="numberOfPassengers"
              value={formData.numberOfPassengers}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
            >
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div>
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              rows={3}
              value={formData.additionalInfo}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              placeholder="Have any concern? Drop a note for the driver"
            />
          </div>
        </div>

        {/* Continue Button */}
        <Button
          type="submit"
          className="w-full py-2 px-4  text-white font-medium text-lg rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 "
        >
          Continue{" "}

        </Button>
      </form>
    </main>
  )
}