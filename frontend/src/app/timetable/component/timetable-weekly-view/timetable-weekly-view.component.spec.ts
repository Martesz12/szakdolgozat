import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableWeeklyViewComponent } from './timetable-weekly-view.component';

describe('TimetableWeeklyViewComponent', () => {
  let component: TimetableWeeklyViewComponent;
  let fixture: ComponentFixture<TimetableWeeklyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetableWeeklyViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetableWeeklyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
