import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-accordion-item',
  standalone: true,
  imports: [],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.scss'
})
export class AccordionItemComponent {
  label = input('');
  expanded =signal(false);

  toggle(): void {
    this.expanded.update(value => !value);
  }
}
