import React from "react";
import { useSubmitBooking } from "@/hooks/mutations/useSubmitBooking";
import { formatDateString } from "@/lib/helper";
import { DedicatedRideBookingProps } from "@/types/declaration";
import { Button } from "@/components/ui/button";

interface SummaryProps {
  activeTab: string
  setActiveTab: (index: string) => void;
  formData: DedicatedRideBookingProps;
  goToNextTab: () => void;
  goToPreviousTab: () => void;
}

const BookingSummary: React.FC<SummaryProps> = ({ activeTab, setActiveTab, formData, goToNextTab, goToPreviousTab }) => {


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setActiveTab("billing")
    goToNextTab();
  };

  return (
    <div className="container mx-auto py-5">
      <div className="w-full">
        <h3 className="mb-4 sm:text-3xl text-xl font-bold">Summary</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="mb-3">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={formData.phoneNumber}
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
          </div>

          <div className="my-3">
            <h4>Pick Up Info</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="mb-3">
                <label htmlFor="pickUpLocation" className="block text-sm font-medium text-gray-700">
                  Pick Up Location
                </label>
                <input
                  type="text"
                  id="pickUpLocation"
                  value={formData.pickUpLocation}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pickUpDate" className="block text-sm font-medium text-gray-700">
                  Pick Up Date
                </label>
                <input
                  type="text"
                  id="pickUpDate"
                  value={formatDateString(formData.pickUpDate ?? "")}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pickUpDate" className="block text-sm font-medium text-gray-700">
                  Pick Up Time
                </label>
                <input
                  type="text"
                  id="pickUpTime"
                  value={(formData.pickUpTime)}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
            </div>
          </div>

          <div className="my-3">
            <h4>Drop Off Info</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="mb-3">
                <label htmlFor="dropOffLocation" className="block text-sm font-medium text-gray-700">
                  Drop Off Location
                </label>
                <input
                  type="text"
                  id="dropOffLocation"
                  value={formData.dropOffLocation}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dropOffDate" className="block text-sm font-medium text-gray-700">
                  Drop Off Date
                </label>
                <input
                  type="text"
                  id="dropOffDate"
                  value={formatDateString(formData.dropOffDate ?? "")}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pickUpDate" className="block text-sm font-medium text-gray-700">
                  Drop Off Time
                </label>
                <input
                  type="text"
                  id="dropOffTime"
                  value={(formData.dropOffTime)}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                />
              </div>

            </div>
          </div>

          <div className="my-3">
            <h4>Other Options</h4>
            <div className="grid my-4">
              <div className="mb-4">
                <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-70">Vehicle Type</label>
                <input
                  type="text"
                  id="vehicleType"
                  value={formData.vehicleType}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {formData.isBookingForSelf ? null : (
              <section>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="bookingForFirstName" className="block mb-2">Person First Name</label>
                    <input
                      type="text"
                      id="bookingForFirstName"
                      value={formData.bookingForFirstName}
                      disabled
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="bookingForLastName" className="block mb-2">Person Last Name</label>
                    <input
                      type="text"
                      id="bookingForLastName"
                      value={formData.bookingForLastName}
                      disabled
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="bookingForEmail" className="block mb-2">Person Email</label>
                    <input
                      type="text"
                      id="bookingForEmail"
                      value={formData.bookingForEmail}
                      disabled
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="bookingForPhoneNumber" className="block mb-2">Person Phone Number</label>
                    <input
                      type="text"
                      id="bookingForPhoneNumber"
                      value={formData.bookingForPhoneNumber}
                      disabled
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </section>
            )}
            <div className="mb-3">
              <label htmlFor="numberOfPassengers" className="block text-sm font-medium text-gray-700">
                Number of Passengers
              </label>
              <select
                id="numberOfPassengers"
                value={formData.numberOfPassengers}
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                rows={3}
                disabled
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full py-2 px-4  text-white font-medium text-lg rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 "
          >
            Continue{" "}

          </Button>

          {/* <div className="mt-4 flex justify-between">
            <Button
              type="button"
              onClick={goToPreviousTab}
              variant={"outline"}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700"
            >
              Back
            </Button>
            <Button
              type="submit"


            >
              Book Now
            </Button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default BookingSummary;
