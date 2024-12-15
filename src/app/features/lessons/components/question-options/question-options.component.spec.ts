import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionOptionsComponent } from './question-options.component';

describe('QuestionOptionsComponent', () => {
  let component: QuestionOptionsComponent;
  let fixture: ComponentFixture<QuestionOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
