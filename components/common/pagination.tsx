// components/ui/PaginationComponent.tsx
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";

type PaginationComponentProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Helper function to generate page numbers with ellipses
  const getPageNumbers = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 2) {
      return [1, 2, 3, 'ellipsis', totalPages];
    }

    if (currentPage >= totalPages - 1) {
      return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <button
            disabled={currentPage === 1}
            onClick={() => {
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          >
            Previous
          </button>
        </PaginationItem>

        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index} className='cursor-pointer'>
            {page === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => {
                  if (typeof page === 'number') {
                    onPageChange(page);
                  }
                }}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <button
            disabled={currentPage === totalPages}
            onClick={() => {
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
          >
            Next
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
