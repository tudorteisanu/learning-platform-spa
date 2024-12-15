import { Component, computed, inject, input, signal } from '@angular/core';
import { Question } from 'src/app/shared/models/question.model';
import { QuestionOptionsComponent } from "../question-options/question-options.component";
import { Option } from 'src/app/shared/models/option.model';
import { QuestionsService } from '../../services/questions.service';
import { LessonsService } from '../../services/lessons.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [QuestionOptionsComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
  providers: [QuestionsService],
})
export class QuestionComponent {
  protected readonly questionsService = inject(QuestionsService);
  protected readonly lessonsService = inject(LessonsService);

  question = input.required<Question>();
  isExpanded = signal(true);
  userAnswer = computed(() => this.question().userAnswer);
  correctAnswer = computed(() => this.question().correctAnswer);
  answered = computed(() => !!this.userAnswer());
  correct = computed(() => this.userAnswer() === this.correctAnswer());

  answer(selected: Option): void {
    this.questionsService.answer(this.question().id, selected.id)
      .subscribe({
        next: () => {
          this.lessonsService.updateQuestion(this.question().id, {
            userAnswer: selected.id,
          });
        }
      })
  }

  toggleAnswers(): void {
    this.isExpanded.update(value => !value);
  }
}
