'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useDeleteTicketById = ({ id }: { id: string }) => {
  const deleteTicketById = async () => {
    const data = await axios.delete('/api/v1/create-bookings/ticket-master', {
      data: { id }
    });
    return data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["ticket", id],
    queryFn: deleteTicketById,
    staleTime: 300000,
    enabled: !!id,
  });

  return {
    data,
    isPending,
    error,
  };
};

export default useDeleteTicketById;