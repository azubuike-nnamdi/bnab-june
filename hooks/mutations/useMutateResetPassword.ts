'use client';

import { LOGIN_URL } from "@/config/routes";
import { ResetPasswordPropType } from "@/types/declaration";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Hook to handle password reset mutation
export const useMutateResetPassword = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (user: ResetPasswordPropType) => {
      return axios.post("/api/auth/reset-password", user);
    },
    onSuccess: ({ data }) => {
      if (data) {
        toast.success(data?.message);
        router.push(LOGIN_URL); // Redirect to login after successful password reset
      }
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMsg = error.response.data.message;
      toast.error(errorMsg);
    },
  });

  // Function to handle the reset password action
  const handleResetPassword = (payload: ResetPasswordPropType) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleResetPassword,
  };
};
