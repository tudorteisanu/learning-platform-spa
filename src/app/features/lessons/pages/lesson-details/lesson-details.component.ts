import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { LessonsService } from '../../services/lessons.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { LessonContentComponent } from "../../components/lesson-content/lesson-content.component";

@Component({
  selector: 'app-lesson-details',
  standalone: true,
  templateUrl: './lesson-details.component.html',
  styleUrls: ['./lesson-details.component.scss'],
  imports: [LessonContentComponent],
})
export class LessonDetailsComponent implements OnInit {
  private readonly lessonsService = inject(LessonsService);
  private readonly route = inject(ActivatedRoute);

  lesson = toSignal(this.lessonsService.lesson$)
  expandedQuestionId: string | null = null;
  selectedAnswer: string | null = null;
  isCorrect: boolean | null = null;

  ngOnInit(): void {
    const lessonId = this.route.snapshot.paramMap.get('id');
    if (lessonId) {
      this.lessonsService.getLessonDetails(lessonId);
    }
  }

  selectAnswer(selected: string, correct: string | null): void {
    this.selectedAnswer = selected;
    this.isCorrect = selected === correct;
    console.log(this.isCorrect)
  }

  toggleAnswers(questionId: string): void {
    this.expandedQuestionId = this.expandedQuestionId === questionId ? null : questionId;
  }
}
