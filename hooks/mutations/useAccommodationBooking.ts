
import { AccommodationBookingType } from "@/types/declaration";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useAccommodationBooking = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (accommodation: AccommodationBookingType) => {
      return axios.post("/api/v1/accommodation", accommodation);
    },
    onSuccess: ({ data }) => {
      if (data) {
        toast.success(data?.message);
        router.push("/");
      }
      queryClient.invalidateQueries({ queryKey: ["accommodation"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMsg = error.response.data.message
      toast.error(errorMsg);
    },
  });

  const handleSubmitAccommodation = (payload: AccommodationBookingType) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleSubmitAccommodation,
  };
};
