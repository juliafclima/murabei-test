"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import PaginationComponent from "./paginationContainer";
import { getBooks } from "@/app/services/booksService";
import BookCard from "./bookCard";
import { useBooks } from "@/app/context/bookContext";
import Loading from "./loading";

export default function BookGrid() {
   const { setBooks, books, setAllBooks, setIsLoading, isLoading } = useBooks();

   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(20);

   const totalPages = useMemo(() => {
      if (!books.length) return 1;
      return Math.ceil(books.length / itemsPerPage);
   }, [books.length, itemsPerPage])

   useEffect(() => {
      if (currentPage > totalPages) {
         setCurrentPage(totalPages);
      }
   }, [totalPages, currentPage]);

   useEffect(() => {
      function handleResize() {
         if (window.innerWidth < 640) setItemsPerPage(6);
         else if (window.innerWidth < 1024) setItemsPerPage(12);
         else setItemsPerPage(20);
      }

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, [])


   useEffect(() => {
      async function fetchBooks() {
         try {
            setIsLoading(true);
            const data = await getBooks({ page: 1, page_size: 500 });
            setBooks(data);
            setAllBooks(data);
         } catch {
            toast.error("Error loading book data");
         } finally {
            setIsLoading(false);
         }
      }

      fetchBooks();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   if (isLoading) {
      <Loading />
   }

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
            {!isLoading && currentBooks.length === 0 && (
               <div className="flex flex-col items-center justify-center min-h-[30vh] w-full">
                  <p className="opacity-50 text-lg font-medium">No data was found</p>
               </div>
            )}
         </div>
      </>
   );
}
