// src/app/features/courses/pages/course-details/course-details.component.ts
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgIf } from '@angular/common';
import { CourseCardComponent } from "../../components/course-card/course-card.component";
import { LessonsListComponent } from "../../../lessons/components/lessons-list/lessons-list.component";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
  standalone: true,
  imports: [NgIf, CourseCardComponent, LessonsListComponent],
})
export class CourseDetailsComponent {
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);

  courseId = this.route.snapshot.paramMap.get('id')!;
  course = toSignal(this.courseService.getCourseById(this.courseId), {
    initialValue: null,
  });
  lessons = toSignal(
    this.courseService.getLessonsByCourseId(this.courseId),
    { initialValue: [] }
  );
}
