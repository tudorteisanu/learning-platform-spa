import { Component, computed, input, output } from '@angular/core';
import { Answer } from 'src/app/shared/models/answer.model';
import { IconComponent } from "../../../../shared/components/icon/icon.component";

@Component({
  selector: 'app-question-answers',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './question-answers.component.html',
  styleUrl: './question-answers.component.scss'
})
export class QuestionAnswersComponent {
  answers = input.required<Answer[]>();
  userAnswer = input.required<string | null>();
  correctAnswer = input.required<string | null>();

  select = output<Answer>();

  disabled = computed(() => !!this.userAnswer());

  emitSelect(option: Answer) {
    if (this.disabled()) {
      return;
    }

    this.select.emit(option);
  }

  isCorrect(optionId: string): boolean {
    return optionId === this.correctAnswer();
  }


  isIncorrect(optionId: string): boolean {
    return !!this.userAnswer() && optionId === this.userAnswer() && !this.isCorrect(optionId);
  }
}
