import { Content } from '@/App/shared/models/content.model';
import { unionArraysByAscendPriority } from '@/App/utils';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  protected readonly http = inject(HttpClient);
  protected readonly fb = inject(NonNullableFormBuilder);

  protected readonly contentSubject = new BehaviorSubject<Content[]>([]);
  content$ = this.contentSubject.asObservable();

  private apiUrl = '/content';

  form = this.fb.group({
    type: ['text', Validators.required],
    data: ['', Validators.required],
    position: [0, Validators.required],
  });

  selectedContentId = signal<number | null>(null);

  fetch(params = {}) {
    return this.http.get<Content[]>(this.apiUrl, params).pipe(
      tap(response => {
        this.setContent(response);
      })
    );
  }

  getForm() {
    return this.form;
  }

  create(payload: Omit<Content, 'id'>) {
    return this.http.post<Content>(this.apiUrl, payload).pipe(
      tap(response => {
        this.setContent([response]);
      })
    );
  }

  update(id: number, payload: Omit<Partial<Content>, 'id'>) {
    const url = `${this.apiUrl}/${id}`;

    return this.http.patch<Content>(url, payload).pipe(
      tap(response => {
        this.setContent([response]);
      })
    );
  }

  submit(lessonId: number) {
    const payload: Omit<Content, 'id'> = {...this.form.getRawValue(), lessonId};
    const selectedContentId = this.selectedContentId();

    if (selectedContentId) {
      return this.update(selectedContentId, payload);
    }

    return this.create(payload);
  }

  setContent(content: Content[]) {
    const items = unionArraysByAscendPriority(this.contentSubject.getValue(), content, 'id');

    this.contentSubject.next(items);
  }
}
