import { Component, inject } from '@angular/core';
import { CourseService } from '../../../features/courses/services/course.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CourseCardComponent } from '../../../features/courses/components/course-card/course-card.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-courses-overview',
    templateUrl: './courses-overview.component.html',
    styleUrls: ['./courses-overview.component.scss'],
    standalone: true,
    imports: [CourseCardComponent, RouterLink]
})
export class CoursesOverviewComponent {
  private courseService = inject(CourseService);

  courses = toSignal(this.courseService.getCourses(), { initialValue: [] });
}
