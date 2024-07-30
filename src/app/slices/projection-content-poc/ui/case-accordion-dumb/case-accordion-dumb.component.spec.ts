import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseAccordionDumbComponent } from './case-accordion-dumb.component';

describe('CaseAccordionDumbComponent', () => {
  let component: CaseAccordionDumbComponent;
  let fixture: ComponentFixture<CaseAccordionDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseAccordionDumbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseAccordionDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
