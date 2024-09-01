"use client";
import React, { useState, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { CheckoutProvider } from "./checkoutContext";

interface TanstackProviderProps {
  children: ReactNode;
}

const TanstackProvider = ({ children }: TanstackProviderProps) => {
  const [queryClient] = useState(() => new QueryClient({}));

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <CheckoutProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster position="bottom-right" richColors />
        </CheckoutProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default TanstackProvider;