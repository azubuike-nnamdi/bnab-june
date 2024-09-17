'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { ThankYouPropType, TransStatus } from '@/types/declaration';

const ThankYou = ({ reference }: Readonly<ThankYouPropType>) => {


  let status: TransStatus = "pending";
  const getTransStatus = (reference: string): TransStatus => {

    //TODO: make an api call that would check the transaction status and update the status to be returned based on the response.
    status = "success"
    return status;
  }
  const getStatusContent = () => {
    switch (getTransStatus(reference)) {
      case "success":
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-500 mb-4" />,
          title: "System, your order was submitted successfully!",
          color: "text-green-500",
          message: "Booking details has been sent to: booking@luxride.com"
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* {showCelebration && <CelebrationSpray />} */}
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
                <p className="text-sm font-bold">#4039</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-sm">Thu, Oct 06, 2022</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total</p>
                <p className="text-sm font-bold">$40.10</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Payment Method</p>
                <p className="text-sm">Direct Bank Transfer</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reservation Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Reservation details would go here...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThankYou;