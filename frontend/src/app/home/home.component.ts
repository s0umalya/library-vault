import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { BooksTableComponent } from '../books/components/books-table/books-table.component';

@Component({
  selector: 'app-home',
  imports: [
    MatTableModule,
    MatButtonModule,
    BooksTableComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
