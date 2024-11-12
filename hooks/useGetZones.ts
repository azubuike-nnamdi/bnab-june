'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetZones = () => {
  const fetchZones = async () => {
    const data = await axios.get("/api/v1/zones");
    return data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["zone"],
    queryFn: fetchZones,
    staleTime: 300000,
  });

  return {
    data,
    isPending,
    error,
  };
};

export default useGetZones;