import { Component, inject } from '@angular/core';
import { CourseService } from 'src/app/features/courses/services/course.service';
import { Course } from 'src/app/shared/models/course.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { CourseCardComponent } from "../course-card/course-card.component";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  standalone: true,
  imports: [CourseCardComponent],
})
export class CourseListComponent {
  private courseService = inject(CourseService);
  courses = toSignal(this.courseService.getCourses(), { initialValue: [] });
}
