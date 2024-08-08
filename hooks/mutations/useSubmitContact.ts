import { ContactType } from "@/types/declaration";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useSubmitContact = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (contact: ContactType) => {
      return axios.post("/api/v1/contact", contact);
    },
    onSuccess: ({ data }) => {
      if (data) {
        toast.success(data?.message);
        router.push("/");
      }
      queryClient.invalidateQueries({ queryKey: ["contact"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMsg = error.response.data.message
      toast.error(errorMsg);
    },
  });

  const handleSubmitContact = (payload: ContactType) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleSubmitContact,
  };
};
