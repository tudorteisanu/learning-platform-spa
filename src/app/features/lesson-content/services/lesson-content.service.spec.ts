import { TestBed } from '@angular/core/testing';

import { LessonContentService } from './lesson-content.service';

describe('LessonContentService', () => {
  let service: LessonContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
