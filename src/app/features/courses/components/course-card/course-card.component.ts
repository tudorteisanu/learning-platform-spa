import { Component, input } from '@angular/core';
import { Course } from '@/App/shared/models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  standalone: true,
  imports: [],
})
export class CourseCardComponent {
  course = input<Course | null>(null);
}
