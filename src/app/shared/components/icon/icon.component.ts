import { Component, OnChanges, SimpleChanges, inject, viewChild, ElementRef, input } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  standalone: true,
})
export class IconComponent implements OnChanges {
  name = input.required<string>();
  contentRef = viewChild.required<ElementRef>('content');

  private static iconCache: Map<string, string> = new Map();
  private static ongoingFetches: Map<string, Promise<string>> = new Map();

  private readonly httpBackend = inject(HttpBackend);
  private http = new HttpClient(this.httpBackend);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] && this.name()) {
      this.loadIcon(this.name());
    }
  }

  injectSvg(content: string): void {
    this.contentRef().nativeElement.innerHTML = content;
  }

  private async loadIcon(iconName: string): Promise<void> {
    if (IconComponent.iconCache.has(iconName)) {
      this.injectSvg(IconComponent.iconCache.get(iconName) ?? '')
      return;
    }

    if (IconComponent.ongoingFetches.has(iconName)) {
      const cachedPromise = IconComponent.ongoingFetches.get(iconName);

      if (cachedPromise) {
        const svgContent = await cachedPromise;
        this.injectSvg(svgContent);
      }

      return;
    }

    const fetchPromise = this.fetchIcon(iconName);
    IconComponent.ongoingFetches.set(iconName, fetchPromise);

    try {
      const svgContent = await fetchPromise;
      IconComponent.iconCache.set(iconName, svgContent)
     this.injectSvg(svgContent);
    } finally {
      IconComponent.ongoingFetches.delete(iconName);
    }
  }

  private fetchIcon(iconName: string): Promise<string> {
    const request$: Observable<string> = this.http.get(`/icons/${iconName}.svg`, { responseType: 'text' });

    return lastValueFrom(request$);
  }
}
