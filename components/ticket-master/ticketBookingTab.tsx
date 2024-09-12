'use client';
import React, { useState } from 'react';
import Checkout from './checkout';
import { TicketBookingFormDataProps, TicketEvent, TransactionType } from '@/types/declaration';
import TicketSummary from './ticketSummary';
import { CreditCard, Truck } from 'lucide-react';
import PaymentMethod from '../common/payment-method';
import { ticketPrices } from '@/lib/data/data';

interface TicketBookingTabProps {
  event: TicketEvent;
}

const tabs = [
  {
    id: 1,
    icon: <Truck />,
    text: 'Personal Details',
    number: '01',
  },
  {
    id: 2,
    icon: <CreditCard />,
    text: 'Booking Summary',
    number: '02',
  },
  {
    id: 3,
    icon: <CreditCard />,
    text: 'Payment Method',
    number: '03',
  }
];

const TicketBookingTab: React.FC<TicketBookingTabProps> = ({ event }) => {

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [transactionType, setTransactionType] = useState<TransactionType>('ticket');
  const [formData, setFormData] = useState<TicketBookingFormDataProps>({
    transactionId: "",
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    event: event,
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

  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const isPersonalDetailsFilled = formData.firstName && formData.lastName && formData.email && formData.phoneNumber;

  const handleTabClick = (index: number) => {
    // Prevent moving to Booking Summary or Payment Method if Personal Details are not filled
    if (index > activeTabIndex && !isPersonalDetailsFilled) {
      return;
    }
    setActiveTabIndex(index);
  };

  const handlePaymentSelect = (method: string) => {
    setPaymentMethod(method);
  };

  const handleFormSubmit = (data: Omit<TicketBookingFormDataProps, 'event'>) => {
    setFormData({ ...data, event });
    setTransactionType('ticket');
    setActiveTabIndex(1);
  };

  const handleFormDataChange = (updatedData: Partial<TicketBookingFormDataProps>) => {
    setFormData(prevData => ({ ...prevData, ...updatedData }));
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row mx-auto justify-center sm:space-x-4 border">
        {tabs.map((elm, i) => (
          <div key={elm.id} className="item-tab animate-fadeInUp">
            <button
              onClick={() => handleTabClick(i)}
              className={`cursor-pointer p-4 font-bold md:text-3xl text-xl ${activeTabIndex >= i ? 'text-gray-700 underline underline-offset-8' : 'text-black'} ${i > 0 && !isPersonalDetailsFilled && activeTabIndex < i ? 'cursor-not-allowed opacity-50' : ''}`}
              disabled={i > 0 && !isPersonalDetailsFilled && activeTabIndex < i}
            >
              <div className="flex items-center justify-center space-x-2">
                <span>{elm.text}{" "}</span>
              </div>
            </button>
          </div>
        ))}
      </div>

      <div className="tab-content mt-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-2/3 p-4">
            {activeTabIndex === 0 && (
              <Checkout
                activeTabIndex={activeTabIndex}
                setActiveTabIndex={setActiveTabIndex}
                onFormSubmit={handleFormSubmit}
                onFormDataChange={handleFormDataChange} // Pass the update function
              />
            )}
            {activeTabIndex === 1 && (
              <TicketSummary
                activeTabIndex={activeTabIndex}
                setActiveTabIndex={setActiveTabIndex}
                formData={formData}
              />
            )}
            {activeTabIndex === 2 && (
              <PaymentMethod
                paymentMethod={paymentMethod}
                transactionType={transactionType}
                onPaymentSelect={handlePaymentSelect}
                formData={formData}
              />
            )}
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="box-tab-right">
              <div className="sidebar bg-gray-100 p-4 rounded-md">
                <div className="flex items-center justify-between animate-fadeInUp">
                  <h6 className="text-2xl font-medium text-gray-800">Ticket Summary</h6>
                </div>
              </div>
              <div className="sidebar bg-gray-100 p-4 mt-4 rounded-md animate-fadeInUp">
                <ul className="list-none space-y-2">
                  <li>
                    <span className="price text-xl font-medium">{`$${formData.price}`}</span>
                  </li>
                </ul>
                <div className="border-b my-4"></div>
                <ul className="list-none space-y-2">
                  <li className="flex justify-between text-xl font-medium">
                    <span>Total</span>
                    <span>{`$${formData.price}`}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketBookingTab;
