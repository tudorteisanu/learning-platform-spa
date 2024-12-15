import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, inject, input, viewChild } from '@angular/core';
import { catchError, of } from 'rxjs';

const DEFAULT_ROOT_FOLDER = 'icons';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent implements OnInit {
  protected readonly http = inject(HttpClient);
  private readonly icons = new Map<string, string>();
  private readonly renderer = inject(Renderer2);
  private readonly hostElement = inject(ElementRef);

  rootFolder = input(DEFAULT_ROOT_FOLDER);
  name = input.required<string>();

  element = viewChild.required<ElementRef<HTMLDivElement>>('content');

  ngOnInit(): void {
    this.fetchIcon();
  }

  private fetchIcon() {
    if (this.icons.get(this.name()) || !this.name()) {
      this.injectIcon();
      return;
    }

    const url = `${window.location.origin}/${this.rootFolder()}/${this.name()}.svg`;

    this.http.get(url, { responseType: "text" })
      .pipe(
        catchError((error) => {
          console.error(`Failed to load icon: ${this.name()} from ${url}`, error);
          return of('');
        })
      )
      .subscribe((icon) => {
        this.icons.set(this.name(), icon);
        this.injectIcon();
      });
  }

  private injectIcon(): void {
    const icon = this.icons.get(this.name());

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
