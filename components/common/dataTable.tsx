import { useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useSearchParams } from "next/navigation"

type DataTableProps = {
  caption: string;
  headers: string[];
  data: Array<Record<string, any>>;
  footer?: Array<Record<string, any>>;
  isPending: boolean;
}

export function DataTable({
  caption,
  headers,
  data,
  footer,
  isPending,
}: Readonly<DataTableProps>) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = data.filter((row) =>
    headers.some((header) =>
      row[header]
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  )

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>
                {isPending ? <Skeleton className="h-4 w-20" /> : header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            Array.from({ length: 5 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : filteredData.length > 0 ? (
            filteredData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <TableCell key={colIndex}>{row[header]}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headers.length} className="text-center">
                Record not found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
