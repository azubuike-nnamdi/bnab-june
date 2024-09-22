'use client';

import { LOGIN_URL } from "@/config/routes";
import { ForgotPasswordType } from "@/types/declaration";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useMutateForgotPassword = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (user: ForgotPasswordType) => {
      return axios.post("/api/auth/forgot-password", user);
    },
    onSuccess: ({ data }) => {
      if (data) {
        toast.success(data?.message);
        router.push(LOGIN_URL);
      }
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMsg = error.response.data.message
      toast.error(errorMsg);
    },
  });

  const handleForgotPassword = (payload: ForgotPasswordType) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleForgotPassword,
  };
};