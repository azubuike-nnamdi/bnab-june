// api.js
import { DASHBOARD_URL } from "@/config/routes";
import { CreateRide, ZoneCreationType } from "@/types/declaration";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useCreateZones = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (zone: ZoneCreationType) => {
      return axios.post("/api/v1/zones", zone);
    },
    onSuccess: ({ data }) => {
      if (data) {
        toast.success(data?.message);
        router.push(DASHBOARD_URL);
      }
      queryClient.invalidateQueries({ queryKey: ["zone"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMsg = error.response.data.message
      toast.error(errorMsg);
    },
  });

  const handleCreateZone = (payload: ZoneCreationType) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleCreateZone,
  };
};
