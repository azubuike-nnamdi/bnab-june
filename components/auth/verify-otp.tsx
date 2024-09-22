'use client'

import React, { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import { useMutateVerifyOtp } from "@/hooks/mutations/useMutateVerifyOtp";

export function VerifyOtp() {
  const [value, setValue] = useState("");
  const { handleVerifyOtp, isPending } = useMutateVerifyOtp();
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  React.useEffect(() => {
    if (expiresAt) {
      const intervalId = setInterval(() => {
        const now = new Date();
        const timeLeft = expiresAt.getTime() - now.getTime();
        if (timeLeft <= 0) {
          setRemainingTime(0);
          clearInterval(intervalId);
        } else {
          setRemainingTime(Math.ceil(timeLeft / 1000));
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [expiresAt]);

  const handleSubmit = () => {
    handleVerifyOtp({ email: "user@example.com", otp: value });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  React.useEffect(() => {
    const expirationDate = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    setExpiresAt(expirationDate);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 h-screen">
      <InputOTP maxLength={6} value={value} onChange={(value) => setValue(value)} className="text-center">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        Enter your one-time OTP
      </div>
      <div className="text-center text-red-500 text-sm">
        {expiresAt ? `Time remaining: ${formatTime(remainingTime)}` : 'OTP has expired'}
      </div>
      <Button
        onClick={handleSubmit}
        disabled={isPending}
        loading={isPending}
        loadingText="Verifying..."
        className="w-full max-w-xs"
      >
        Verify OTP
      </Button>
    </div>
  );
}