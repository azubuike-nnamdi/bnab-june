'use client';
import React, { useState } from 'react';
import Checkout from './checkout';
import { TicketBookingFormDataProps } from '@/types/declaration';
import TicketSummary from './ticketSummary';
import { CreditCard, Truck } from 'lucide-react';
import Image from 'next/image';

interface Event {
  id: string;
  price: string;
}


interface TicketBookingTabProps {
  event: Event;
}

const tabs = [
  {
    id: 1,
    icon: <Truck />,
    text: 'Billing',
    number: '01',
  },
  {
    id: 2,
    icon: <CreditCard />,
    text: 'Summary',
    number: '02',
  },
];

const TicketBookingTab: React.FC<TicketBookingTabProps> = ({ event }) => {
  console.log('event', event);

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [formData, setFormData] = useState<TicketBookingFormDataProps>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  });

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  const handleFormSubmit = (data: TicketBookingFormDataProps) => {
    setFormData(data);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center space-x-4">
        {tabs.map((elm, i) => (
          <div key={elm.id} className="item-tab animate-fadeInUp">
            <span
              onClick={() => handleTabClick(i)}
              className={`cursor-pointer p-4 font-bold sm:text-3xl text-xl ${activeTabIndex >= i ? 'text-gray-700 underline underline-offset-8' : 'text-black'}`}
            >
              <div className="flex items-center space-x-2">
                {/* <Image src={elm.icon} alt={elm.text} width={20} height={20} /> */}
                <span>{elm.text}</span>
                <span>0{i + 1}</span>
              </div>
              <div className="text-center mt-2">
              </div>
            </span>
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
              />
            )}
            {activeTabIndex === 1 && <TicketSummary formData={formData} />}
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
                    <span className="price text-xl font-medium">{event?.price}</span>
                  </li>
                </ul>
                <div className="border-b my-4"></div>
                <ul className="list-none space-y-2">
                  <li className="flex justify-between text-xl font-medium">
                    <span>Total</span>
                    <span>{event?.price}</span>
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
