// @/App/features/courses/components/lessons-list/lessons-list.component.ts
import { Component, Input, computed, inject, input } from '@angular/core';
import { Lesson } from '@/App/shared/models/lesson.model';
import { RouterLink } from '@angular/router';
import { LessonsService } from '../../services/lessons.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-lessons-list',
    templateUrl: './lessons-list.component.html',
    styleUrls: ['./lessons-list.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class LessonsListComponent {
  protected readonly lessonsService = inject(LessonsService);

  courseId = input.required<number>();
  lessons = toSignal(this.lessonsService.lessons$, { initialValue: [] })
  lessonsByCourseId = computed(() => this.lessons().filter(item => item.courseId === this.courseId()));
}
