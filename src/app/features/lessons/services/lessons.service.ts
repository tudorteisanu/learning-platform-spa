import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, filter, tap } from 'rxjs';
import { Lesson, LessonContent } from 'src/app/shared/models/lesson.model';
import { Question } from 'src/app/shared/models/question.model';
import { Answer } from 'src/app/shared/models/answer.model';
import { AddLesson } from '../models/add-lesson.model';

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

  getLessonDetails(id: string): void {
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

  create(courseId: string, lesson: AddLesson): Observable<Lesson>{
    return this.http.post<Lesson>('/lessons', { ...lesson, courseId }).pipe(tap((lesson) => {
      this.lessonsSubject.next([...this.lessonsSubject.getValue(), lesson])
    }));
  }

  update(id: string, data: Partial<Lesson>) {
    this.http.patch<Lesson>(`/lessons/${id}`, data)
      .subscribe((response) => {
        this.lessonSubject.next(response);
        this.lessonContentCacheSubject.next(this.stringifyContent(response.content));
      });
  }

  stringifyContent(content: LessonContent[]) {
    return JSON.stringify(content.map(({id, type, data, position}) => ({
      id, type, data, position
    })));
  }

  addQuestionOption(questionId: string, option: Answer) {
    const lesson = this.lessonSubject.getValue();

    if (!lesson) {
      return;
    }

    this.lessonSubject.next({
      ...lesson,
      questions: lesson.questions.map(item => {
        if (item.id === questionId) {
          return {
            ...item,
            answers: [
              ...item.answers,
              option
            ]
           };
        }

        return item;
      })
    })
  }

  filterBy(filterBy: (filter: any) => boolean): Observable<Lesson[]> {
    return this.lessonsSubject.pipe(filter(filterBy));
  }
}
