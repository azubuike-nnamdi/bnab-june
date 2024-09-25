'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useQueryTransaction = (reference: string) => {
  const fetchTransaction = async () => {
    const response = await axios.get(`/api/v1/fulfilment/query-transaction?reference=${reference}`);
    return response.data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["transaction", reference],
    queryFn: fetchTransaction,
    staleTime: 300000,
  });

  return {
    data,
    isPending,
    error,
  };
};

export default useQueryTransaction;