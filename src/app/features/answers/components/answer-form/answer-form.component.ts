import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AnswersService } from '../../services/answers.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonComponent } from "../../../../shared/components/button/button.component";

@Component({
  selector: 'app-answer-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './answer-form.component.html',
  styleUrl: './answer-form.component.scss'
})
export class AnswerFormComponent {
  protected readonly fb = inject(NonNullableFormBuilder);
  protected readonly answersService = inject(AnswersService);

  form = this.answersService.getForm();
  loading = toSignal(this.answersService.loading$, { initialValue: false });

  submit() {
    this.answersService.submit()
      .subscribe();
  }
}
