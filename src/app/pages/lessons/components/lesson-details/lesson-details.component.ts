import { Component, OnInit, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { inject } from '@angular/core';
import { LessonsService } from '@/App/features/lessons/services/lessons.service';
import { QuestionComponent } from '@/App/features/questions/components/question/question.component';
import { BackButtonComponent } from "@/App/shared/components/back-button/back-button.component";
import { QuestionsService } from '@/App/features/questions/services/questions.service';
import { AnswersService } from '@/App/features/answers/services/answers.service';
import { ContentDetailsComponent } from '@/App/features/content/components/content-details/content-details.component';

@Component({
  selector: 'app-lesson-details',
  standalone: true,
  templateUrl: './lesson-details.component.html',
  styleUrls: ['./lesson-details.component.scss'],
  imports: [
    ContentDetailsComponent,
    QuestionComponent,
    BackButtonComponent,
    RouterLink,
  ],
})
export class LessonDetailsComponent implements OnInit {
  private readonly lessonsService = inject(LessonsService);
  private readonly questionsService = inject(QuestionsService);
  private readonly answersService = inject(AnswersService);

  lessonId = input.required<number>();

  lesson = toSignal(this.lessonsService.lesson$);
  questions = toSignal(this.questionsService.questions$);

  ngOnInit(): void {
    this.lessonsService.getLessonDetails(this.lessonId());
    this.questionsService.fetch({lessonId: this.lessonId()})
      .subscribe()
    this.answersService.fetch()
      .subscribe()
  }
}
