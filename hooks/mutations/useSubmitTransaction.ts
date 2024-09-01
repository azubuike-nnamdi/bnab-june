// api.js
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAirportBooking } from "@/hooks/mutations/useAirportBooking";

export const useSubmitTransaction = (transactionType: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Map transaction types to their respective mutation hooks
  const mutationHooks = {
    airportBooking: useAirportBooking,
  };

  const useMutationHook = mutationHooks[transactionType as keyof typeof mutationHooks];

  const { mutate, isPending, error } = useMutationHook();


  const handleSubmitTransaction = (formData: any) => {
    mutate(formData, {
      onSuccess: ({ data }) => {
        if (data) {
          toast.success(data?.message);
          router.push("/");
        }
        queryClient.invalidateQueries({ queryKey: [transactionType] });
      },
      onError: (error: any) => {
        const errorMsg = error?.response?.data?.message || 'An error occurred';
        toast.error(errorMsg);
      },
    });
  };

  return {
    handleSubmitTransaction,
    isPending,
    error,
  };
};
