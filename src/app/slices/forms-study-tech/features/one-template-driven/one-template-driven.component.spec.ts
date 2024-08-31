import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTemplateDrivenComponent } from './one-template-driven.component';

describe('OneTemplateDrivenComponent', () => {
  let component: OneTemplateDrivenComponent;
  let fixture: ComponentFixture<OneTemplateDrivenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneTemplateDrivenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneTemplateDrivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
