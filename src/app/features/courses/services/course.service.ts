import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Course } from '../../../shared/models/course.model';
import { PaginatedResponse } from 'src/app/shared/models/paginated-response.model';
import { Lesson } from 'src/app/shared/models/lesson.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);
  private apiUrl = '/courses';

  getCourses(): Observable<Course[]> {
    return this.http.get<PaginatedResponse<Course>>(this.apiUrl)
      .pipe(map((response) => response.data));
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  getLessonsByCourseId(courseId: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.apiUrl}/${courseId}/lessons`);
  }
}
