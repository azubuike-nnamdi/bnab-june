'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useBookings = () => {
  const fetchCarBookings = async () => {
    const data = await axios.get("/api/v1/booking/getBookings");
    return data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchCarBookings,
    staleTime: 300000,
  });

  return {
    data,
    isPending,
    error,
  };
};

export default useBookings;