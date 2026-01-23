"use server";

import { revalidatePath } from "next/cache";

const API_BASE_URL = process.env.API_URL;

type ActionState = {
  success: boolean;
  message: string;
} | null;

export async function addBook(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const payload = {
    title: formData.get("title"),
    author: formData.get("author"),
    author_slug: formData.get("author"),
    author_bio: formData.get("author_bio"),
    authors:'',
    publisher: '',
    synopsis: ''
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { success: false, message: "Error saving the book" };
    }

    revalidatePath("/");
    return { success: true, message: "Saved successfully" };
  } catch {
    return { success: false, message: "Server connection error" };
  }
}
