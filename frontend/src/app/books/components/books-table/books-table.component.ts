import {
  AfterViewInit,
  Component,
  ViewChild,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { LibraryService } from '../../../library/services/library.service';

import { BookFormDialogComponent } from '../book-form-dialog/book-form-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-books-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
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

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  private readonly dialog = inject(MatDialog);

  displayedColumns = [
    'book',
    'genre',
    'publisher',
    'language',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<Book>();

  allBooks: Book[] = [];

  searchText = '';

  libraryName = 'Library Vault';

  constructor(
    private readonly bookService: BookService,
    private readonly libraryService: LibraryService
  ) {
    this.dataSource.sortingDataAccessor = (book, property) => {
      switch (property) {
        case 'book':
          return `${book.title} ${book.author}`;
        case 'genre':
          return book.genre ?? '';
        case 'publisher':
          return book.publisher ?? '';
        case 'language':
          return book.language ?? '';
        case 'status':
          return book.status;
        default:
          return '';
      }
    };
  }

  ngOnInit(): void {
    this.loadLibrarySettings();
    this.loadBooks();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private loadLibrarySettings(): void {
    this.libraryService.getLibrarySettings().then(settings => {
      this.libraryName = settings.libraryName;
    });
  }

  loadBooks(): void {

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

  openAddBookDialog(): void {

    const dialogRef = this.dialog.open(BookFormDialogComponent, {
      width: '760px',
      maxWidth: '90vw',
      autoFocus: false,
      restoreFocus: false,
      disableClose: true
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

  editBook(book: Book): void {

    const dialogRef = this.dialog.open(BookFormDialogComponent, {
      width: '760px',
      maxWidth: '90vw',
      autoFocus: false,
      restoreFocus: false,
      disableClose: true,
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

  deleteBook(book: Book): void {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '420px',
      maxWidth: '90vw',
      autoFocus: false,
      restoreFocus: false,
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
        (book.language ?? '').toLowerCase().includes(value)
      );

    }

    if (this.paginator) {
      this.paginator.firstPage();
    }

  }

  openBookDetails(book: Book): void {
    // Will be implemented in the next feature.
    console.log(book);
  }

}