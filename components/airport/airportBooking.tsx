'use client';

import { AirportBookingData, Suggestion, TransactionType } from '@/types/declaration';
import { format, isValid, parseISO } from 'date-fns';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useCheckoutContext } from '@/context/checkoutContext';
import { CHECKOUT_URL } from '@/config/routes';
import { airlinesInAccra } from '@/lib/data/data';
import { genId } from '@/lib/helper';
import axios from 'axios';
import { LoadingOverlay } from '../common/loading-overlay';
import useGetZones from '@/hooks/useGetZones';
import { determinePrice } from '@/lib/pricing';

export default function AirportBooking() {
  const [formData, setFormData] = useState<AirportBookingData>({
    transactionId: "", // Unique transaction ID
    pickUpLocation: 'Kotoka International Airport (Accra)',
    firstName: '',
    lastName: '',
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
    bookingType: 'airport-booking',
    budget: ''
  });

  const router = useRouter();
  const { setCheckout } = useCheckoutContext();
  const [transactionType, setTransactionType] = useState<TransactionType>('airportBooking');
  const [distance, setDistance] = useState<number>(0);
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);
  const [distanceError, setDistanceError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { isPending, data } = useGetZones();

  const [emailError, setEmailError] = useState('');
  const [forBookingEmailError, setForBookingEmailError] = useState('');
  const zones = data?.data ?? []


  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const inputBRef = useRef<HTMLInputElement>(null);

  // Function to fetch distance
  // Update drop-off location and trigger distance calculation
  const calculateDistance = useCallback(async () => {
    if (!formData?.pickUpLocation || !formData?.dropOffLocation) {
      return
    }
    setIsCalculatingDistance(true);
    setDistanceError(null);
    try {
      const response = await fetch(
        `/api/v1/distance?locationA=${encodeURIComponent(formData?.pickUpLocation)}&locationB=${encodeURIComponent(formData?.dropOffLocation)}`
      )
      const data = await response.json()

      if (data.rows && data.rows[0].elements && data.rows[0].elements[0].status === 'OK') {
        const distanceInKm = data.rows[0].elements[0].distance.value / 1000;
        setDistance(distanceInKm);

        if (zones) {
          // Get base price based on distance
          const basePrice = determinePrice(distanceInKm, zones);
          console.log('basePrice', basePrice);

          // Calculate number of vehicles needed
          const numberOfPassengers = Number(formData.numberOfPassengers);
          console.log('numberOfPassengers', numberOfPassengers);

          // Calculate vehicles needed
          // For 1-3 passengers, need 1 vehicle
          // For 4-6 passengers, need 2 vehicles
          // For 7-9 passengers, need 3 vehicles
          // And so on...
          const vehiclesNeeded = Math.ceil(numberOfPassengers / 3);

          // Calculate total price by multiplying base price with number of vehicles
          const totalPrice = basePrice * vehiclesNeeded;

          setFormData(prev => ({
            ...prev,
            budget: totalPrice.toString()
          }));
        }
      } else {
        setDistance(0)
      }
    } catch (error) {
      console.error('Failed to fetch distance:', error);
      setDistance(0);
      setDistanceError('An error occurred while calculating the distance. Please try again.');
    } finally {
      setIsCalculatingDistance(false);
    }
  }, [formData?.pickUpLocation, formData?.dropOffLocation, formData?.numberOfPassengers, zones])


  useEffect(() => {
    calculateDistance()
  }, [calculateDistance])

  const handleDropOffChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const dropOffLocation = e.target.value;

    // Update form data
    setFormData(prev => ({
      ...prev,
      dropOffLocation
    }));

    // Only fetch suggestions and distance if location is not empty
    if (dropOffLocation.trim()) {
      try {
        // Fetch autocomplete suggestions
        const { data } = await axios.get('/api/v1/distance/autocomplete', {
          params: { search: dropOffLocation },
        });

        setSuggestions(data.predictions || []); // Update suggestions state
        setShowSuggestions(true); // Show suggestions dropdown
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
      }
    } else {
      // Clear suggestions and hide dropdown if input is empty
      setSuggestions([]);
      setShowSuggestions(false)
    }
  };


  const handleSuggestionClick = (suggestion: Suggestion) => {
    setFormData((prev) => ({ ...prev, dropOffLocation: suggestion.description }));
    setShowSuggestions(false);
  };


  const handleClickOutside = (event: MouseEvent) => {
    if (inputBRef.current && !inputBRef.current.contains(event.target as Node)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;

    // Handle radio buttons specifically
    if (type === 'radio' && id === 'isBookingForSelf') {
      setFormData({ ...formData, [id]: value === 'true' });
    } else {
      setFormData({ ...formData, [id]: value });
      if (id === 'email') {
        if (!validateEmail(value)) {
          setEmailError('Please enter a valid email address');
        } else {
          setEmailError('');
        }
      }

      if (id === 'forBookingEmail') {
        if (!validateEmail(value)) {
          setForBookingEmailError('Please enter a valid email address');
        } else {
          setForBookingEmailError('');
        }
      }
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
    console.log(formData);
    const {
      isBookingForSelf,
      firstName,
      lastName,
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
      bookingType,
      budget,
    } = formData;

    const transId = genId('numeric', 24)

    // Build the payload
    const payload: AirportBookingData = {
      transactionId: transId,
      isBookingForSelf,
      pickUpLocation,
      firstName,
      lastName,
      dropOffLocation,
      phoneNumber,
      email,
      airlineName,
      timeOfArrival,
      pickUpDate,
      pickUpTime,
      numberOfPassengers,
      additionalNote,
      bookingType,
      budget
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
      formData.firstName,
      formData.lastName,
      formData.pickUpLocation,
      formData.dropOffLocation,
      formData.phoneNumber,
      formData.email,
      formData.airlineName,
      formData.timeOfArrival,
      formData.pickUpDate,
      formData.pickUpTime,
      formData.numberOfPassengers,
      formData.budget
    ];

    // Ensure all required fields are filled (check for both undefined and empty string)
    const areRequiredFieldsFilled = requiredFields.every((field) => typeof field === 'string' && field.trim() !== '');
    const isMainEmailValid = validateEmail(formData.email);


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
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-grow md:w-[700px] lg:w-[800px]">
          <h1 className="sm:text-2xl text-xl font-medium">Seamless Airport Transfers for Arrival and Departure</h1>
          <form className="space-y-4 pt-4" onSubmit={handleSubmit}>
            {/* {isCalculatingDistance && <LoadingOverlay message="Calculating distance..." />} */}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block mb-2">
                  <span>First Name</span>
                  <span className="text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter first Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-2">
                  <span>Last Name</span>
                  <span className="text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

            </div>
            <div className="grid  md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block mb-2">
                  <span>Email</span>
                  <span className="text-red-500"> *</span>
                </label>
                <input
                  type="email"
                  id="forBookingEmail"
                  placeholder="Person's Email"
                  value={formData.forBookingEmail}
                  onChange={handleChange}
                  className={`w-full p-2 border ${forBookingEmailError ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {forBookingEmailError && <p className="text-red-500 text-sm mt-1">{forBookingEmailError}</p>}
              </div>
              <div>
                <label htmlFor="pickUpLocation" className="block mb-2">
                  <span>Pick Up Location</span>
                  {/* <span className="text-red-500"> *</span> */}
                </label>
                <input
                  type="text"
                  id="pickUpLocation"
                  value={formData.pickUpLocation}
                  onChange={handleChange}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md disabled:cursor-not-allowed"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label htmlFor="dropOffLocation" className="block mb-2">
                  <span>Drop-off location</span>
                  <span className="text-red-500"> *</span>
                </label>
                <div className="relative" ref={inputBRef}>
                  <input
                    type="text"
                    id="dropOffLocation"
                    placeholder="Enter drop off location"
                    value={formData.dropOffLocation}
                    onChange={handleDropOffChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-48 overflow-y-auto">
                      {suggestions.map((suggestion) => (
                        <li
                          key={suggestion.place_id}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="p-2 cursor-pointer hover:bg-gray-100"
                        >
                          {suggestion.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* Distance display */}
                {isCalculatingDistance && (
                  <div className="text-sm text-gray-600 mt-1">Calculating distance...</div>
                )}
                {/* {distance !== null && (
              <div className="text-sm text-green-600 mt-1">
                Distance: {distance.toFixed(2)} km
              </div>
            )} */}
                {/* {distanceError && (
              <div className="text-sm text-red-600 mt-1">{distanceError}</div>
            )} */}
              </div>

              <div className="relative">
                <label htmlFor="price" className="block mb-2">
                  <span>Price</span>
                  {/* <span className="text-red-500"> *</span> */}
                </label>
                <div className="absolute left-3 top-[41px] text-gray-500 pointer-events-none">GHS</div>
                <input
                  type="number"
                  id="price"
                  placeholder="Price will be calculated automatically"
                  value={formData.budget}
                  onChange={handleChange}
                  disabled
                  className="w-full p-2 pl-[50px] border border-gray-300 rounded-md bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* phone number and number of passengers section */}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phoneNumber" className="block mb-2">
                  <span>Phone Number</span>
                  {/* <span className="text-red-500"> *</span> */}

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
                  <span>Number of passengers</span>
                  <span className="text-red-500"> *</span>
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
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
            </div>
            {/* passengers and phone numbers ends here.... */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="airlineName" className="block mb-2">
                  <span>Airline Name</span>
                  <span className="text-red-500"> *</span>
                </label>
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
                <label htmlFor="timeOfArrival" className="block mb-2">
                  <span>Time of Arrival</span>
                  <span className="text-red-500"> *</span>
                </label>
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
                <label htmlFor="pickUpDate" className="block mb-2">
                  <span>Pick Up Date</span>
                  <span className="text-red-500"> *</span>

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
                  <span>Pick Up Time</span>
                  <span className="text-red-500"> *</span>
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
            <div className="mb-4">
              <fieldset className="flex items-center">
                <legend className="block mb-2">
                  <span>Is this booking for you?</span>
                  {/* <span className="text-red-500"> *</span> */}

                </legend>
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
        {/* Booking Summary Card */}
        <div className="md:w-[350px] w-full">
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 sticky top-24 shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Booking Summary</h2>

            {/* Passenger Information */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Customer Name:</span>
                <span className="font-medium">
                  {formData.isBookingForSelf
                    ? `${formData.firstName} ${formData.lastName}`
                    : `${formData.forBookingFirstName || 'N/A'} ${formData.forBookingLastName || ''}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Number of Passengers:</span>
                <span className="font-medium">
                  {formData.numberOfPassengers || '0'}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Pick-up Location:</span>
                <span className="font-medium text-right">
                  {formData.pickUpLocation}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Drop-off Location:</span>
                <span className="font-medium text-right">
                  {formData.dropOffLocation}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Pick-up Date:</span>
                <span className="font-medium">
                  {formData.pickUpDate}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Pick-up Time:</span>
                <span className="font-medium">
                  {formData.pickUpTime}
                </span>
              </div>

              {/* Pricing Section */}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Base Price:</span>
                  <span className="font-medium">
                    {distance > 0 ? `GHS ${determinePrice(distance, zones).toFixed(2)}` : 'Calculating...'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg font-bold">Total Price:</span>
                  <span className="font-bold text-green-600 text-xl">
                    GHS {formData.budget || '0.00'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



