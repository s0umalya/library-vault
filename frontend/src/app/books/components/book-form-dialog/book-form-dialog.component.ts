import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-book-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './book-form-dialog.component.html',
  styleUrl: './book-form-dialog.component.scss'
})
export class BookFormDialogComponent {

  private fb = inject(FormBuilder);

  private dialogRef = inject(
    MatDialogRef<BookFormDialogComponent>
  );
  data = inject(MAT_DIALOG_DATA, { optional: true });

  form = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    genre: [''],
    publisher: [''],
    isbn: [''],
    publicationYear: [null]
  });

  isEditMode: boolean = false;

  ngOnInit(): void {
    this.isEditMode = !!this.data;

    if (this.isEditMode) {
      this.form.patchValue(this.data);
    }
  }

  save(): void {

    const book = this.form.getRawValue();

    this.dialogRef.close({
      id: this.data?.id,
      title: book.title,
      author: book.author,
      genre: book.genre,
      publisher: book.publisher,
      isbn: book.isbn,
      publicationYear: book.publicationYear
        ? Number(book.publicationYear)
        : null,
      status: this.data?.status ?? 'Available',
      createdAt: this.data?.createdAt
    });

  }

  cancel(): void {
    this.dialogRef.close();
  }

}