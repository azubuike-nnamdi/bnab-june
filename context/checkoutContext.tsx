import React, { createContext, useContext, useState } from 'react';
import { CheckoutContextType, CheckoutData } from '@/types/declaration';


const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [checkout, setCheckout] = useState<CheckoutData | null>(null);  // Use CheckoutData | null

  return (
    <CheckoutContext.Provider value={React.useMemo(() => ({ checkout, setCheckout }), [checkout])}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckoutContext = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckoutContext must be used within a CheckoutProvider');
  }
  return context;
};
