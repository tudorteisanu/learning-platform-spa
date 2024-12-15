import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CourseCardComponent } from "../../components/course-card/course-card.component";
import { LessonsListComponent } from "../../../lessons/components/lessons-list/lessons-list.component";
import { Course } from 'src/app/shared/models/course.model';

@Component({
    selector: 'app-course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.scss'],
    standalone: true,
    imports: [CourseCardComponent, LessonsListComponent]
})
export class CourseDetailsComponent {
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);

  courseId = this.route.snapshot.paramMap.get('id')!;
  course = toSignal(this.courseService.getCourseById(this.courseId), {
    initialValue: {} as Course,
  });
  lessons = toSignal(
    this.courseService.getLessonsByCourseId(this.courseId),
    { initialValue: [] }
  );
}
