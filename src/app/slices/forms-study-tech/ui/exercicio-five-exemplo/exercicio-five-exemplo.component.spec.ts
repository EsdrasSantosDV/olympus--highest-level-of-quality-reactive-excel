import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicioFiveExemploComponent } from './exercicio-five-exemplo.component';

describe('ExercicioFiveExemploComponent', () => {
  let component: ExercicioFiveExemploComponent;
  let fixture: ComponentFixture<ExercicioFiveExemploComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercicioFiveExemploComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExercicioFiveExemploComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
