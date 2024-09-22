'use client';

import { VerifyOtpType } from "@/types/declaration";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useMutateVerifyOtp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (payload: VerifyOtpType) => {
      return axios.post("/api/auth/verify-otp", payload);
    },
    onSuccess: ({ data }) => {
      if (data) {
        toast.success(data?.message);
        router.push("/");
      }
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMsg = error.response.data.message;
      toast.error(errorMsg);
    },
  });

  const handleVerifyOtp = (payload: VerifyOtpType) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleVerifyOtp,
  };
};