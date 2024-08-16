import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFlexibleTablesComponent } from './show-flexible-tables.component';

describe('ShowFlexibleTablesComponent', () => {
  let component: ShowFlexibleTablesComponent;
  let fixture: ComponentFixture<ShowFlexibleTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowFlexibleTablesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowFlexibleTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
