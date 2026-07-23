import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { BooksTableComponent } from '../books/components/books-table/books-table.component';
import { PageHeaderComponent } from '../shared/components/page-header/page-header.component';

import { LibraryService } from '../library/services/library.service';
import { LibrarySettings } from '../library/models/library-settings.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    BooksTableComponent,
    PageHeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  librarySettings: LibrarySettings | null = null;

  constructor(
    private libraryService: LibraryService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadLibrarySettings();
  }

  private async loadLibrarySettings(): Promise<void> {
    try {
      this.librarySettings = await this.libraryService.getLibrarySettings();
    } catch (error) {
      console.error('Failed to load library settings', error);
    }
  }

}