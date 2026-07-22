import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  getBooks(): Promise<Book[]> {
    return invoke<Book[]>('get_books');
  }

}