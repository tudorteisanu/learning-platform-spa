// src/app/features/courses/components/lessons-list/lessons-list.component.ts
import { Component, Input, input } from '@angular/core';
import { Lesson } from 'src/app/shared/models/lesson.model';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.scss'],
  standalone: true,
  imports: [NgFor, RouterLink],
})
export class LessonsListComponent {
  lessons = input.required<Lesson[]>()
}
