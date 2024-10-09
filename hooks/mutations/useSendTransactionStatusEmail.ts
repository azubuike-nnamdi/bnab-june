// hooks/useSendTransactionEmail.ts
import { TransactionEmailData } from "@/types/declaration";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useSendTransactionEmail = () => {
  const mutation = useMutation({
    mutationFn: (transaction: TransactionEmailData) => {
      return axios.post("/api/v1/send-email", transaction);
    },
    onSuccess: (data) => {
      console.log("Email sent successfully", data);
      toast.success("Transaction email sent successfully");
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMsg = error.response?.data?.message || "Failed to send transaction email";
      console.error("Error sending transaction email:", errorMsg);
      toast.error(errorMsg);
    },
  });

  const sendTransactionEmail = (payload: TransactionEmailData) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    sendTransactionEmail,
  };
};