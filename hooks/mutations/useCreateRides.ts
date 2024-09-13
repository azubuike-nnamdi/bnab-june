// api.js
import { DASHBOARD_URL } from "@/config/routes";
import { CreateRide } from "@/types/declaration";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useCreateRides = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (rides: CreateRide) => {
      return axios.post("/api/v1/create-bookings/all-rides", rides);
    },
    onSuccess: ({ data }) => {
      if (data) {
        toast.success(data?.message);
        router.push(DASHBOARD_URL);
      }
      queryClient.invalidateQueries({ queryKey: ["rides"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMsg = error.response.data.message
      toast.error(errorMsg);
    },
  });

  const handleCreateRides = (payload: CreateRide) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleCreateRides,
  };
};
