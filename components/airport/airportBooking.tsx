'use client';


import { useAirportBooking } from '@/hooks/mutations/useAirportBooking';
import { AirportBookingData } from '@/types/declaration';
import { format, isValid, parseISO } from 'date-fns';
import React, { useState } from 'react';
import { Button } from '../ui/button';
export default function AirportBooking() {

  const [formData, setFormData] = useState<AirportBookingData>({
    pickUpLocation: '',
    dropOffLocation: '',
    pickUpDate: format(new Date(), 'yyyy-MM-dd'),
    pickUpTime: format(new Date(), 'HH:mm'),
    numberOfPassengers: '',
  });

  const { handleSubmitAirportBooking, isPending } = useAirportBooking();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      <form className="space-y-4" onSubmit={handleSubmit}>
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
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="dropOffLocation" className="block mb-2">
              Drop off location
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
        <div className="mt-4">
          <Button
            type="submit"
            className="w-full py-2 px-4  text-white rounded-md flex items-center justify-center"
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
