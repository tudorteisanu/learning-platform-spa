import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ButtonComponent } from "../../../../shared/components/button/button.component";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  protected readonly fb = inject(NonNullableFormBuilder);
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);

  form = this.fb.group({
    email: ['user21@example.com', [Validators.required, Validators.email]],
    password: ['user21', Validators.required],
  });

  submit(): void {
    this.authService.login(this.form.getRawValue())
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/')
        }
      });
  }
}
