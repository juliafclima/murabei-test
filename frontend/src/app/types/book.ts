export interface Book {
  id: string;
  title: string;
  author: string;
  author_slug: string;
  biography: string;
  authors: string;
  publisher: string;
  synopsis: string;
}

export interface BookResponse {
  id: string;
  title: string;
  author: string;
  biography: string;
}

export interface BookDelete {
  id: string;
  title: string;
}
