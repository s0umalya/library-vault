import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SetupWizardComponent } from './library/components/setup-wizard/setup-wizard.component';
import { StartupComponent } from './startup/startup.component';

export const routes: Routes = [
  {
    path: '',
    component: StartupComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'setup',
    component: SetupWizardComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];