import React, { useState } from "react";
import { format, parseISO, isValid } from "date-fns";
import { Button } from "@/components/ui/button";
import { DedicatedRideBookingProps } from "@/types/declaration";

const vehiclePrice = {
  Regular: "500.00",
  Comfort: "1000.00",
  VVIP: "1500.00",
} as const;

type CarType = keyof typeof vehiclePrice;

interface PassengerDetailsProps {
  activeTab: string;
  setActiveTab: (index: string) => void;
  onFormSubmit: (data: DedicatedRideBookingProps) => void;
  onFormDataChange: (updatedData: Partial<DedicatedRideBookingProps>) => void;
  goToNextTab: () => void;
}

export default function PassengerDetails({
  activeTab,
  setActiveTab,
  onFormSubmit,
  onFormDataChange,
  goToNextTab, // Destructure goToNextTab from props
}: Readonly<PassengerDetailsProps>) {

  const [formData, setFormData] = useState<DedicatedRideBookingProps>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    pickUpLocation: "",
    vehicleType: 'Regular',
    price: vehiclePrice['Regular'],
    isBookingForSelf: true,
    pickUpDate: format(new Date(), "yyyy-MM-dd"),
    pickUpTime: format(new Date(), "HH:mm"),
    dropOffLocation: "",
    dropOffDate: format(new Date(), "yyyy-MM-dd"),
    dropOffTime: format(new Date(), "HH:mm"),
    numberOfPassengers: "",
    additionalInfo: "",
    bookingForName: "",
    bookingForPhone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    if (id === "vehicleType") {
      const selectedPrice = vehiclePrice[value as CarType];
      const updatedData = { vehicleType: value, price: selectedPrice };
      setFormData((prevData) => ({ ...prevData, ...updatedData }));
      onFormDataChange(updatedData);
    } else {
      const updatedData = { [id]: value } as Partial<DedicatedRideBookingProps>;
      setFormData((prevData) => ({ ...prevData, ...updatedData }));
      onFormDataChange(updatedData);
    }
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

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isBookingForSelf = e.target.value === "yes";
    setFormData((prevData) => ({
      ...prevData,
      isBookingForSelf,
      bookingForName: "",
      bookingForPhone: "",
    }));
    onFormDataChange({ isBookingForSelf });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: Partial<DedicatedRideBookingProps> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      pickUpLocation: formData.pickUpLocation,
      vehicleType: formData.vehicleType,
      price: formData.price,
      isBookingForSelf: formData.isBookingForSelf,
      pickUpDate: formData.pickUpDate,
      pickUpTime: formData.pickUpTime,
      dropOffLocation: formData.dropOffLocation,
      dropOffDate: formData.dropOffDate,
      dropOffTime: formData.dropOffTime,
      numberOfPassengers: formData.numberOfPassengers,
      additionalInfo: formData.additionalInfo,
    };

    if (!formData.isBookingForSelf) {
      payload.bookingForName = formData.bookingForName;
      payload.bookingForPhone = formData.bookingForPhone;
    }

    onFormSubmit(payload as DedicatedRideBookingProps);
    goToNextTab(); // Call goToNextTab function to move to the next tab
  };

  const requiredFields = [
    "firstName",
    "lastName",
    "phoneNumber",
    "email",
    "pickUpLocation",
    "pickUpDate",
    "pickUpTime",
    "dropOffLocation",
    "dropOffDate",
    "dropOffTime",
    "numberOfPassengers"
  ];

  if (!formData.isBookingForSelf) {
    requiredFields.push("bookingForName", "bookingForPhone");
  }

  const isFormValid = requiredFields.every((field) =>
    formData[field as keyof DedicatedRideBookingProps]?.toString().trim() !== ""
  );

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
        {/* Vehicle Type Section */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="vehicleType" className="block mb-2">Vehicle Type</label>
            <select
              id="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Regular">Regular</option>
              <option value="Comfort">Comfort</option>
              <option value="VVIP">VVIP</option>
            </select>
          </div>
          <div>
            <label htmlFor="price" className="block mb-2">Price</label>
            <input
              type="text"
              id="price"
              value={`$${formData.price}`}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium">Is this booking for yourself?</p>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="yes"
                checked={formData.isBookingForSelf}
                onChange={handleRadioChange}
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="no"
                checked={!formData.isBookingForSelf}
                onChange={handleRadioChange}
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* Show these fields only if "No" is selected */}
        {!formData.isBookingForSelf && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4">Details of the person you&apos;re booking for</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="bookingForName" className="block text-sm font-medium text-gray-700">
                  Person Name
                </label>
                <input
                  type="text"
                  id="bookingForName"
                  value={formData.bookingForName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label htmlFor="bookingForPhone" className="block text-sm font-medium text-gray-700">
                  Person Phone Number
                </label>
                <input
                  type="number"
                  id="bookingForPhone"
                  value={formData.bookingForPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
            </div>
          </div>
        )}
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
          className="w-full py-2 px-4  text-white font-medium text-lg rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed"
          disabled={!isFormValid}
        >
          Continue{" "}

        </Button>
      </form>
    </main>
  );
}
