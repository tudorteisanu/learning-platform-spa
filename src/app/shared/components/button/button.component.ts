import { Component, input } from '@angular/core';
import { booleanTransformer } from 'src/app/utils';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  disabled = input(false);
  loading = input(false);
  text = input(false, { transform: booleanTransformer });
}
