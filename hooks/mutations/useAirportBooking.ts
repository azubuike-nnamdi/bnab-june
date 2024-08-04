// api.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useAirportBooking = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (airport) => {
      return axios.post("/api/v1/airport", airport);
    },
    onSuccess: ({ data }) => {
      console.log("data submitted", data);
      if (data) {
        toast.success(data?.message);
        router.push("/");
      }
      queryClient.invalidateQueries({ queryKey: ["airport"] });
    },
    onError: (error) => {
      console.log("error submitting", error);
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  const handleSubmitAirportBooking = (payload) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleSubmitAirportBooking,
  };
};
