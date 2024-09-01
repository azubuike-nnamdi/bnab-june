// contexts/CheckoutContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { AirportBookingData } from '@/types/declaration';

type CheckoutContextType = {
  checkout: AirportBookingData | null;
  setCheckout: (data: AirportBookingData) => void;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [checkout, setCheckout] = useState<AirportBookingData | null>(null);

  return (
    <CheckoutContext.Provider value={React.useMemo(() => ({ checkout, setCheckout }), [checkout])}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckoutContext = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useTicketMaster must be used within a CheckoutProvider');
  }
  return context;
};
