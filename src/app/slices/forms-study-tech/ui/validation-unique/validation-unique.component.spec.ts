import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationUniqueComponent } from './validation-unique.component';

describe('ValidationUniqueComponent', () => {
  let component: ValidationUniqueComponent;
  let fixture: ComponentFixture<ValidationUniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationUniqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidationUniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
