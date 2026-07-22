import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { BookFormDialogComponent } from '../book-form-dialog/book-form-dialog.component';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-books-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule
  ],
  templateUrl: './books-table.component.html',
  styleUrl: './books-table.component.scss'
})
export class BooksTableComponent {
  @ViewChild(MatSort) sort!: MatSort;
  private dialog = inject(MatDialog);
  dataSource = new MatTableDataSource<Book>();
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
  searchText = '';
  allBooks: Book[] = [];

  constructor(private bookService: BookService) { }



  loadBooks() {
    this.bookService.getBooks().then(data => {
      this.allBooks = data;
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
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

  deleteBook(book: Book): void {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Book',
        message: `Are you sure you want to delete "${book.title}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      this.bookService.deleteBook(book.id!).then(() => {
        this.loadBooks();
      });

    });

  }

  filterBooks(): void {

  const value = this.searchText.trim().toLowerCase();

  if (!value) {
    this.dataSource.data = [...this.allBooks];
    return;
  }

  this.dataSource.data = this.allBooks.filter(book =>
    book.title.toLowerCase().includes(value) ||
    book.author.toLowerCase().includes(value) ||
    (book.genre ?? '').toLowerCase().includes(value) ||
    (book.publisher ?? '').toLowerCase().includes(value) ||
    (book.isbn ?? '').toLowerCase().includes(value)
  );

}
}
