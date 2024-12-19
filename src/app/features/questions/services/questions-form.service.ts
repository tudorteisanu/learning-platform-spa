import { Injectable, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Question } from 'src/app/shared/models/question.model';
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
    correctAnswer: ['', Validators.required],
    answers: [[] as any, Validators.required],
  });

  selectedQuestionId = signal<string | null>(null);

  getForm() {
    return this.form;
  }

  setSelectedQuestion(questionId: string | null) {
    this.selectedQuestionId.set(questionId);
  }

  setFormValue(value: Question) {
    this.form.patchValue(value);
  }

  submit(lessonId: string) {
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
