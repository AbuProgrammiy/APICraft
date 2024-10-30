import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApisTypesComponent } from './my-apis-types.component';

describe('MyApisTypesComponent', () => {
  let component: MyApisTypesComponent;
  let fixture: ComponentFixture<MyApisTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyApisTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyApisTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
