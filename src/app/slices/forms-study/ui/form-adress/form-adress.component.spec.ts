import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAdressComponent } from './form-adress.component';

describe('FormAdressComponent', () => {
  let component: FormAdressComponent;
  let fixture: ComponentFixture<FormAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAdressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
