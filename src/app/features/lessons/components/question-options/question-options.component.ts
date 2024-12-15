import { Component, computed, input, output } from '@angular/core';
import { Option } from 'src/app/shared/models/option.model';
import { IconComponent } from "../../../../shared/components/icon/icon.component";

@Component({
  selector: 'app-question-options',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './question-options.component.html',
  styleUrl: './question-options.component.scss'
})
export class QuestionOptionsComponent {
  options = input.required<Option[]>();
  userAnswer = input.required<string | null>();
  correctAnswer = input.required<string | null>();

  select = output<Option>();

  disabled = computed(() => !!this.userAnswer());

  emitSelect(option: Option) {
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
