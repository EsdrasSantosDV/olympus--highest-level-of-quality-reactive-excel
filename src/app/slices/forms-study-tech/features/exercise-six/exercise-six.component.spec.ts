import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseSixComponent } from './exercise-six.component';

describe('ExerciseSixComponent', () => {
  let component: ExerciseSixComponent;
  let fixture: ComponentFixture<ExerciseSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseSixComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExerciseSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
