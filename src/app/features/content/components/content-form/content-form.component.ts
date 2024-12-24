import { ButtonComponent } from '@/App/shared/components/button/button.component';
import { Component, inject, input } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-content-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './content-form.component.html',
  styleUrl: './content-form.component.scss'
})
export class ContentFormComponent {
  protected readonly contentService = inject(ContentService);

  lessonId = input.required<number>()
  form = this.contentService.getForm();

  submit(): void {
    this.contentService.submit(this.lessonId())
      .subscribe();
  }

}
