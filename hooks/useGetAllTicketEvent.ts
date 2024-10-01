'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAllTicketEvents = () => {
  const fetchAllTicketEvent = async () => {
    const data = await axios.get("/api/v1/create-bookings/ticket-master");
    return data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["ticket"],
    queryFn: fetchAllTicketEvent,
    staleTime: 300000,
  });

  return {
    data,
    isPending,
    error,
  };
};

export default useGetAllTicketEvents;