// api.js
import { TicketBookingFormDataProps } from "@/types/declaration";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSubmitTicket = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (ticket: TicketBookingFormDataProps) => {
      return axios.post("/api/v1/ticket-master", ticket);
    },
    onSuccess: ({ data }) => {
      if (data) {
        toast.success(data?.message);
        router.push("/");
      }
      queryClient.invalidateQueries({ queryKey: ["ticket"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMsg = error.response.data.message
      toast.error(errorMsg);
    },
  });

  const handleSubmitTicket = (payload: TicketBookingFormDataProps) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleSubmitTicket,
  };
};
