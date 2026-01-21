"use client";

import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationNext,
   PaginationPrevious,
} from "./ui/pagination";

interface PaginationComponentProps {
   currentPage: number;
   totalPages: number;
   onPageChange: (page: number) => void;
}

export default function PaginationComponent({
   currentPage,
   totalPages,
   onPageChange,
}: PaginationComponentProps) {
   return (
      <Pagination>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                     e.preventDefault();
                     if (currentPage > 1) onPageChange(currentPage - 1);
                  }}
                  className={
                     currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                  }
               />
            </PaginationItem>

            <p className="mx-2">{currentPage} / {totalPages}</p>

            <PaginationItem>
               <PaginationNext
                  href="#"
                  onClick={(e) => {
                     e.preventDefault();
                     if (currentPage < totalPages) onPageChange(currentPage + 1);
                  }}
                  className={
                     currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                  }
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
}
