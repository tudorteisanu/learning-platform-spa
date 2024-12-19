import { Component, OnInit, computed, effect, inject, signal, untracked } from '@angular/core';
import { LessonsService } from '../../../lessons/services/lessons.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormArray, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonContent } from 'src/app/shared/models/lesson.model';
import { map, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AccordionItemComponent } from "../../../../shared/components/accordion-item/accordion-item.component";

@Component({
  selector: 'app-edit-content',
  standalone: true,
  imports: [ReactiveFormsModule, AccordionItemComponent],
  templateUrl: './edit-content.component.html',
  styleUrl: './edit-content.component.scss'
})
export class EditContentComponent {
  protected readonly lessonsService = inject(LessonsService);
  protected readonly fb = inject(NonNullableFormBuilder);

  lesson = toSignal(this.lessonsService.lesson$);
  content = computed(() => this.lesson()?.content || []);
  cache = toSignal(this.lessonsService.lessonContentCache$, {initialValue: ''});

  lessonEffect = effect(() => {
    this.contentControls.clear();
    const lessonContent = this.lesson()?.content;

    if (!lessonContent) {
      return;
    }

    lessonContent.forEach((item) => {
      const taskGroup = this.fb.group({
        id: [item.id, Validators.required],
        type: [item.type, Validators.required],
        data: [item.data, Validators.required],
        position: [item.position, Validators.required]
      });
      this.contentControls.push(taskGroup);
    });

  });

  form = this.fb.group({
    content: this.fb.array<LessonContent>([]),
  })

  values = toSignal(this.form.controls.content.valueChanges
    .pipe(map(value => JSON.stringify(value))), { initialValue: this.cache() })

  disabled = computed(() => this.values() === this.cache());

  get contentControls(): FormArray<any> {
    return this.form.get('content') as FormArray<any>;
  }

  addContent(event: Event) {
    event.preventDefault();

    const taskGroup = this.fb.group({
      type: ['text', Validators.required],
      data: ['', Validators.required],
      position: ['', Validators.required],
    });
    this.contentControls.push(taskGroup);
  }

  removeContent(index: number, event: Event) {
    event.preventDefault();
    this.contentControls.removeAt(index);
  }

  updateContent() {
    const id = this.lesson()?.id;

    if (!id) {
      return;
    }

    this.lessonsService.update(id, this.form.getRawValue());
  }
}
