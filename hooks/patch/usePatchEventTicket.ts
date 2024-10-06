'use client';

import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DASHBOARD_URL } from "@/config/routes";

// Define the type for the API response
interface PatchResponse {
  data: {
    message: string;
  }
}

// Define the type for the request body
interface TicketUpdate {
  title?: string;   // Example field, add as needed
  price?: number;   // Example field, add as needed
  // Add other fields as necessary
}

// Update the usePatchEventTicket hook
export const usePatchEventTicket = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<PatchResponse, Error, { ticketId: string; updateData: TicketUpdate }>({
    mutationFn: ({ ticketId, updateData }) => {
      return axios.patch(`/api/v1/create-bookings/ticket-master/${ticketId}`, updateData);
    },
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      if (onSuccessCallback) {
        onSuccessCallback(); // Call the optional success callback
      }
      router.push(DASHBOARD_URL);
      queryClient.invalidateQueries({ queryKey: ["event-ticket"] });
    },
    onError: (error) => {
      const errorMsg = axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : 'An error occurred while updating the ticket';
      toast.error(errorMsg);
    },
  });

  const handlePatchEvent = (ticketId: string, updateData: TicketUpdate) => {
    mutation.mutate({ ticketId, updateData });
  };

  return {
    ...mutation,
    handlePatchEvent,
  };
};
