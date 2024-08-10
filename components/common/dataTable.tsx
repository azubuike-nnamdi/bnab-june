import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { EllipsisVertical } from "lucide-react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

type DataTableProps = {
  caption: string;
  headers: string[];
  data: Array<Record<string, any>>;
  footer?: Array<Record<string, any>>;
  isPending: boolean;
  mapData?: (data: Array<Record<string, any>>) => Array<Record<string, any>>;
};

export function DataTable({
  caption,
  headers,
  data,
  footer,
  isPending,
  mapData,
}: Readonly<DataTableProps>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasPaymentStatus = headers.includes("Status");

  const mappedData = mapData ? mapData(data) : data;

  const filteredData = mappedData.filter((row) =>
    headers.some((header) =>
      row[header]
        ?.toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  );

  const handleIconClick = (row: Record<string, any>) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleCancelOrder = () => {
    if (selectedRow) {
      console.log("Cancel order for ID:", selectedRow.id);
    }
    setIsModalOpen(false);
  };

  const handleDeleteOrder = () => {
    if (selectedRow) {
      console.log("Delete order for ID:", selectedRow.id);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <TableCaption className="text-lg font-semibold">{caption}</TableCaption>
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm mt-2 lg:mt-0"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>
                {isPending ? <Skeleton className="h-4 w-20" /> : header}
              </TableHead>
            ))}
            {hasPaymentStatus && <TableHead />} {/* Extra cell for the icon */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending &&
            Array.from({ length: 5 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {filteredData.length > 0 ? (
            filteredData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <TableCell key={colIndex}>{row[header]}</TableCell>
                ))}
                {hasPaymentStatus && (
                  <TableCell>
                    <EllipsisVertical
                      className="cursor-pointer"
                      onClick={() => handleIconClick(row)}
                    />
                  </TableCell>
                )}
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
        <Button onClick={handleCancelOrder} className="btn-cancel" variant={'outline'}>
          Cancel Order
        </Button>
        <Button onClick={handleDeleteOrder} className="btn-delete" variant={'destructive'}>
          Delete Order
        </Button>
      </Modal>
    </div>
  );
}
