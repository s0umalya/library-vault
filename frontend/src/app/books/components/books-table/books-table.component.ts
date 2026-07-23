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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { LibraryService } from '../../../library/services/library.service';

@Component({
  selector: 'app-books-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatTooltipModule,
    MatPaginatorModule
  ],
  templateUrl: './books-table.component.html',
  styleUrl: './books-table.component.scss'
})
export class BooksTableComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
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
  libraryName = 'Library Vault';

  constructor(
    private bookService: BookService,
    private libraryService: LibraryService
  ) { }

  ngOnInit() {
    this.libraryService.getLibrarySettings().then(settings => {
      this.libraryName = settings.libraryName;
    });
    this.loadBooks();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }



  loadBooks() {
    this.bookService.getBooks().then(data => {
      this.allBooks = data;
      this.dataSource.data = data;

      if (this.sort) {
        this.dataSource.sort = this.sort;
      }

      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
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
    } else {
      this.dataSource.data = this.allBooks.filter(book =>
        book.title.toLowerCase().includes(value) ||
        book.author.toLowerCase().includes(value) ||
        (book.genre ?? '').toLowerCase().includes(value) ||
        (book.publisher ?? '').toLowerCase().includes(value) ||
        (book.isbn ?? '').toLowerCase().includes(value)
      );
    }

    this.paginator.firstPage();
  }
}
