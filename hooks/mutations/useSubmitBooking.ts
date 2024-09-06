// api.js
import { DedicatedRideBookingProps } from "@/types/declaration";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useSubmitBooking = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (booking: DedicatedRideBookingProps) => {
      return axios.post("/api/v1/booking", booking);
    },
    onSuccess: ({ data }) => {
      if (data) {
        toast.success(data?.message);
        router.push("/");
      }
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMsg = error.response.data.message
      toast.error(errorMsg);
    },
  });

  const handleSubmitBooking = (payload: DedicatedRideBookingProps) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleSubmitBooking,
  };
};
