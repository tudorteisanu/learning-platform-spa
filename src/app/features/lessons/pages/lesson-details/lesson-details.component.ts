import { Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { LessonsService } from '../../services/lessons.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { LessonContentComponent } from "../../components/lesson-content/lesson-content.component";
import { QuestionComponent } from '../../components/question/question.component';

@Component({
  selector: 'app-lesson-details',
  standalone: true,
  templateUrl: './lesson-details.component.html',
  styleUrls: ['./lesson-details.component.scss'],
  imports: [LessonContentComponent, QuestionComponent],
})
export class LessonDetailsComponent implements OnInit {
  private readonly lessonsService = inject(LessonsService);
  private readonly route = inject(ActivatedRoute);

  lesson = toSignal(this.lessonsService.lesson$);

  ngOnInit(): void {
    const lessonId = this.route.snapshot.paramMap.get('id');

    if (lessonId) {
      this.lessonsService.getLessonDetails(lessonId);
    }
  }
}
