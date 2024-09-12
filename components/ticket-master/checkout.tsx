'use client';

import { CheckoutProps, TicketBookingFormDataProps } from "@/types/declaration";
import { useState } from "react";
import { Button } from "../ui/button";
import { genId } from "@/lib/helper";
import { ticketPrices } from "@/lib/data/data";

// a union type that includes the possible values for ticketType and use it to type the value:
type TicketType = keyof typeof ticketPrices; // 'Regular' | 'VIP' | 'VVIP'

export default function Checkout({
  activeTabIndex,
  setActiveTabIndex,
  onFormDataChange,
  onFormSubmit,
}: Readonly<CheckoutProps>) {
  const [formData, setFormData] = useState<TicketBookingFormDataProps>({
    transactionId: "",
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    ticketType: 'Regular',
    price: ticketPrices['Regular'],
    isBookingForSelf: true,
    forBookingFirstName: '',
    forBookingLastName: '',
    forBookingEmail: '',
    forBookingPhoneNumber: '',
    bookingType: "ticket-master",
    budget: ticketPrices['Regular'],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    if (id === 'ticketType') {
      const selectedPrice = ticketPrices[value as TicketType];
      const updatedData = { ticketType: value, price: selectedPrice };
      setFormData((prevData) => ({ ...prevData, ...updatedData }));
      onFormDataChange(updatedData); // Notify parent component
    } else if (id === 'isBookingForSelf') {
      const isBookingForSelf = value === 'true';
      setFormData((prevData) => ({ ...prevData, isBookingForSelf }));
      onFormDataChange({ isBookingForSelf }); // Notify parent component
    } else {
      const updatedData = { [id]: value } as Partial<TicketBookingFormDataProps>;
      setFormData({ ...formData, [id]: value });
      onFormDataChange(updatedData); // Notify parent component
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transactionId = genId('numeric', 24); // Generate transactionId
    const updatedFormData = {
      ...formData,
      transactionId,
      bookingType: formData.bookingType,
      budget: formData.price,
    };
    onFormSubmit(updatedFormData);
    setActiveTabIndex(activeTabIndex + 1);
  };

  // Check if all user-input fields are filled
  const isFormValid =
    (formData.firstName ?? '').trim() !== '' &&
    (formData.lastName ?? '').trim() !== '' &&
    (formData.phoneNumber ?? '').trim() !== '' &&
    (formData.email ?? '').trim() !== '' &&
    (formData.ticketType ?? '').trim() !== '' &&
    (formData.isBookingForSelf || (formData.forBookingFirstName ?? '').trim() !== '' && (formData.forBookingLastName ?? '').trim() !== '' && (formData.forBookingEmail ?? '').trim() !== '' && (formData.forBookingPhoneNumber ?? '').trim() !== '');

  return (
    <div className="container mx-auto my-5 animate-fadeInUp">
      <h3 className="mb-4 sm:text-3xl text-xl font-med">Personal Details</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block mb-2">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-2">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="phoneNumber" className="block mb-2">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="ticketType" className="block mb-2">Ticket Type</label>
            <select
              id="ticketType"
              value={formData.ticketType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Regular">Regular</option>
              <option value="VIP">VIP</option>
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
        <div className="mt-4">
          <Button
            type="submit"
            className="w-full py-2 px-4 text-white rounded-md flex items-center justify-center disabled:cursor-not-allowed"
            disabled={!isFormValid}
          >
            Continue
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
  );
}
