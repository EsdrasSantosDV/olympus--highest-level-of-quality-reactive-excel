import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseCardDumbComponent } from './case-card-dumb.component';

describe('CaseCardDumbComponent', () => {
  let component: CaseCardDumbComponent;
  let fixture: ComponentFixture<CaseCardDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseCardDumbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseCardDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
