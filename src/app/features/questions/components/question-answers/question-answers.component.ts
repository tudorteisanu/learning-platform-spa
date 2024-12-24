import { Component, computed, inject, input, output } from '@angular/core';
import { Answer } from '@/App/shared/models/answer.model';
import { IconComponent } from "@/App/shared/components/icon/icon.component";
import { AnswersService } from '@/App/features/answers/services/answers.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-question-answers',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './question-answers.component.html',
  styleUrl: './question-answers.component.scss'
})
export class QuestionAnswersComponent {
  protected readonly answersService = inject(AnswersService);

  answers = input.required<number[]>();
  userAnswer = input.required<number | null>();
  correctAnswer = input.required<number | null>();

  answersSignal = toSignal(this.answersService.answers$, {initialValue: []});
  fullAnswers = computed(() => this.answersSignal().filter(item => this.answers().includes(item.id)))

  select = output<Answer>();
  disabled = computed(() => !!this.userAnswer());

  emitSelect(option: Answer) {
    if (this.disabled()) {
      return;
    }

    this.select.emit(option);
  }

  isCorrect(optionId: number): boolean {
    return optionId === this.correctAnswer();
  }

  isIncorrect(optionId: number): boolean {
    return !!this.userAnswer() && optionId === this.userAnswer() && !this.isCorrect(optionId);
  }
}
