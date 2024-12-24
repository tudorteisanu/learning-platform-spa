import { Component, inject, input, signal } from '@angular/core';
import { TabsComponent } from "../../../../shared/components/tabs/tabs.component";
import { LessonsService } from '../../../../features/lessons/services/lessons.service';
import { QuestionFormComponent } from "../../../../features/questions/components/question-form/question-form.component";
import { QuestionsListComponent } from "../../../../features/questions/components/questions-list/questions-list.component";
import { AnswerFormComponent } from "../../../../features/answers/components/answer-form/answer-form.component";
import { AnswersListComponent } from "../../../../features/answers/components/answers-list/answers-list.component";
import { ContentFormComponent } from "../../../../features/content/components/content-form/content-form.component";
import { ContentListComponent } from '@/App/features/content/components/content-list/content-list.component';

@Component({
  selector: 'app-lesson-edit',
  standalone: true,
  imports: [
    TabsComponent,
    QuestionFormComponent,
    QuestionsListComponent,
    AnswerFormComponent,
    AnswersListComponent,
    ContentFormComponent,
    ContentListComponent,
],
  templateUrl: './lesson-edit.component.html',
  styleUrl: './lesson-edit.component.scss',
})
export class LessonEditComponent {
  protected readonly lessonsService = inject(LessonsService);

  lessonId = input.required<number>();

  selectedTab = signal<string>('content');

  tabs = [
    { title: 'Lesson', alias: 'lesson' },
    { title: 'Questions', alias: 'question' },
    { title: 'Content', alias: 'content' },
  ];
}
