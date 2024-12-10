'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetEvents = () => {
  const fetchAllEvents = async () => {
    const data = await axios.get("/api/v1/events");
    return data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["events"],
    queryFn: fetchAllEvents,
    staleTime: 300000,
  });

  return {
    data,
    isPending,
    error,
  };
};

export default useGetEvents;