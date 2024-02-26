import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesYearComponent } from './expenses-year.component';

describe('ExpensesYearComponent', () => {
  let component: ExpensesYearComponent;
  let fixture: ComponentFixture<ExpensesYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesYearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpensesYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
