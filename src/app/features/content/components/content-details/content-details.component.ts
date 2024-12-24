import { Content } from '@/App/shared/models/content.model';
import { Component, OnInit, computed, inject, input } from '@angular/core';
import { ContentService } from '@/App/features/content/services/content.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-content-details',
  standalone: true,
  imports: [],
  templateUrl: './content-details.component.html',
  styleUrl: './content-details.component.scss'
})
export class ContentDetailsComponent implements OnInit {
  protected readonly contentService = inject(ContentService);
  lessonId = input.required<number>();
  content = toSignal(this.contentService.content$, { initialValue: [] });
  sortedContent = computed(() => this.content().sort(this.sortByPosition));

  ngOnInit(): void {
    this.contentService.fetch({ lessonId: this.lessonId() })
      .subscribe();
  }

  sortByPosition(first: Content, second: Content): number {
    return first.position - second.position;
  }
}
