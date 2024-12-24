import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Question } from '@/App/shared/models/question.model';
import { unionArraysByAscendPriority } from '@/App/utils';

@Injectable({providedIn: 'root'})
export class QuestionsService {
  protected readonly http = inject(HttpClient);

  questionsSubject = new BehaviorSubject<Question[]>([]);
  questions$ = this.questionsSubject.asObservable();

  apiUrl = '/questions';

  fetch(params: Record<string, any> = {}) {
    return this.http.get<Question[]>(this.apiUrl, { params })
    .pipe(
      tap((value) => {
        this.setQuestions(value);
      })
    );

  }

  answer(questionId: number, answerId: number) {
    const answerUrl = `${this.apiUrl}/${questionId}/answer`;

    return this.http.post<Question>(answerUrl, { answerId })
      .pipe(
        tap((value) => {
          console.log(this.questionsSubject.getValue());
          this.updateQuestion(value);
        })
      );
  }

  update(questionId: number, question: Partial<Question>) {
    const answerUrl = `${this.apiUrl}/${questionId}`;

    return this.http.patch<Question>(answerUrl, question)
      .pipe(
        tap((question) => {
          this.setQuestions([question]);
        }
      ));
  }

  create(payload: Pick<Question, 'questionText' | 'lessonId'>) {
    return this.http.post<Question>(this.apiUrl, payload)
      .pipe(
        tap((question) => {
          this.setQuestions([question]);
        }
      ));
  }

  delete(id: number) {
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<void>(url)
      .pipe(
        tap(() => {
          this.removeQuestionById(id);
        }
      ));
  }

  setQuestions(questions: Question[]) {
    const collection = unionArraysByAscendPriority(this.questionsSubject.getValue(), questions, 'id');

    this.questionsSubject.next(collection)
  }

  removeQuestionById(id: number) {
    const collection = this.questionsSubject.getValue().filter(item => item.id !== id);

    this.questionsSubject.next(collection)
  }

  updateQuestion(question: Question) {
   const collection = this.questionsSubject.getValue()
    .map((item) => {
      if (item.id === question.id) {
        return {
          ...item,
          ...question,
        }
      }

      return item;
    });

    this.setQuestions(collection);
  }
}
