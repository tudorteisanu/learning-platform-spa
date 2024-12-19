import { Component, inject, input, signal } from '@angular/core';
import { TabsComponent } from "../../../../shared/components/tabs/tabs.component";
import { LessonsService } from '../../../../features/lessons/services/lessons.service';
import { QuestionFormComponent } from "../../../../features/questions/components/question-form/question-form.component";
import { QuestionsListComponent } from "../../../../features/questions/components/questions-list/questions-list.component";
import { AnswerFormComponent } from "../../../../features/answers/components/answer-form/answer-form.component";
import { AnswersListComponent } from "../../../../features/answers/components/answers-list/answers-list.component";

@Component({
  selector: 'app-lesson-edit',
  standalone: true,
  imports: [
    TabsComponent,
    QuestionFormComponent,
    QuestionsListComponent,
    AnswerFormComponent,
    AnswersListComponent,
  ],
  templateUrl: './lesson-edit.component.html',
  styleUrl: './lesson-edit.component.scss',
})
export class LessonEditComponent {
  protected readonly lessonsService = inject(LessonsService);

  lessonId = input.required<string>();

  selectedTab = signal<string>('question');

  tabs = [
    { title: 'Lesson', alias: 'lesson' },
    { title: 'Questions', alias: 'question' },
    { title: 'Content', alias: 'content' },
  ];
}
