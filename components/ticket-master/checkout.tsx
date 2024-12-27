'use client';

import { CheckoutProps, TicketBookingFormDataProps, TicketRequestBody } from "@/types/declaration";
import { useState } from "react";
import { Button } from "../ui/button";
import { genId } from "@/lib/helper";
import { ticketPrices } from "@/lib/data/data";

type TicketType = keyof typeof ticketPrices;

export default function Checkout({
  activeTabIndex,
  setActiveTabIndex,
  onFormDataChange,
  onFormSubmit,
  ticketOptions
}: Readonly<CheckoutProps>) {
  const [formData, setFormData] = useState<TicketBookingFormDataProps>(() => {
    const defaultTicket = ticketOptions[0] || { name: '', price: '0' };
    return {
      transactionId: "",
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      ticketType: defaultTicket.name,
      ticketId: defaultTicket?.id,
      price: defaultTicket.price,
      isBookingForSelf: true,
      forBookingFirstName: '',
      forBookingLastName: '',
      forBookingEmail: '',
      forBookingPhoneNumber: '',
      bookingType: "ticket-master",
      budget: defaultTicket.price,
      quantity: 1,
    };
  });

  const [emailError, setEmailError] = useState('');
  const [forBookingEmailError, setForBookingEmailError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

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

    if (id === 'ticketType') {
      const selectedTicket = ticketOptions.find(ticket => ticket.name === value);
      const selectedPrice = selectedTicket ? selectedTicket.price : '0';
      const updatedData = {
        ticketType: value,
        ticketId: selectedTicket?.id,
        price: selectedPrice,
        budget: (parseFloat(selectedPrice) * formData.quantity).toString()
      };
      setFormData((prevData) => ({ ...prevData, ...updatedData }));
      onFormDataChange(updatedData);
      // console.log('Selected Ticket:', selectedTicket);
    } else if (id === 'isBookingForSelf') {
      const isBookingForSelf = value === 'true';
      setFormData((prevData) => ({ ...prevData, isBookingForSelf }));
      onFormDataChange({ isBookingForSelf });
    } else if (id === 'quantity') {
      const quantity = parseInt(value, 10);
      const updatedData = {
        quantity,
        budget: (parseFloat(formData.price) * quantity).toString()
      };
      setFormData((prevData) => ({ ...prevData, ...updatedData }));
      onFormDataChange(updatedData);
    } else {
      const updatedData = { [id]: value } as Partial<TicketBookingFormDataProps>;
      setFormData({ ...formData, [id]: value });
      onFormDataChange(updatedData);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transactionId = genId('numeric', 24);
    const updatedFormData = {
      ...formData,
      transactionId,
      bookingType: formData.bookingType,
      budget: (parseFloat(formData.price) * formData.quantity).toString(),
      ticketId: formData.ticketId, // Include ticketId in the payload
    };
    onFormSubmit(updatedFormData);
    setActiveTabIndex(activeTabIndex + 1);
  };

  const isFormValid = () => {
    const mainEmailValid = validateEmail(formData.email);
    const forBookingEmailValid = !formData.isBookingForSelf ? validateEmail(formData.forBookingEmail ?? "") : true;

    const basicFieldsValid =
      (formData.firstName ?? '').trim() !== '' &&
      (formData.lastName ?? '').trim() !== '' &&
      (formData.phoneNumber ?? '').trim() !== '' &&
      (formData.ticketType ?? '').trim() !== '' &&
      (formData.quantity ?? '') !== 0 &&
      mainEmailValid;

    if (!formData.isBookingForSelf) {
      return basicFieldsValid &&
        (formData.forBookingFirstName ?? '').trim() !== '' &&
        (formData.forBookingLastName ?? '').trim() !== '' &&
        (formData.forBookingPhoneNumber ?? '').trim() !== '' &&
        forBookingEmailValid;
    }

    return basicFieldsValid;
  };

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
              className={`w-full p-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
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
              {ticketOptions?.map((ticket) => (
                <option key={ticket.id} value={ticket.name}>
                  {ticket.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="price" className="block mb-2">Price</label>
            <input
              type="text"
              id="price"
              value={`GHC ${parseFloat(formData.budget).toFixed(2)}`}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block mb-2">Quantity</label>
          <select
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
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

