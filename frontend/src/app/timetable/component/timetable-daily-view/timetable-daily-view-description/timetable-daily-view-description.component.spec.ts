import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableDailyViewDescriptionComponent } from './timetable-daily-view-description.component';

describe('TimetableDailyViewDescriptionComponent', () => {
  let component: TimetableDailyViewDescriptionComponent;
  let fixture: ComponentFixture<TimetableDailyViewDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetableDailyViewDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetableDailyViewDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
