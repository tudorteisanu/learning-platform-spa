import { Component, OnInit, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LessonsService } from '../../../lessons/services/lessons.service';
import { QuestionsService } from '../../services/questions.service';
import { QuestionFormComponent } from '../question-form/question-form.component';

@Component({
  selector: 'app-edit-questions',
  standalone: true,
  imports: [QuestionFormComponent],
  templateUrl: './edit-questions.component.html',
  styleUrl: './edit-questions.component.scss'
})
export class EditQuestionsComponent implements OnInit {
  protected readonly questionsService = inject(QuestionsService);
  protected readonly lessonsService = inject(LessonsService);

  lesson = toSignal(this.lessonsService.lesson$, { initialValue: null })

  questions = toSignal(this.questionsService.questions$, {initialValue: [] });
  questionsByLessonId = computed(() => this.questions().filter((item) => item.lessonId == this.lesson()?.id));

  ngOnInit(): void {
    const lessonId = this.lesson()?.id;

    if (!lessonId) {
      return;
    }

    this.questionsService.fetch({ lessonId }).subscribe()
  }
}
