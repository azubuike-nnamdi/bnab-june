'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useTicketMaster = () => {
  const fetchTicketBooking = async () => {
    const data = await axios.get("/api/v1/ticket-master");
    return data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["ticket"],
    queryFn: fetchTicketBooking,
    staleTime: 300000,
  });

  return {
    data,
    isPending,
    error,
  };
};

export default useTicketMaster;