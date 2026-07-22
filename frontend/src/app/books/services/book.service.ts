import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  getBooks(): Promise<Book[]> {
    return invoke<Book[]>('get_books');
  }

  addBook(book: Book): Promise<void> {
    return invoke('add_book', { book });
  }

}