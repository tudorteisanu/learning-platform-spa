import { Component, inject, input, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionsService } from '../../services/questions.service';
import { AnswersService } from 'src/app/features/answers/services/answers.service';
import { MultiselectComponent } from 'src/app/shared/components/multiselect/multiselect.component';
import { QuestionsFormService } from '../../services/questions-form.service';

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [ReactiveFormsModule, MultiselectComponent],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss'
})
export class QuestionFormComponent {
  protected readonly questionsService = inject(QuestionsService);
  protected readonly questionsFormService = inject(QuestionsFormService);
  protected readonly answersService = inject(AnswersService);
  protected readonly answers = signal([]);

  selectedItems = signal([]);
  form = this.questionsFormService.getForm();

  lessonId = input.required<string>();
  fetchUrl = input<string>('');


  submit() {
    this.questionsFormService.submit(this.lessonId())
      .subscribe();
  }
}
