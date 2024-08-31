import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRecordComponent } from './form-record.component';

describe('FormRecordComponent', () => {
  let component: FormRecordComponent;
  let fixture: ComponentFixture<FormRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRecordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
