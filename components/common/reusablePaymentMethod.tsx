'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import clsx from 'clsx';
import { PaymentMethodOption } from '@/types/declaration';
import { toast } from 'sonner';
import { MoveLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

type ReusablePaymentMethodProps = {
  paymentMethods: PaymentMethodOption[];
  onPaymentSelect: (method: string) => void;
  onSubmitPayment: (selectedMethod: string, formData: any) => Promise<void>;
  formData: any;
  loading?: boolean;
  loadingText?: string;
  disabledMessage?: string;
  transactionType: string;
};

const ReusablePaymentMethod: React.FC<ReusablePaymentMethodProps> = ({
  paymentMethods,
  onPaymentSelect,
  onSubmitPayment,
  formData,
  loading = false,
  loadingText = 'Processing...',
  disabledMessage = 'Feature not available at the moment',
  transactionType,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const router = useRouter();

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    onPaymentSelect(method);
  };

  const handlePayment = () => {
    if (!selectedMethod) {
      return toast.error('Please select a payment method');
    }
    onSubmitPayment(selectedMethod, formData);
  };

  // Filter payment methods based on transactionType
  const filteredPaymentMethods = transactionType === 'airportBooking'
    ? paymentMethods.filter(({ method }) => method === 'Pay Later') // Show only 'Pay Later'
    : paymentMethods; // Show all methods for other transaction types

  return (
    <div className="flex items-center justify-center min-h-screen mx-auto">
      <div className="sm:w-6/12 w-full mx-auto sm:py-3 p-4">
        <Button variant={"outline"} onClick={() => router.back()} className='my-6 gap-2'>
          <MoveLeft className="w-4 h-4" />
          Go back
        </Button>
        <h2 className="text-2xl font-bold mb-4">Select Payment Method</h2>
        <div className="flex sm:space-x-6">
          {filteredPaymentMethods.map(({ id, method, icon }) => (
            <label key={id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={selectedMethod === method}
                onChange={() => handleMethodSelect(method)}
                className="mr-2"
              />
              <div
                className={clsx(
                  'p-4 flex items-center space-x-2 border rounded-md',
                  {
                    'border-blue-500 bg-blue-50': selectedMethod === method,
                    'border-gray-300': selectedMethod !== method,
                  }
                )}
              >
                {icon}
                <span className="text-md">{method}</span>
              </div>
            </label>
          ))}
        </div>

        {selectedMethod === "Pay Later" && (
          <div className="mt-4 bg-yellow-100 p-4 border border-yellow-300 rounded-md">
            <p className="text-sm">
              Kindly note that the current booking fee is guaranteed for 48 hours
            </p>
          </div>
        )}

        {(selectedMethod === 'Credit Card' || selectedMethod === 'Mobile Money') && (
          <div className="mt-4">
            <p className="text-sm">
              Clicking the <span className="font-bold">Pay</span> button will redirect you to our payment platform.
            </p>
          </div>
        )}

        <div className="mt-4">
          <Button
            loading={loading}
            loadingText={loadingText}
            type="button"
            onClick={handlePayment}
            className="w-full py-2 px-4 text-white rounded-md flex items-center justify-center disabled:cursor-not-allowed"
          >
            Pay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReusablePaymentMethod;
