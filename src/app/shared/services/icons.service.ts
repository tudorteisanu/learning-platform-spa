import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  protected readonly http = inject(HttpClient);

  private readonly icons = new Map<string, string>();

  fetchIcon(name: string, rootFolder: string) {
    const icon = this.icons.get(name);

    if (icon) {
      return of(icon);
    }

    const url = `${window.location.origin}/${rootFolder}/${name}.svg`;

    return this.http.get(url, { responseType: "text" })
      .pipe(
        take(1),
        tap((icon) => {
        this.icons.set(name, icon);
      }
    ),
      catchError((error) => {
        console.error(`Failed to load icon: ${name} from ${url}`, error);
        return of('')
      })
    )
  }

  getIcon(name: string) {
    return this.icons.get(name);
  }
}
