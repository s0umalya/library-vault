import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { BookFormDialogComponent } from '../book-form-dialog/book-form-dialog.component';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-books-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './books-table.component.html',
  styleUrl: './books-table.component.scss'
})
export class BooksTableComponent {
  private dialog = inject(MatDialog);
  books: Book[] = [];
  displayedColumns = [
    'title',
    'author',
    'genre',
    'publisher',
    'isbn',
    'publicationYear',
    'status',
    'actions'
  ];

  constructor(private bookService: BookService) { }



  loadBooks() {
    this.bookService.getBooks().then(data => {
      this.books = data;
    });
  }

  ngOnInit() {
    this.loadBooks();
  }

  editBook(book: Book): void {
    const dialogRef = this.dialog.open(BookFormDialogComponent, {
      width: '600px',
      data: book
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.bookService.updateBook(result).then(() => {
        this.loadBooks();
      });
    });
  }

  openAddBookDialog() {

    const dialogRef = this.dialog.open(BookFormDialogComponent, {
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
