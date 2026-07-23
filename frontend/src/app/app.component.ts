import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { StartupComponent } from './startup/startup.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,StartupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
