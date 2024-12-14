'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetEventById = (eventId: string | number) => {
  const fetchEventById = async () => {
    const data = await axios.get(`/api/v1/events?id=${eventId}`);
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

export default useGetEventById;