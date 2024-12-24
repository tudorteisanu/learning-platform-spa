import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { QuestionsFormService } from '../../services/questions-form.service';
import { Question } from '@/App/shared/models/question.model';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { IconComponent } from "../../../../shared/components/icon/icon.component";

@Component({
  selector: 'app-questions-list',
  standalone: true,
  imports: [ButtonComponent, IconComponent],
  templateUrl: './questions-list.component.html',
  styleUrl: './questions-list.component.scss'
})
export class QuestionsListComponent implements OnInit {
  protected readonly questionsService = inject(QuestionsService);
  protected readonly questionsFormService = inject(QuestionsFormService);

  lessonId = input.required<number>();

  questions = toSignal(this.questionsService.questions$, {initialValue: []});
  questionsById = computed(() => this.questions().filter(item => item.lessonId === this.lessonId()));

  ngOnInit(): void {
    const params = { lessonId: this.lessonId() };

    this.questionsService.fetch(params)
      .subscribe();
  }

  edit(value: Question) {
    this.questionsFormService.setSelectedQuestion(value.id);
    this.questionsFormService.setFormValue(value);
  }

  delete(id: number) {
    this.questionsService.delete(id).subscribe();
  }
}
