// api.js
import { DASHBOARD_URL } from "@/config/routes";
import { Event } from "@/types/declaration";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (event: Event) => {
      return axios.post("/api/v1/create-bookings/all-events", event);
    },
    onSuccess: ({ data }) => {
      if (data) {
        toast.success(data?.message);
        router.push(DASHBOARD_URL);
      }
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMsg = error.response.data.message
      toast.error(errorMsg);
    },
  });

  const handleCreateEvent = (payload: Event) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleCreateEvent,
  };
};
