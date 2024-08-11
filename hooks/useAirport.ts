'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAirport = () => {
  const fetchAirportBooking = async () => {
    const data = await axios.get("/api/v1/airport");
    return data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["airport"],
    queryFn: fetchAirportBooking,
    staleTime: 300000,
  });

  return {
    data,
    isPending,
    error,
  };
};

export default useAirport;