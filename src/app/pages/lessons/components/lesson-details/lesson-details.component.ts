import { Component, OnInit, computed, input, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { LessonsService } from '../../../../features/lessons/services/lessons.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { LessonContentComponent } from "../../../../features/lesson-content/components/lesson-content/lesson-content.component";
import { QuestionComponent } from '../../../../features/questions/components/question/question.component';
import { BackButtonComponent } from "../../../../shared/components/back-button/back-button.component";
import { QuestionsService } from 'src/app/features/questions/services/questions.service';

@Component({
  selector: 'app-lesson-details',
  standalone: true,
  templateUrl: './lesson-details.component.html',
  styleUrls: ['./lesson-details.component.scss'],
  imports: [LessonContentComponent, QuestionComponent, BackButtonComponent, RouterLink],
})
export class LessonDetailsComponent implements OnInit {
  private readonly lessonsService = inject(LessonsService);
  private readonly questionsService = inject(QuestionsService);

  lessonId = input.required<string>();

  lesson = toSignal(this.lessonsService.lesson$);
  questions = toSignal(this.questionsService.questions$);

  ngOnInit(): void {
    this.lessonsService.getLessonDetails(this.lessonId());
    this.questionsService.fetch({lessonId: this.lessonId()})
      .subscribe()
  }
}
