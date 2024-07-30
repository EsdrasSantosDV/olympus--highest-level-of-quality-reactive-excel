import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseCardComponent } from './case-card.component';

describe('CaseCardComponent', () => {
  let component: CaseCardComponent;
  let fixture: ComponentFixture<CaseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
