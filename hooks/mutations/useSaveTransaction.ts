import { TransactionData } from "@/types/declaration";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSaveTransaction = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Mutation for saving a transaction
  const mutation = useMutation({
    mutationFn: async (transaction: TransactionData) => {
      // Ensure budget is correctly formatted for smallest currency unit
      const convertedAmount = Math.round(transaction.budget * 100); // Convert to smallest unit

      // First, save the transaction
      const saveResponse = await axios.post("/api/v1/fulfilment/save-transaction", {
        ...transaction,
        budget: convertedAmount, // Send converted amount
      });

      if (!saveResponse.data) {
        throw new Error("Failed to save the transaction");
      }

      // After saving the transaction, call Paystack API to initialize payment
      const paystackResponse = await axios.post("/api/v1/fulfilment/paystack/initialize", {
        email: transaction.email,
        amount: transaction.budget,
        reference: transaction.transactionId,
        currency: "GHS",
      });

      return { saveResponse: saveResponse.data, paystackResponse: paystackResponse.data };
    },
    onSuccess: async ({ saveResponse, paystackResponse }) => {
      // Handle success for both transaction save and Paystack initialization
      if (saveResponse) {
        toast.success(saveResponse?.message || "Transaction saved successfully");

        // Check for Paystack authorization URL and redirect to the payment page
        if (paystackResponse?.data?.authorization_url) {
          const paystackUrl = paystackResponse.data.authorization_url;

          toast.success("Redirecting you to complete payment...");
          window.location.href = paystackUrl;
        } else {
          toast.error("Failed to initialize Paystack payment");
        }
      }

      // Invalidate queries to refresh related data
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error: unknown) => {
      // Ensure 'error' is treated as an AxiosError or a generic error
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.message || "An error occurred";
        toast.error(errorMsg);
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });

  // Function to handle transaction submission
  const handleSaveTransaction = (payload: TransactionData) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleSaveTransaction,
  };
};
