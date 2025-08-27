export interface Author {
  id: string;
  name: string;
  description: string;
  genres: string[];
  themes: string[];
  similarity?: number;
}

export interface ApiResponse {
  centralAuthor: Author;
  similarAuthors: Author[];
}

export interface SimilarAuthor {
  authorId: string;
  similarity: number;
}
