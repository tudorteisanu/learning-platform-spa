import { Component, computed, input } from '@angular/core';
import { LessonContent } from 'src/app/shared/models/lesson.model';

@Component({
  selector: 'app-lesson-content',
  standalone: true,
  imports: [],
  templateUrl: './lesson-content.component.html',
  styleUrl: './lesson-content.component.scss'
})
export class LessonContentComponent {
  content = input.required<LessonContent[]>();
  sortedContent = computed(() => this.content().sort(this.sortByPosition));

  sortByPosition(first: LessonContent, second: LessonContent): number {
    return first.position - second.position;
  }
}
