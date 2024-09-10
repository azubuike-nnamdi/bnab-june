// Dedicated rides BookingContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { DedicatedRideBookingProps, TransactionType } from '@/types/declaration';
import { vehiclePrice } from '@/lib/data/car-data';
import { format } from "date-fns";


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
    transactionId: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    pickUpLocation: "",
    vehicleType: 'Regular', // Default vehicle type
    price: vehiclePrice['Regular'], // Initial price
    isBookingForSelf: true,
    pickUpDate: format(new Date(), "yyyy-MM-dd"),
    pickUpTime: format(new Date(), "HH:mm"),
    dropOffLocation: "",
    dropOffDate: format(new Date(), "yyyy-MM-dd"),
    dropOffTime: format(new Date(), "HH:mm"),
    numberOfPassengers: "3",
    additionalInfo: "",
    numberOfDays: "",
    bookingForFirstName: "",
    bookingForLastName: "",
    bookingForEmail: "",
    bookingForPhoneNumber: "",
    totalAmount: 0, // Initialize totalAmount as a number
    bookingType: "dedicatedRides",
    budget: 0,
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
