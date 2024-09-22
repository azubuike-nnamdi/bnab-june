'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useValidateToken = (params: string) => {
  const validateToken = async () => {
    const { data } = await axios.get(`/api/auth/verify-email?token=${params}`);
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["verifyEmail", params],  // Include token in query key for caching
    queryFn: validateToken,
    staleTime: 300000,
    enabled: !!params, // Only run query if token exists
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useValidateToken;
