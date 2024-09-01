// api.js
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAirportBooking } from "@/hooks/mutations/useAirportBooking";
import { useAccommodationBooking } from "@/hooks/mutations/useAccommodationBooking";
import { TransactionType, TransactionDataMap } from "@/types/declaration";
import { useSubmitBooking } from "./useSubmitBooking";
import { useSubmitTicket } from "./useSubmitTicket";


export const useSubmitTransaction = <T extends TransactionType>(transactionType: T) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Map transaction types to their respective mutation hooks
  const mutationHooks: Record<TransactionType, () => any> = {
    airportBooking: useAirportBooking,
    accommodation: useAccommodationBooking,
    booking: useSubmitBooking,
    ticket: useSubmitTicket
  };

  const useMutationHook = mutationHooks[transactionType];
  const { mutate, isPending, error } = useMutationHook();

  // Ensure that the formData is of the correct type based on the transactionType
  const handleSubmitTransaction = (formData: TransactionDataMap[T]) => {
    mutate(formData, {
      onSuccess: ({ data }: { data: any }) => {
        if (data) {
          toast.success(data.message);
          router.push("/");
        }
        queryClient.invalidateQueries({ queryKey: [transactionType] });
      },
      onError: (error: any) => {
        const errorMsg = error?.response?.data?.message || "An error occurred";
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
