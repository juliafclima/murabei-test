"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Grid, Rows } from "lucide-react";

import { Button } from "./ui/button";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "./ui/tooltip";

import PaginationComponent from "./paginationContainer";
import { getBooks } from "@/app/services/booksService";
import BookCard from "./bookCard";
import { useBooks } from "@/app/context/bookContext";
import Loading from "./loading";
import { cn } from "@/lib/utils";

export default function BookGrid() {
   const { setBooks, books, setAllBooks, setIsLoading, isLoading } = useBooks();

   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(20);
   const [viewMode, setViewMode] = useState("grid")

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

   const [isScrolled, setisScrolled] = useState(false);

   useEffect(() => {
      const onScroll = () => {
         setisScrolled(window.scrollY > 0);
      }

      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
   })


   return (
      <>
         <div className={cn(
            "sticky z-20 py-4 transition-colors",
            "top-[235px] lg:top-[65px]",
            isScrolled ? "bg-background/80 backdrop-blur-sm" : ""
         )}>
            <PaginationComponent
               currentPage={currentPage}
               totalPages={totalPages}
               onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
               }}
            />
         </div>

         <div className="hidden lg:flex items-center justify-end gap-2 mb-4">
            <TooltipProvider>
               <div className="flex items-center justify-end gap-2 mb-4">
                  <span className="text-sm text-muted-foreground mr-2">Show</span>

                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button
                           size="icon"
                           onClick={() => setViewMode("grid")}
                        >
                           <Grid className="h-4 w-4" />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>in grid</p>
                     </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button
                           size="icon"
                           onClick={() => setViewMode("list")}
                        >
                           <Rows className="h-4 w-4" />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>in list</p>
                     </TooltipContent>
                  </Tooltip>
               </div>
            </TooltipProvider>
         </div>

         <div className={
            viewMode === 'grid'
               ? "columns-1 lg:columns-2 gap-8 mb-10"
               : "flex flex-col gap-4 mb-10"
         }>
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
