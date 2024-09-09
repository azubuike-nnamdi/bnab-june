'use client';

import { AirportBookingData, TransactionType } from '@/types/declaration';
import { format, isValid, parseISO } from 'date-fns';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useCheckoutContext } from '@/context/checkoutContext';
import { CHECKOUT_URL } from '@/config/routes';
import { airlinesInAccra } from '@/lib/data/data';

export default function AirportBooking() {
  const [formData, setFormData] = useState<AirportBookingData>({
    pickUpLocation: 'Kotoka International Airport (Accra)',
    fullName: '',
    dropOffLocation: '',
    phoneNumber: '',
    email: '',
    airlineName: '',
    timeOfArrival: format(new Date(), 'yyyy-MM-dd'),
    pickUpDate: format(new Date(), 'yyyy-MM-dd'),
    pickUpTime: format(new Date(), 'HH:mm'),
    numberOfPassengers: '',
    isBookingForSelf: true,
    forBookingFirstName: '',
    forBookingLastName: '',
    forBookingEmail: '',
    forBookingPhoneNumber: '',
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
      fullName,
      pickUpLocation,
      dropOffLocation,
      phoneNumber,
      email,
      airlineName,
      timeOfArrival,
      pickUpDate,
      pickUpTime,
      numberOfPassengers,
      additionalNote,
      forBookingFirstName,
      forBookingLastName,
      forBookingEmail,
      forBookingPhoneNumber,
    } = formData;

    // Build the payload
    const payload: AirportBookingData = {
      isBookingForSelf,
      pickUpLocation,
      fullName,
      dropOffLocation,
      phoneNumber,
      email,
      airlineName,
      timeOfArrival,
      pickUpDate,
      pickUpTime,
      numberOfPassengers,
      additionalNote,
    };

    // If booking is not for self, include the additional person's details
    if (!isBookingForSelf) {
      payload.forBookingFirstName = forBookingFirstName;
      payload.forBookingLastName = forBookingLastName;
      payload.forBookingEmail = forBookingEmail;
      payload.forBookingPhoneNumber = forBookingPhoneNumber;
    }

    // Proceed with the checkout process
    setTransactionType('airportBooking');
    setCheckout(payload);
    router.push(`${CHECKOUT_URL}/${transactionType}`);
  };

  const isFormValid = () => {
    // Required fields for all cases
    const requiredFields = [
      formData.fullName,
      formData.pickUpLocation,
      formData.dropOffLocation,
      formData.phoneNumber,
      formData.email,
      formData.airlineName,
      formData.timeOfArrival,
      formData.pickUpDate,
      formData.pickUpTime,
      formData.numberOfPassengers,
    ];

    // Ensure all required fields are filled (check for both undefined and empty string)
    const areRequiredFieldsFilled = requiredFields.every((field) => typeof field === 'string' && field.trim() !== '');

    // If booking is not for self, additional fields are required
    if (!formData.isBookingForSelf) {
      const additionalRequiredFields = [
        formData.forBookingFirstName,
        formData.forBookingLastName,
        formData.forBookingEmail,
        formData.forBookingPhoneNumber,
      ];

      const areAdditionalFieldsFilled = additionalRequiredFields.every((field) => typeof field === 'string' && field.trim() !== '');

      return areRequiredFieldsFilled && areAdditionalFieldsFilled;
    }

    return areRequiredFieldsFilled;
  };


  return (
    <div className="sm:p-24 p-4">
      <h1 className="sm:text-2xl text-xl font-medium">Seamless Airport Transfers for Arrival and Departure</h1>
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
            <label htmlFor="airlineName" className="block mb-2">Airline Name</label>
            <select
              id="airlineName"
              value={formData.airlineName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Airline</option>
              {airlinesInAccra.map((airline) => (
                <option key={airline.id} value={airline.name}>
                  {airline.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="timeOfArrival" className="block mb-2">Time of Arrival</label>
            <input
              type="time"
              id="timeOfArrival"
              value={formData.timeOfArrival}
              onChange={(e) => handleTimeChange(e, 'timeOfArrival')}
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
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
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
          <section>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="forBookingFirstName" className="block mb-2">Person&apos;s First Name</label>
                <input
                  type="text"
                  id="forBookingFirstName"
                  placeholder="Person's First Name"
                  value={formData.forBookingFirstName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="forBookingLastName" className="block mb-2">Person&apos;s Last Name</label>
                <input
                  type="tel"
                  id="forBookingLastName"
                  placeholder="Person's Last Name"
                  value={formData.forBookingLastName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="forBookingEmail" className="block mb-2">Person&apos;s Email</label>
                <input
                  type="email"
                  id="forBookingEmail"
                  placeholder="Person's Email"
                  value={formData.forBookingEmail}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="forBookingPhoneNumber" className="block mb-2">Person&apos;s Phone Number</label>
                <input
                  type="tel"
                  id="forBookingPhoneNumber"
                  placeholder="Person's Phone Number"
                  value={formData.forBookingPhoneNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </section>
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
