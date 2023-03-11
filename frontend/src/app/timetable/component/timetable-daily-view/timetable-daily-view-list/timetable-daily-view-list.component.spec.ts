import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableDailyViewListComponent } from './timetable-daily-view-list.component';

describe('TimetableDailyViewListComponent', () => {
    let component: TimetableDailyViewListComponent;
    let fixture: ComponentFixture<TimetableDailyViewListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TimetableDailyViewListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TimetableDailyViewListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
