import { Component, input } from '@angular/core';
import { IconComponent } from "../icon/icon.component";

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss'
})
export class BackButtonComponent {
  label = input<string>('');

  goBack(): void {
    history.back();
  }
}
