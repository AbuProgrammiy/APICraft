import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateApiComponent } from './generate-api.component';

describe('GenerateApiComponent', () => {
  let component: GenerateApiComponent;
  let fixture: ComponentFixture<GenerateApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateApiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
