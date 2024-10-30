import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFlexibleTableResultComponent } from './show-flexible-table-result.component';

describe('ShowFlexibleTableResultComponent', () => {
  let component: ShowFlexibleTableResultComponent;
  let fixture: ComponentFixture<ShowFlexibleTableResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowFlexibleTableResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowFlexibleTableResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
