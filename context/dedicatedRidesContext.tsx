// Dedicated rides BookingContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { DedicatedRideBookingProps, TransactionType } from '@/types/declaration';

interface BookingContextType {
  formData: DedicatedRideBookingProps;
  setFormData: React.Dispatch<React.SetStateAction<DedicatedRideBookingProps>>;
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  transactionType: TransactionType;
  setTransactionType: React.Dispatch<React.SetStateAction<TransactionType>>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const DedicatedBookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<DedicatedRideBookingProps>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    pickUpLocation: "",
    vehicleType: 'Regular',
    price: "0",
    isBookingForSelf: true,
    pickUpDate: new Date().toISOString().split('T')[0],
    pickUpTime: new Date().toISOString().split('T')[1].substring(0, 5),
    dropOffLocation: "",
    dropOffDate: new Date().toISOString().split('T')[0],
    dropOffTime: new Date().toISOString().split('T')[1].substring(0, 5),
    numberOfPassengers: "",
    additionalInfo: "",
    numberOfDays: "",
    bookingForFirstName: "",
    bookingForLastName: "",
    bookingForEmail: "",
    bookingForPhoneNumber: "",
    totalAmount: 0.00,
  });
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [transactionType, setTransactionType] = useState<TransactionType>('booking');

  return (
    <BookingContext.Provider value={{ formData, setFormData, paymentMethod, setPaymentMethod, transactionType, setTransactionType }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a DedicatedBookingProvider");
  }
  return context;
};
