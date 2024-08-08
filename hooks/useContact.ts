import { useQuery } from "@tanstack/react-query";

export function useContact() {
  const { isPending, error, data } = useQuery({
    queryKey: ['contact'],
    queryFn: async () => {
      const response = await fetch('/api/v1/contact')
      return await response.json()
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
  return { isPending, error, data }
}