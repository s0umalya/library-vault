import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { Router } from '@angular/router';

import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-setup-wizard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './setup-wizard.component.html',
  styleUrl: './setup-wizard.component.scss'
})
export class SetupWizardComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private libraryService: LibraryService,
    private router: Router
  ) {

    this.form = this.fb.group({
      libraryName: ['', Validators.required],
      description: ['']
    });

  }

  async createLibrary() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    await this.libraryService.createLibrary(this.form.value);

    this.router.navigate(['/home']);

  }

}