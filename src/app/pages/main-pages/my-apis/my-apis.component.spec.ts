import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAPIsComponent } from './my-apis.component';

describe('MyAPIsComponent', () => {
  let component: MyAPIsComponent;
  let fixture: ComponentFixture<MyAPIsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyAPIsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyAPIsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
