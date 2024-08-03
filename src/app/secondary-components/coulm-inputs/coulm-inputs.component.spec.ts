import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoulmInputsComponent } from './coulm-inputs.component';

describe('CoulmInputsComponent', () => {
  let component: CoulmInputsComponent;
  let fixture: ComponentFixture<CoulmInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoulmInputsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoulmInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
