// src/app/features/courses/pages/courses-overview/courses-overview.component.ts
import { Component, inject } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from 'src/app/shared/models/course.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgFor } from '@angular/common';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses-overview',
  templateUrl: './courses-overview.component.html',
  styleUrls: ['./courses-overview.component.scss'],
  standalone: true,
  imports: [NgFor, CourseCardComponent, RouterLink],
})
export class CoursesOverviewComponent {
  private courseService = inject(CourseService);
  courses = toSignal(this.courseService.getCourses(), { initialValue: [] });
}
