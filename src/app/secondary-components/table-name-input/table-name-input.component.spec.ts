import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNameInputComponent } from './table-name-input.component';

describe('TableNameInputComponent', () => {
  let component: TableNameInputComponent;
  let fixture: ComponentFixture<TableNameInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableNameInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableNameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
