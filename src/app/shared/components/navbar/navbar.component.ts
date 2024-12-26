import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthButtonsComponent } from "../../../features/auth/componnets/auth-buttons/auth-buttons.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, AuthButtonsComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  links = [
    {
      to: '/',
      label: 'Home'
    },
    {
      to: '/courses',
      label: 'Courses'
    },
    {
      to: '/profile',
      label: 'Profile'
    },
  ]
}
