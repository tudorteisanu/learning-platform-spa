import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  isVisibile = input(false);

  label = input.required<string>()

  show = output<void>();
  hide = output<void>();

  emitShow(): void {
    this.show.emit();
  }

  emitHide(): void {
    this.hide.emit();
  }
}
