import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableDialogComponent } from './timetable-dialog.component';

describe('TimetableDialogComponent', () => {
  let component: TimetableDialogComponent;
  let fixture: ComponentFixture<TimetableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetableDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
