'use client'

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { TransStatus } from '@/types/declaration';
import { Button } from '../ui/button';
import Link from 'next/link';
import { HOME_URL } from '@/config/routes';
import { formatDateString } from '@/lib/helper';
import { useSession } from 'next-auth/react';

const ThankYou = ({ transactionData }: { transactionData: any }) => {
  const { amount, reference, paid_at, channel, currency, status: transactionStatus } = transactionData?.paystackTransaction || {};
  const { data: session } = useSession();

  const email = session?.user?.email

  let status: TransStatus = transactionStatus;
  const getTransStatus = (): TransStatus => {
    return status;
  }

  const getStatusContent = () => {
    switch (getTransStatus()) {
      case "success":
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-500 mb-4" />,
          title: "System, your order was submitted successfully!",
          color: "text-green-500",
          message: `Booking details have been sent to: ${email}`
        };
      case 'failure':
        return {
          icon: <XCircle className="w-16 h-16 text-red-500 mb-4" />,
          title: "Payment failed. Please try again.",
          color: "text-red-500",
          message: "If the problem persists, please contact our support team."
        };
      case 'pending':
        return {
          icon: <Clock className="w-16 h-16 text-yellow-500 mb-4 animate-pulse" />,
          title: "Payment is being processed...",
          color: "text-yellow-500",
          message: "Please wait while we confirm your payment. This may take a few moments."
        };
      default:
        return {
          icon: null,
          title: "Unknown payment status",
          color: "text-gray-500",
          message: "Please contact our support team for assistance."
        };
    }
  };

  const { icon, title, color, message } = getStatusContent();

  // Format amount to currency
  const formattedAmount = (amount / 100).toFixed(2); // assuming amount is in smallest unit

  // Format the reference to show first 4 and last 4 digits
  const formattedReference = reference
    ? `${reference.substring(0, 4)}-${reference.slice(-4)}`
    : "N/A";

  // Handle undefined `paid_at` by providing a fallback value
  const formattedDate = paid_at ? formatDateString(paid_at) : "N/A";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center">
          {icon}
          <h1 className={`text-2xl font-bold text-center ${color}`}>{title}</h1>
          <p className="text-sm text-gray-500 mt-2">{message}</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Order Number</p>
                <p className="text-sm font-bold">{formattedReference}</p> {/* Formatted reference */}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-sm">{formattedDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total</p>
                <p className="text-sm font-bold">{currency} {formattedAmount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Payment Method</p>
                <p className="text-sm capitalize">{channel}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='flex justify-center items-center '>
          <Button>
            <Link href={HOME_URL}>
              Go back home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
