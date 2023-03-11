import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaMonthlyViewCalendarComponent } from './agenda-monthly-view-calendar.component';

describe('AgendaMonthlyViewCalendarComponent', () => {
    let component: AgendaMonthlyViewCalendarComponent;
    let fixture: ComponentFixture<AgendaMonthlyViewCalendarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AgendaMonthlyViewCalendarComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AgendaMonthlyViewCalendarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
