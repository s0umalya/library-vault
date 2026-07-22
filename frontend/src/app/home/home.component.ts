import { Component, inject } from '@angular/core';
import { BookService } from '../book/book.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBookDialogComponent } from '../features/books/add-book-dialog/add-book-dialog.component';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private dialog = inject(MatDialog);

  constructor() { }

  ngOnInit() {
  }

  openAddBookDialog() {

    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

  }

}
