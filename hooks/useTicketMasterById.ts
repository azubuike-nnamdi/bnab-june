'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useTicketMasterById = ({ id }: { id: string }) => {
  const fetchTicketBookingById = async () => {
    const data = await axios.get(`/api/v1/ticket-master?id=${id}`);
    return data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["ticket"],
    queryFn: fetchTicketBookingById,
    staleTime: 300000,
  });

  return {
    data,
    isPending,
    error,
  };
};

export default useTicketMasterById;