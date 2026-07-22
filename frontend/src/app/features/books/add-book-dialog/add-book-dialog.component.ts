import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-book-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './add-book-dialog.component.html',
  styleUrl: './add-book-dialog.component.scss'
})
export class AddBookDialogComponent {

  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddBookDialogComponent>);

  form = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    genre: [''],
    publisher: [''],
    isbn: [''],
    publicationYear: [null]
  });

  save() {
    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close(this.form.getRawValue());
  }

  cancel() {
    this.dialogRef.close();
  }
}