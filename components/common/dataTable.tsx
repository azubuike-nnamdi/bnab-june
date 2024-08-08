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

type DataTableProps = {
  caption: string;
  headers: string[];
  data: Array<Record<string, any>>;
  footer?: Array<Record<string, any>>;
}

export function DataTable({ caption, headers, data, footer }: Readonly<DataTableProps>) {
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
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length > 0 ? (
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
