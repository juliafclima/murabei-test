"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import PaginationComponent from "./paginationContainer";
import { getBooks } from "@/app/services/booksService";
import BookCard from "./bookCard";
import { useBooks } from "@/app/context/bookContext";

export default function BookGrid() {
   const { setBooks, books, setAllBooks } = useBooks();

   const [currentPage, setCurrentPage] = useState(1);

   useEffect(() => {
      async function fetchBooks() {
         try {
            const data = await getBooks({ page: 1, page_size: 500 });
            setBooks(data);
            setAllBooks(data);
         } catch {
            toast.error("Error loading book data");
         }
      }

      fetchBooks();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const itemsPerPage = 20;
   const totalPages = Math.max(1, Math.ceil(books.length / itemsPerPage));
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

   return (
      <>
         <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
         />

         <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
            {currentBooks.map((book) => (
               <div key={book.id} className="mb-8 break-inside-avoid">
                  <BookCard book={book} />
               </div>
            ))}
            {!currentBooks.length && (
               <div className="flex flex-col items-center justify-center min-h-[30vh] w-full">
                  <p className="opacity-50 text-lg font-medium">No data was found</p>
               </div>
            )}
         </div>
      </>
   );
}
