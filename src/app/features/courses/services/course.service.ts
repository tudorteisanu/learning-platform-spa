import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Course } from '../../../shared/models/course.model';
import { PaginatedResponse } from 'src/app/shared/models/paginated-response.model';
import { Lesson } from 'src/app/shared/models/lesson.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);
  private apiUrl = '/courses';

  private readonly courseSubject = new BehaviorSubject<Course | null>(null);

  course$ = this.courseSubject.asObservable();

  getCourses(): Observable<Course[]> {
    return this.http.get<PaginatedResponse<Course>>(this.apiUrl)
      .pipe(map((response) => response.data));
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(tap((course) => {
      this.courseSubject.next(course);
    }));
  }

  getLessonsByCourseId(courseId: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.apiUrl}/${courseId}/lessons`);
  }
}
