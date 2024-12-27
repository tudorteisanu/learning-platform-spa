import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent } from '@/App/shared/components/button/button.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  protected readonly fb = inject(NonNullableFormBuilder);
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);

  form = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    passwordConfirmation: ['', Validators.required],
  });

  submit(): void {
    this.authService.register(this.form.getRawValue())
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/')
        }
      });
  }
}
