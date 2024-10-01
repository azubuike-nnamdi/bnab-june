'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useTicketMasterById = ({ id }: { id: string }) => {
  const fetchTicketBookingById = async () => {
    const data = await axios.get(`/api/v1/create-bookings/ticket-master/${id}`);
    return data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["ticket", id],
    queryFn: fetchTicketBookingById,
    staleTime: 300000,
    enabled: !!id,
  });

  return {
    data,
    isPending,
    error,
  };
};

export default useTicketMasterById;