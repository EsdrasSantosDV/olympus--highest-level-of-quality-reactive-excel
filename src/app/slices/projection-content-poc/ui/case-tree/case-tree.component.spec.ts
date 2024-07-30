import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTreeComponent } from './case-tree.component';

describe('CaseTreeComponent', () => {
  let component: CaseTreeComponent;
  let fixture: ComponentFixture<CaseTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
