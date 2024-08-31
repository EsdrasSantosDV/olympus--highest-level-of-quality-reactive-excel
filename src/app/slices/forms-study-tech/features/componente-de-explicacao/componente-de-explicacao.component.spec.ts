import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteDeExplicacaoComponent } from './componente-de-explicacao.component';

describe('ComponenteDeExplicacaoComponent', () => {
  let component: ComponenteDeExplicacaoComponent;
  let fixture: ComponentFixture<ComponenteDeExplicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteDeExplicacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponenteDeExplicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
