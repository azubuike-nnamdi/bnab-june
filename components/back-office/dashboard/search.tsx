'use client'
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type SearchProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function Search({
  searchQuery,
  setSearchQuery,
  placeholder = "Search...",
  className = "md:w-[100px] lg:w-[300px]",
}: SearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchQuery) {
      const params = new URLSearchParams(searchParams as any);
      params.set("q", searchQuery);
      router.push(`?${params.toString()}`);
    }
  }, [searchQuery]);

  useEffect(() => {
    const initialQuery = searchParams.get("q");
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [searchParams]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <Input
        type="search"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleInputChange}
        className={className}
      />
    </div>
  );
}
