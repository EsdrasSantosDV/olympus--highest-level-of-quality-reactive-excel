import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsControlValueAccessorComponent } from './chips-control-value-accessor.component';

describe('ChipsControlValueAccessorComponent', () => {
  let component: ChipsControlValueAccessorComponent;
  let fixture: ComponentFixture<ChipsControlValueAccessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipsControlValueAccessorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChipsControlValueAccessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
