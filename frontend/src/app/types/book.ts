export interface Book {
  id: string;
  title: string;
  author: string;
  author_slug: string;
  author_bio: string;
  authors: string;
  publisher: string;
  synopsis: string;
}

export interface BookResponse {
  id: string;
  title: string;
  author: string;
  author_bio: string;
}
