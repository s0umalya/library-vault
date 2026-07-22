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

@Component({
  selector: 'app-book-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './book-form-dialog.component.html',
  styleUrl: './book-form-dialog.component.scss'
})
export class BookFormDialogComponent {

  private fb = inject(FormBuilder);

  private dialogRef = inject(
    MatDialogRef<BookFormDialogComponent>
  );

  form = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    genre: [''],
    publisher: [''],
    isbn: [''],
    publicationYear: [null]
  });

  save(): void {

    const book = this.form.getRawValue();

    this.dialogRef.close({
      ...book,
      publicationYear: book.publicationYear
        ? Number(book.publicationYear)
        : null
    });

  }

  cancel(): void {
    this.dialogRef.close();
  }

}