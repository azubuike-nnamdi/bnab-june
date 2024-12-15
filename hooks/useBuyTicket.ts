'use client';

import { TicketRequestBody } from "@/types/declaration";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetChargesById = (eventId: string | number, payload: TicketRequestBody) => {
  const fetchEventById = async () => {

    const data = await axios.post(`/api/v1/events/buy-ticket?id=${eventId}`, {
      payload
    });
    return data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["events", eventId],
    queryFn: fetchEventById,
    enabled: !!eventId,
    staleTime: 300000,
  });

  return {
    data,
    isPending,
    error,
  };
};

export default useGetChargesById;