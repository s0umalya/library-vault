import { Component, inject } from '@angular/core';
import { BookService } from '../book/book.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBookDialogComponent } from '../features/books/add-book-dialog/add-book-dialog.component';
import { Book } from '../book/book.model';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private dialog = inject(MatDialog);
  books: Book[] = [];

  constructor(private bookService: BookService) { }



  loadBooks() {
    this.bookService.getBooks().then(data => {
      this.books = data;
    });
  }

  ngOnInit() {
    this.loadBooks();
  }

  openAddBookDialog() {

    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.bookService.addBook(result).then(() => {
        this.loadBooks();
      });
    });

  }

}
