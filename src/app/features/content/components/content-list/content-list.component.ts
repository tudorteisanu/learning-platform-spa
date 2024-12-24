import { Component, OnInit, inject, input } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [],
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.scss'
})
export class ContentListComponent implements OnInit {
  protected readonly contentService = inject(ContentService);
  content = toSignal(this.contentService.content$, { initialValue: [] });

  lessonId = input.required<number>();

  ngOnInit(): void {
    this.contentService.fetch({lessonId: this.lessonId()})
      .subscribe();
  }
}
