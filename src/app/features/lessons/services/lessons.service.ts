import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Lesson } from 'src/app/shared/models/lesson.model';
import { Question } from 'src/app/shared/models/question.model';

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

  updateQuestion(id: string, data: Partial<Question>) {
    const lesson = this.lessonSubject.getValue();

    if (!lesson) {
      return;
    }

    const questions = lesson.questions.map(item => {
      if (item.id === id) {
        return { ...item, ...data };
      }

      return item
    });

    this.lessonSubject.next({
      ...lesson,
      questions,
    })
  }
}
