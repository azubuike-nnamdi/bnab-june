'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUsers = () => {
  const fetchAllUsers = async () => {
    const data = await axios.get("/api/v1/users");
    return data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
    staleTime: 300000,
  });

  return {
    data,
    isPending,
    error,
  };
};

export default useUsers;