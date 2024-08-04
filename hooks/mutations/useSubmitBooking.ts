// api.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useSubmitBooking = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (booking) => {
      return axios.post("/api/v1/booking", booking);
    },
    onSuccess: ({ data }) => {
      console.log("data submitted", data);
      if (data) {
        toast.success(data?.message);
        router.push("/");
      }
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      console.log("error submitting", error);
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  const handleSubmitBooking = (payload) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleSubmitBooking,
  };
};
