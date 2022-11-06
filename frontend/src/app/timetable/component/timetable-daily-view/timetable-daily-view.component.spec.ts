import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableDailyViewComponent } from './timetable-daily-view.component';

describe('TimetableDailyViewComponent', () => {
    let component: TimetableDailyViewComponent;
    let fixture: ComponentFixture<TimetableDailyViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TimetableDailyViewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TimetableDailyViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
