import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, delay, finalize, map, tap } from 'rxjs';
import { Answer } from '@/App/shared/models/answer.model';
import { unionArraysByAscendPriority } from '@/App/utils';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  protected readonly http = inject(HttpClient);
  protected readonly fb = inject(NonNullableFormBuilder);

  loadingSubject = new BehaviorSubject(false);
  loading$ = this.loadingSubject.asObservable();

  selectedAnswerId = signal<number | null>(null);

  private readonly form = this.fb.group({
    description: ['', Validators.required],
  })

  protected readonly answersSubject = new BehaviorSubject<Answer[]>([]);
  answers$ = this.answersSubject.asObservable();

  fetch(params: Record<string, any> = {}) {
    return this.http.get<Answer[]>('/answers', { params })
    .pipe(tap((response) => this.setAnswers(response)));
  }

  create(answer: Pick<Answer, 'description'>) {
    return this.http.post<Answer>('/answers', answer)
      .pipe(
        delay(2000),
        tap(response => {
            this.setAnswers([response])
          }
        ),
      );
  }

  update(answer: Answer) {
    return this.http.patch<Answer>(`/answers/${this.selectedAnswerId()}`, answer)
      .pipe(
        tap(response => {
          this.setAnswers([response]);
          this.selectedAnswerId.set(null);
        }),
      );
  }

  setAnswers(answers: Answer[]) {
    const items = this.answersSubject.getValue();

    this.answersSubject.next(unionArraysByAscendPriority(items, answers, 'id'));
  }

  getForm() {
    return this.form;
  }

  setValue({id, description}: Answer) {
    this.selectedAnswerId.set(id);
    this.form.patchValue({ description });
  }

  submit() {
    const id = this.selectedAnswerId();
    this.loadingSubject.next(true);
    let request = this.create(this.form.getRawValue())

    if (id) {
      request = this.update({ ...this.form.getRawValue(), id });
    }

    return request.pipe(
      finalize(() => {
        this.loadingSubject.next(false)
        this.form.reset();
      }),
    );
  }

  delete(id: number) {
    return this.http.delete(`/answers/${id}`)
      .pipe(
        tap(() => {
        this.answersSubject.next(this.answersSubject.getValue().filter(item => item.id !== id))
      },
    ));
  }
}
