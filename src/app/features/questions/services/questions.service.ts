import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Answer } from 'src/app/shared/models/answer.model';
import { Question } from 'src/app/shared/models/question.model';
import { unionArraysByAscendPriority } from 'src/app/utils';

@Injectable({providedIn: 'root'})
export class QuestionsService {
  protected readonly http = inject(HttpClient);

  questionsSubject = new BehaviorSubject<Question[]>([]);
  questions$ = this.questionsSubject.asObservable();

  apiUrl = '/questions';

  fetch(params: Record<string, any> = {}) {
    return this.http.get<Question[]>(this.apiUrl, { params })
    .pipe(tap((value) => {
      this.questionsSubject.next(unionArraysByAscendPriority(this.questionsSubject.getValue(), value, 'id'));
    }))
  }

  answer(questionId: string, answerId: string) {
    const answerUrl = `${this.apiUrl}/${questionId}/answer`;

    return this.http.post<Question>(answerUrl, { answerId })
      .pipe(
        tap((value) => {
          this.updateQuestion(value);
        })
      );
  }

  update(questionId: string, question: Partial<Question>) {
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

  delete(id: string) {
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

  removeQuestionById(id: string) {
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

    this.questionsSubject.next(collection);
  }
}
