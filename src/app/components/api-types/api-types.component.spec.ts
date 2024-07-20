import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiTypesComponent } from './api-types.component';

describe('ApiTypesComponent', () => {
  let component: ApiTypesComponent;
  let fixture: ComponentFixture<ApiTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
