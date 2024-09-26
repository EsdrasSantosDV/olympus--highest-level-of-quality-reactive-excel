import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeSelectProjectionComponent } from './tree-select-projection.component';

describe('TreeSelectProjectionComponent', () => {
  let component: TreeSelectProjectionComponent;
  let fixture: ComponentFixture<TreeSelectProjectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeSelectProjectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreeSelectProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
