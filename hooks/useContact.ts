'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useContact = () => {
  const fetchContact = async () => {
    const data = await axios.get("/api/v1/contact");
    return data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["contact"],
    queryFn: fetchContact,
    staleTime: 300000,
  });

  return {
    data,
    isPending,
    error,
  };
};

export default useContact;