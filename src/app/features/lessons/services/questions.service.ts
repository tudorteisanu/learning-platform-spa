import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Question } from 'src/app/shared/models/question.model';

@Injectable()
export class QuestionsService {
  protected readonly http = inject(HttpClient);
  apiUrl = '/questions';

  answer(questionId: string, optionId: string) {
    const answerUrl = `${this.apiUrl}/${questionId}/answer`;

    return this.http.post<Question>(answerUrl, { optionId });
  }
}
