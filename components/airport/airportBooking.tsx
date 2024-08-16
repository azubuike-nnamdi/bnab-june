'use client';


import { useAirportBooking } from '@/hooks/mutations/useAirportBooking';
import { AirportBookingData } from '@/types/declaration';
import { format, isValid, parseISO } from 'date-fns';
import React, { useState } from 'react';
import { Button } from '../ui/button';
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
    additionalNote: '',
  });

  const { handleSubmitAirportBooking, isPending } = useAirportBooking();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
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
    handleSubmitAirportBooking(formData);
  };
  return (
    <div className='sm:p-24 p-4'>
      <h1 className='sm:text-2xl text-xl font-medium'>Easy Airport Pick Up To and From to Your Accommodation</h1>
      <form className="space-y-4 pt-4" onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 gap-4'>
          <div>
            <label htmlFor="fullName" className="block mb-2">
              Full Name
            </label>
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
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
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
            <label htmlFor="pickUpLocation" className="block mb-2">
              Pick up location
            </label>
            <input
              type="text"
              id="pickUpLocation"
              placeholder="Enter pick up location"
              value={formData.pickUpLocation}
              onChange={handleChange}
              disabled
              className="w-full p-2 border border-gray-300 rounded-md disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="dropOffLocation" className="block mb-2">
              Drop-off location
            </label>
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
            <label htmlFor="pickUpDate" className="block mb-2">
              Pick Up Date
            </label>
            <input
              type="date"
              id="pickUpDate"
              value={formData.pickUpDate}
              onChange={(e) => handleDateChange(e, 'pickUpDate')}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="pickUpTime" className="block mb-2">
              Pick Up Time
            </label>
            <input
              type="time"
              id="pickUpTime"
              value={formData.pickUpTime}
              onChange={(e) => handleTimeChange(e, 'pickUpTime')}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className='grid md:grid-cols-2 gap-4'>
          <div>
            <label htmlFor="phoneNumber" className="block mb-2">
              Phone Number
            </label>
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
            <label htmlFor="numberOfPassengers" className="block mb-2">
              Number of passengers
            </label>
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

        <div>
          <label htmlFor="additionalNote" className="block mb-2">
            Additional Note
          </label>
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
            disabled={isPending}
            className="w-full py-2 px-4  text-white rounded-md flex items-center justify-center disabled:cursor-not-allowed"
          >
            {isPending ? 'Loading...' : 'Book Now & Pay Later'}
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </Button>
        </div>
      </form>
    </div>
  )
}
