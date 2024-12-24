import { Injectable, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Question } from '@/App/shared/models/question.model';
import { QuestionsService } from './questions.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsFormService {
  protected readonly fb = inject(NonNullableFormBuilder);
  protected readonly questionsService = inject(QuestionsService);

  form = this.fb.group({
    questionText: ['', Validators.required],
    correctAnswer: [0, Validators.required],
    answers: [[] as any, Validators.required],
  });

  selectedQuestionId = signal<number | null>(null);

  getForm() {
    return this.form;
  }

  setSelectedQuestion(questionId: number | null) {
    this.selectedQuestionId.set(questionId);
  }

  setFormValue(value: Question) {
    this.form.patchValue(value);
  }

  submit(lessonId: number) {
    let request = this.questionsService.create({...this.form.getRawValue(), lessonId})
    const selectedQuestionId = this.selectedQuestionId();

    if (selectedQuestionId) {
      request = this.questionsService.update(selectedQuestionId, this.form.getRawValue());
    }

    return request.pipe(
      tap(() => {
        this.setSelectedQuestion(null);
        this.form.reset();
      })
    )
  }
}
