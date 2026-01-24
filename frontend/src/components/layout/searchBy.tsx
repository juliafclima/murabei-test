"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Plus, Search } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
   searchBooksByAuthor,
   searchBooksByTitle,
} from "@/app/services/booksService";
import { useBooks } from "@/app/context/bookContext";
import { BookResponse } from "@/app/types/book";

export default function SearchBy() {
   const [title, setTitle] = useState("");
   const [author, setAuthor] = useState("");

   const { setBooks, allBooks } = useBooks();

   useEffect(() => {
      if (!title && !author) {
         setBooks(allBooks);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [title, author, allBooks]);

   const handleSearch = async () => {
      try {
         if (!title && !author) {
            setBooks(allBooks);
            return;
         }

         let results: BookResponse[] = [];

         if (title) {
            results = await searchBooksByTitle(title);
         }

         if (author) {
            results = await searchBooksByAuthor(author);
         }

         setBooks(results);
      } catch {
         toast.error("Error retrieving data");
      } 
   };

   return (
      <nav className="flex flex-col gap-4 md:flex-row md:items-center">
         <Input
            type="search"
            placeholder="Search by title"
            className="flex-1"
            value={title}
            onChange={(e) => {
               setTitle(e.target.value);
               if (e.target.value) setAuthor("");
            }}
         />
         <Input
            type="search"
            placeholder="Search by author"
            className="flex-1"
            value={author}
            onChange={(e) => {
               setAuthor(e.target.value);
               if (e.target.value) setTitle("");
            }}
         />

         <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <Button
               variant="outline"
               size="sm"
               className="rounded-full flex items-center gap-2"
               onClick={handleSearch}

            >
               <Search className="h-4 w-4" /> Search
            </Button>

            <Link href="/new-book" className="flex-1">
               <Button className="w-full rounded-full">
                  <Plus className="h-4 w-4" /> New book
               </Button>
            </Link>
         </div>
      </nav>
   );
}
