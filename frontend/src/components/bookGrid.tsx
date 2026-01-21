"use client";

import { BookResponse } from "@/app/types/book";
import { useEffect, useState } from "react";
import PaginationComponent from "./paginationContainer";
import { getBooks } from "@/app/services/booksService";
import BookCard from "./bookCard";

export default function BookGrid() {
   const [books, setBooks] = useState<Array<BookResponse>>([]);
   const [currentPage, setCurrentPage] = useState(1);

   const itemsPerPage = 30;

   useEffect(() => {
      async function fetchBooks() {
         const data = await getBooks({ page: 1, page_size: 500 });
         setBooks(data);
      }

      fetchBooks();
   });

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
         </div>
      </>
   );
}
