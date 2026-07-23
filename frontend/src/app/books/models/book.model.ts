export type BookStatus =
  | 'Available'
  | 'Borrowed'
  | 'Lent'
  | 'Lost';

export interface Book {
  id?: number;
  title: string;
  author: string;
  genre?: string;
  publisher?: string;
  language?: string;
  isbn?: string;
  publicationYear?: number;
  status: BookStatus;
  createdAt?: string;
}