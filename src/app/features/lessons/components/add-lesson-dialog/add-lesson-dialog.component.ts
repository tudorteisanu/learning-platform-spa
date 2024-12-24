import { Component, inject, input, signal } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonsService } from '../../services/lessons.service';
import { DialogComponent } from "../../../../shared/components/dialog/dialog.component";

@Component({
  selector: 'app-add-lesson-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, DialogComponent],
  templateUrl: './add-lesson-dialog.component.html',
  styleUrl: './add-lesson-dialog.component.scss'
})
export class AddLessonDialogComponent {
  protected readonly fb = inject(NonNullableFormBuilder);
  protected readonly lessonsService = inject(LessonsService);

  courseId = input<number>();
  isVisibile = signal(false);

  form = this.fb.group({
    title: ['', Validators.required],
  })

  show(): void {
    this.isVisibile.set(true);
  }

  hide(): void {
    this.isVisibile.set(false);
  }

  submit() {
    const courseId = this.courseId();
    if (!courseId) {
      return;
    }
    this.lessonsService.create(courseId, this.form.getRawValue())
      .subscribe((option) => {
        this.form.reset();
        this.hide();
      });
  }
}
