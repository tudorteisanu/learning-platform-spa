import { Component, OnInit, inject } from '@angular/core';
import { AnswersService } from '@/App/features/answers/services/answers.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Answer } from '@/App/shared/models/answer.model';
import { ButtonComponent } from "@/App/shared/components/button/button.component";
import { IconComponent } from "@/App/shared/components/icon/icon.component";

@Component({
  selector: 'app-answers-list',
  standalone: true,
  imports: [ButtonComponent, IconComponent],
  templateUrl: './answers-list.component.html',
  styleUrl: './answers-list.component.scss'
})
export class AnswersListComponent implements OnInit {
  protected readonly answersService = inject(AnswersService);

  answers = toSignal(this.answersService.answers$, { initialValue: [] });

  ngOnInit(): void {
    this.answersService.fetch()
      .subscribe();
  }

  edit(option: Answer) {
    this.answersService.setValue(option);
  }

  deleteAnswer(id: number) {
    this.answersService.delete(id).subscribe();
  }
}
