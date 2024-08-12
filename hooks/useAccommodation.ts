'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAccommodation = () => {
  const fetchAccommodation = async () => {
    const data = await axios.get("/api/v1/accommodation/getAccommodations");
    return data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["accommodation"],
    queryFn: fetchAccommodation,
    staleTime: 300000,
  });

  return {
    data,
    isPending,
    error,
  };
};

export default useAccommodation;