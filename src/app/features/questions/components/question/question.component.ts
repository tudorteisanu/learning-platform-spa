import { Component, computed, inject, input, signal } from '@angular/core';
import { Question } from '@/App/shared/models/question.model';
import { QuestionAnswersComponent } from "../question-answers/question-answers.component";
import { Answer } from '@/App/shared/models/answer.model';
import { QuestionsService } from '../../services/questions.service';
import { LessonsService } from '../../../lessons/services/lessons.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [QuestionAnswersComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
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

  answer(selected: Answer): void {
    this.questionsService.answer(this.question().id, selected.id)
      .subscribe();
  }

  toggleAnswers(): void {
    this.isExpanded.update(value => !value);
  }
}
