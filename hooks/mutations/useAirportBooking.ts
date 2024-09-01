// api.js
import { AirportBookingData } from "@/types/declaration";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useAirportBooking = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (airport: AirportBookingData) => {
      return axios.post("/api/v1/airport", airport);
    },
    onSuccess: ({ data }) => {
      console.log("data submitted", data);
      if (data) {
        toast.success(data?.message);
        router.push("/");
      }
      queryClient.invalidateQueries({ queryKey: ["airportBooking"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMsg = error.response.data.message
      toast.error(errorMsg);
    },
  });

  const handleSubmitAirportBooking = (payload: AirportBookingData) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleSubmitAirportBooking,
  };
};
