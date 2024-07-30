import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseAccordionItemDumbComponent } from './case-accordion-item-dumb.component';

describe('CaseAccordionItemDumbComponent', () => {
  let component: CaseAccordionItemDumbComponent;
  let fixture: ComponentFixture<CaseAccordionItemDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseAccordionItemDumbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseAccordionItemDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
