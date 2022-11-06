import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaMonthlyViewComponent } from './agenda-monthly-view.component';

describe('AgendaMonthlyViewComponent', () => {
    let component: AgendaMonthlyViewComponent;
    let fixture: ComponentFixture<AgendaMonthlyViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AgendaMonthlyViewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AgendaMonthlyViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
