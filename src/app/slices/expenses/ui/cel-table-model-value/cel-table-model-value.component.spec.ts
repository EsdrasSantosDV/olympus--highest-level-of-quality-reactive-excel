import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelTableModelValueComponent } from './cel-table-model-value.component';

describe('CelTableModelValueComponent', () => {
  let component: CelTableModelValueComponent;
  let fixture: ComponentFixture<CelTableModelValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CelTableModelValueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CelTableModelValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
