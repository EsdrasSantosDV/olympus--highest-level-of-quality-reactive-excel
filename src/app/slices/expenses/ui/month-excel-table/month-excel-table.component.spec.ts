import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthExcelTableComponent } from './month-excel-table.component';

describe('MonthExcelTableComponent', () => {
  let component: MonthExcelTableComponent;
  let fixture: ComponentFixture<MonthExcelTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthExcelTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthExcelTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
