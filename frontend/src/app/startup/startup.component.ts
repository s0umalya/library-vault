import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryService } from '../library/services/library.service';

import { HomeComponent } from '../home/home.component';
import { SetupWizardComponent } from '../library/components/setup-wizard/setup-wizard.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startup',
  standalone: true,
  imports: [CommonModule,HomeComponent,
  SetupWizardComponent],
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss']
})
export class StartupComponent {
  showSetupWizard = false;
  loading = true;

  constructor(
    private libraryService: LibraryService,
    private router: Router
  ) { }

  ngOnInit(): void {

  this.libraryService.libraryExists().then(exists => {

    if (exists) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/setup']);
    }

  });

}
}