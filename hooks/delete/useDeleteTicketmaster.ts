'use client';

import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DASHBOARD_URL } from "@/config/routes";

// Define the type for the API response
interface DeleteTicketResponse {
  data: {
    message: string;
  }
}

export const useDeleteTicketById = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<DeleteTicketResponse, Error, string>({
    mutationFn: (ticketId: string) => {
      return axios.delete(`/api/v1/create-bookings/ticket-master/${ticketId}`);
    },
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      router.push(DASHBOARD_URL);
      queryClient.invalidateQueries({ queryKey: ["event-ticket"] });
    },
    onError: (error) => {
      const errorMsg = axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : 'An error occurred while deleting the ticket';
      toast.error(errorMsg);
    },
  });

  const handleDeleteEvent = (ticketId: string) => {
    mutation.mutate(ticketId);
  };

  return {
    ...mutation,
    handleDeleteEvent,
  };
};