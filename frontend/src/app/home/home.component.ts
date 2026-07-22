import { Component } from '@angular/core';
import { BookService } from '../book/book.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBooks().then(data => {
      console.log(data);
    });
  }

}
