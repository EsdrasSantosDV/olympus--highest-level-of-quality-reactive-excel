import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayImpostoComponent } from './form-array-imposto.component';

describe('FormArrayImpostoComponent', () => {
  let component: FormArrayImpostoComponent;
  let fixture: ComponentFixture<FormArrayImpostoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormArrayImpostoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormArrayImpostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
