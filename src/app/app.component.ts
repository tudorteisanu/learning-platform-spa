import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { SnackbarService } from './shared/services/snackbar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'learning-platform-spa';

  snackBar = inject(SnackbarService);

  show(type: 'success' | 'error' | 'info' = 'success') {
    this.snackBar.show('This is s test', type)
  }
}
