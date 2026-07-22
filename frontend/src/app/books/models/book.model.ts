export interface Book {
  id: number;
  title: string;
  author: string;
  genre?: string;
  publisher?: string;
  isbn?: string;
  publicationYear?: number;
  status: string;
  createdAt: string;
}