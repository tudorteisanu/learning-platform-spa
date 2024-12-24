import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, filter, tap } from 'rxjs';
import { Lesson } from '@/App/shared/models/lesson.model';
import { Question } from '@/App/shared/models/question.model';
import { AddLesson } from '../models/add-lesson.model';
import { Content } from '@/App/shared/models/content.model';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  private readonly http = inject(HttpClient);
  private lessonSubject = new BehaviorSubject<Lesson | null>(null);
  private lessonsSubject = new BehaviorSubject<Lesson[]>([] as Lesson[]);
  private lessonContentCacheSubject = new BehaviorSubject<string>('');

  lessonContentCache$ = this.lessonContentCacheSubject.asObservable();
  lesson$ = this.lessonSubject.asObservable();
  lessons$ = this.lessonsSubject.asObservable();

  getLessonDetails(id: number): void {
    this.http.get<Lesson>(`/lessons/${id}`)
      .subscribe((lesson) => {
        this.lessonSubject.next(lesson);
        this.lessonContentCacheSubject.next(this.stringifyContent(lesson.content));
      });
  }

  fetch(params: Record<string, any>) {
    return this.http.get<Lesson[]>('/lessons', { params }).pipe(tap((lessons) => {
      this.lessonsSubject.next([...this.lessonsSubject.getValue(), ...lessons])
    }));
  }

  updateQuestion(id: number, data: Partial<Question>) {
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

  create(courseId: number, lesson: AddLesson): Observable<Lesson>{
    return this.http.post<Lesson>('/lessons', { ...lesson, courseId }).pipe(tap((lesson) => {
      this.lessonsSubject.next([...this.lessonsSubject.getValue(), lesson])
    }));
  }

  update(id: number, data: Partial<Lesson>) {
    this.http.patch<Lesson>(`/lessons/${id}`, data)
      .subscribe((response) => {
        this.lessonSubject.next(response);
        this.lessonContentCacheSubject.next(this.stringifyContent(response.content));
      });
  }

  stringifyContent(content: Content[]) {
    return JSON.stringify(content.map(({id, type, data, position}) => ({
      id, type, data, position
    })));
  }

  filterBy(filterBy: (filter: any) => boolean): Observable<Lesson[]> {
    return this.lessonsSubject.pipe(filter(filterBy));
  }
}
