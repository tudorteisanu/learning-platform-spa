import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Lesson } from 'src/app/shared/models/lesson.model';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  private readonly http = inject(HttpClient);
  private lessonSubject = new BehaviorSubject<Lesson | null>(null);

  lesson$ = this.lessonSubject.asObservable();

  getLessonDetails(id: string): void {
    this.http.get<Lesson>(`/lessons/${id}`).subscribe((lesson) => {
      this.lessonSubject.next(lesson);
    });
  }
}
