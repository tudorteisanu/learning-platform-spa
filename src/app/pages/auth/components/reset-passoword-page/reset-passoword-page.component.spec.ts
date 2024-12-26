import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPassowordPageComponent } from './reset-passoword-page.component';

describe('ResetPassowordPageComponent', () => {
  let component: ResetPassowordPageComponent;
  let fixture: ComponentFixture<ResetPassowordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPassowordPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetPassowordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
