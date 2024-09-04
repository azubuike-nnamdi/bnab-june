'use client';

import { AirportBookingData, TransactionType } from '@/types/declaration';
import { format, isValid, parseISO } from 'date-fns';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useCheckoutContext } from '@/context/checkoutContext';
import { CHECKOUT_URL } from '@/config/routes';

export default function AirportBooking() {
  const [formData, setFormData] = useState<AirportBookingData>({
    pickUpLocation: 'Kotoka International Airport (Accra)',
    fullName: '',
    dropOffLocation: '',
    phoneNumber: '',
    email: '',
    pickUpDate: format(new Date(), 'yyyy-MM-dd'),
    pickUpTime: format(new Date(), 'HH:mm'),
    numberOfPassengers: '',
    isBookingForSelf: true,
    personName: '',
    personPhoneNumber: '',
    additionalNote: '',
  });

  const router = useRouter();
  const { setCheckout } = useCheckoutContext();
  const [transactionType, setTransactionType] = useState<TransactionType>('airportBooking');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;

    // Handle radio buttons specifically
    if (type === 'radio' && id === 'isBookingForSelf') {
      setFormData({ ...formData, [id]: value === 'true' });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof AirportBookingData) => {
    const date = e.target.value;
    if (isValid(parseISO(date))) {
      setFormData({ ...formData, [field]: date });
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof AirportBookingData) => {
    const time = e.target.value;
    setFormData({ ...formData, [field]: time });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const {
      isBookingForSelf,
      personName,
      personPhoneNumber,
      ...restFormData
    } = formData;

    // Ensure that personName and personPhoneNumber are defined, even if they are undefined values
    const formattedData: AirportBookingData = {
      ...restFormData,
      isBookingForSelf,
      personName: isBookingForSelf ? undefined : personName,
      personPhoneNumber: isBookingForSelf ? undefined : personPhoneNumber,
    };

    setTransactionType('airportBooking');
    setCheckout(formattedData);
    router.push(`${CHECKOUT_URL}/${transactionType}`);
  };



  const isFormValid = () => {
    const requiredFields = [
      formData.fullName,
      formData.dropOffLocation,
      formData.phoneNumber,
      formData.email,
      formData.pickUpDate,
      formData.pickUpTime,
      formData.numberOfPassengers,
    ];

    // Check if all the required fields are non-empty
    const areRequiredFieldsFilled = requiredFields.every((field) => field.trim() !== '');

    // If the booking is not for self, ensure personName and personPhoneNumber are also filled
    if (!formData.isBookingForSelf) {
      return (
        areRequiredFieldsFilled &&
        (formData.personName?.trim() ?? '') !== '' &&
        (formData.personPhoneNumber?.trim() ?? '') !== ''
      );
    }

    return areRequiredFieldsFilled;
  };


  return (
    <div className="sm:p-24 p-4">
      <h1 className="sm:text-2xl text-xl font-medium">Easy Airport Pick Up To and From Your Accommodation</h1>
      <form className="space-y-4 pt-4" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block mb-2">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pickUpLocation" className="block mb-2">Pick up location</label>
            <input
              type="text"
              id="pickUpLocation"
              value={formData.pickUpLocation}
              onChange={handleChange}
              disabled
              className="w-full p-2 border border-gray-300 rounded-md disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="dropOffLocation" className="block mb-2">Drop-off location</label>
            <input
              type="text"
              id="dropOffLocation"
              placeholder="Enter drop off location"
              value={formData.dropOffLocation}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pickUpDate" className="block mb-2">Pick Up Date</label>
            <input
              type="date"
              id="pickUpDate"
              value={formData.pickUpDate}
              onChange={(e) => handleDateChange(e, 'pickUpDate')}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="pickUpTime" className="block mb-2">Pick Up Time</label>
            <input
              type="time"
              id="pickUpTime"
              value={formData.pickUpTime}
              onChange={(e) => handleTimeChange(e, 'pickUpTime')}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phoneNumber" className="block mb-2">Phone Number</label>
            <input
              type="number"
              id="phoneNumber"
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="numberOfPassengers" className="block mb-2">Number of passengers</label>
            <select
              id="numberOfPassengers"
              value={formData.numberOfPassengers}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select number of passengers</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <fieldset className="flex items-center">
            <legend className="block mb-2">Is this booking for you?</legend>
            <label className="mr-4">
              <input
                type="radio"
                id="isBookingForSelf"
                name="isBookingForSelf"
                value="true"
                checked={formData.isBookingForSelf}
                onChange={handleChange}
                className="mr-2"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                id="isBookingForSelf"
                name="isBookingForSelf"
                value="false"
                checked={!formData.isBookingForSelf}
                onChange={handleChange}
                className="mr-2"
              />
              No
            </label>
          </fieldset>
        </div>
        {!formData.isBookingForSelf && (
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="personName" className="block mb-2">Person&apos;s Fullname</label>
              <input
                type="text"
                id="personName"
                placeholder="Person's Name"
                value={formData.personName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="personPhoneNumber" className="block mb-2">Person&apos;s Phone Number</label>
              <input
                type="tel"
                id="personPhoneNumber"
                placeholder="Person's Phone Number"
                value={formData.personPhoneNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        )}
        <div>
          <label htmlFor="additionalNote" className="block mb-2">Additional Note</label>
          <textarea
            id="additionalNote"
            value={formData.additionalNote}
            rows={3}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
          />
        </div>
        <div className="mt-4">
          <Button
            type="submit"
            className="w-full py-2 px-4 text-white rounded-md flex items-center justify-center disabled:cursor-not-allowed"
            disabled={!isFormValid()}
          >
            Book Now
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.75L21 12m0 0l-3.75 3.25M21 12H3"></path>
            </svg>
          </Button>
        </div>
      </form>
    </div>
  );
}
