import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueSignalMapComponent } from './value-signal-map.component';

describe('ValueSignalMapComponent', () => {
  let component: ValueSignalMapComponent;
  let fixture: ComponentFixture<ValueSignalMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValueSignalMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValueSignalMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
