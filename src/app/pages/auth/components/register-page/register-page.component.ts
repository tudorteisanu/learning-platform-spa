import { Component } from '@angular/core';
import { RegisterFormComponent } from "../../../../features/auth/componnets/register-form/register-form.component";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RegisterFormComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {

}
