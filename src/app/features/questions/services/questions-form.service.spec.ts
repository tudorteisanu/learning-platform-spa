import { TestBed } from '@angular/core/testing';

import { QuestionsFormService } from './questions-form.service';

describe('QuestionsFormService', () => {
  let service: QuestionsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
