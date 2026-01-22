"use client";

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { BookResponse } from "../types/book";

interface BookContextData {
   books: BookResponse[];
   setBooks: Dispatch<SetStateAction<BookResponse[]>>; // ✅
   allBooks: BookResponse[];
   setAllBooks: Dispatch<SetStateAction<BookResponse[]>>; // ✅
}

const BookContext = createContext<BookContextData>({} as BookContextData);

export function BookProvider({ children }: { children: ReactNode }) {
   const [books, setBooks] = useState<BookResponse[]>([]);
   const [allBooks, setAllBooks] = useState<BookResponse[]>([]);

   return (
      <BookContext.Provider value={{ books, setBooks, allBooks, setAllBooks }}>
         {children}
      </BookContext.Provider>
   );
}

export const useBooks = () => useContext(BookContext);
