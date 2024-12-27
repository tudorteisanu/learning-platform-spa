import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-auth-buttons',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './auth-buttons.component.html',
  styleUrl: './auth-buttons.component.scss'
})
export class AuthButtonsComponent {
  protected readonly authService = inject(AuthService);

  loggedIn = toSignal(this.authService.loggedIn$, { initialValue: false });
  currentUser = toSignal(this.authService.currentUser$, { initialValue: null });

  logout(): void {
    this.authService.logout();
  }
}
