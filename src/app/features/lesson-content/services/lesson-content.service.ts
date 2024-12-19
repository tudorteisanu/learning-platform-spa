import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LessonContentService {
  protected readonly http = inject(HttpClient);
  private apiUrl = '/lesson-content';

  addContent(payload: any) {
    return this.http.post(this.apiUrl, payload);
  }
}
