"use server";

import { revalidatePath } from "next/cache";

const API_BASE_URL = process.env.API_URL; 

export async function deleteBookAction(bookId: string) {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/books/${bookId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to delete book");
  }

  revalidatePath("/");
}
