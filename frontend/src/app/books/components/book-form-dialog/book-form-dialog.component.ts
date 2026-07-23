import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
    MatSelectModule
  ],
  templateUrl: './book-form-dialog.component.html',
  styleUrl: './book-form-dialog.component.scss'
})
export class BookFormDialogComponent implements OnInit {

  private readonly fb = inject(FormBuilder);

  private readonly dialogRef =
    inject(MatDialogRef<BookFormDialogComponent>);

  readonly data = inject(MAT_DIALOG_DATA, {
    optional: true
  });

  readonly form = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    genre: [''],
    publisher: [''],
    language: [''],
    isbn: [''],
    publicationYear: [null],
    status: ['Available', Validators.required]
  });

  isEditMode = false;

  ngOnInit(): void {

    this.isEditMode = !!this.data;

    if (this.data) {
      this.form.patchValue({
        ...this.data,
        status: this.data.status ?? 'Available'
      });
    }

  }

  save(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const book = this.form.getRawValue();

    this.dialogRef.close({
      id: this.data?.id,
      title: book.title,
      author: book.author,
      genre: book.genre,
      publisher: book.publisher,
      language: book.language,
      isbn: book.isbn,
      publicationYear: book.publicationYear
        ? Number(book.publicationYear)
        : null,
      status: book.status,
      createdAt: this.data?.createdAt
    });

  }

  cancel(): void {
    this.dialogRef.close();
  }

}