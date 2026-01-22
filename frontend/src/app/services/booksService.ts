import { Book, BookResponse } from "../types/book";
import { api } from "./api";

export const getBooks = async ({
  page,
  page_size,
}: {
  page: number;
  page_size: number;
}) => {
  return await api<BookResponse[]>("/api/v1/books", {
    params: { page, page_size },
  });
};

export const searchBooksByTitle = async (title: string) => {
  return await api<Book[]>("/api/v1/books/search/title", {
    params: { q: title },
  });
};

export const searchBooksByAuthor = async (author: string) => {
  return await api<Book[]>(`/api/v1/books/author/${author}`);
};

export const createBook = async (bookData: Book) => {
  return await api<Book>("/api/v1/books", {
    method: "POST",
    body: JSON.stringify(bookData),
  });
};

export const deleteBook = async (bookId: string) => {
  return await api<Book[]>(`/api/v1/books/${bookId}`);
};
