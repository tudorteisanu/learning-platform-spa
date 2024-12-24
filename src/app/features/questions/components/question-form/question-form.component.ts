import { Component, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionsService } from '../../services/questions.service';
import { AnswersService } from '@/App/features/answers/services/answers.service';
import { MultiselectComponent } from '@/App/shared/components/multiselect/multiselect.component';
import { QuestionsFormService } from '../../services/questions-form.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Answer } from '@/App/shared/models/answer.model';
import { ButtonComponent } from "../../../../shared/components/button/button.component";

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [ReactiveFormsModule, MultiselectComponent, ButtonComponent],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss'
})
export class QuestionFormComponent {
  protected readonly questionsService = inject(QuestionsService);
  protected readonly questionsFormService = inject(QuestionsFormService);
  protected readonly answersService = inject(AnswersService);
  protected readonly answers = toSignal(this.answersService.answers$, {initialValue: []});
  protected readonly form = this.questionsFormService.getForm();
  protected readonly formValues = toSignal(this.form.valueChanges, {initialValue: this.form.getRawValue()});
  readonly selectedAnswers = computed(() => this.formValues().answers.map(this.getAnswerById.bind(this)));

  valueChangesEffect = effect(() => {
    console.log(this.formValues())
  })

  lessonId = input.required<number>();

  submit() {
    this.questionsFormService.submit(this.lessonId())
      .subscribe();
  }

  private getAnswerById(answerId: number) {
    return this.answers().find(item => item.id === answerId)
  }
}
