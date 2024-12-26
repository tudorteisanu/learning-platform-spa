import { Component, computed, inject, input } from '@angular/core';
import { CourseService } from '../../../../features/courses/services/course.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CourseCardComponent } from "../../../../features/courses/components/course-card/course-card.component";
import { LessonsListComponent } from "../../../../features/lessons/components/lessons-list/lessons-list.component";
import { BackButtonComponent } from "../../../../shared/components/back-button/back-button.component";
import { AddLessonDialogComponent } from "../../../../features/lessons/components/add-lesson-dialog/add-lesson-dialog.component";
import { LessonsService } from '@/App/features/lessons/services/lessons.service';


@Component({
    selector: 'app-course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.scss'],
    standalone: true,
    imports: [CourseCardComponent, LessonsListComponent, BackButtonComponent, AddLessonDialogComponent]
})
export class CourseDetailsComponent {
  protected readonly courseService = inject(CourseService);
  protected readonly lessonsService = inject(LessonsService);

  courseId = input.required<number>();

  course = toSignal(this.courseService.course$, {initialValue: null})
  lessons = toSignal(this.lessonsService.lessons$, {initialValue: []})
}
