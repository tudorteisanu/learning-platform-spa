import { Component, ElementRef, OnInit, Renderer2, inject, input, viewChild } from '@angular/core';
import { IconsService } from '../../services/icons.service';

const DEFAULT_ROOT_FOLDER = 'icons';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  private readonly renderer = inject(Renderer2);
  private readonly hostElement = inject(ElementRef);

  private readonly iconsService = inject(IconsService);

  rootFolder = input(DEFAULT_ROOT_FOLDER);
  name = input.required<string>();

  element = viewChild.required<ElementRef<HTMLDivElement>>('content');

  ngOnInit(): void {
    this.fetchIcon();
  }

  fetchIcon() {
    this.iconsService.fetchIcon(this.name(), this.rootFolder())
      .subscribe({
        next: icon => this.injectIcon(icon),
      });
  }

  private injectIcon(icon: string): void {
    if (!icon) {
      return;
    }

    this.renderer.setProperty(this.element().nativeElement, 'innerHTML', icon);
    this.setIconSize();
  }

  private setIconSize(): void {
    const { height, width } = getComputedStyle(this.hostElement.nativeElement);

    if (width !== 'auto' && width) {
      this.renderer.setStyle(this.element().nativeElement, 'width', width);
    }

    if (height !== 'auto' && height) {
      this.renderer.setStyle(this.element().nativeElement, 'height', height);
    }
  }
}
