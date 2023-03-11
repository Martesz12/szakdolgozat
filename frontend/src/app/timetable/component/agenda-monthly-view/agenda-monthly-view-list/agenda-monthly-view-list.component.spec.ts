import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaMonthlyViewListComponent } from './agenda-monthly-view-list.component';

describe('AgendaMonthlyViewListComponent', () => {
    let component: AgendaMonthlyViewListComponent;
    let fixture: ComponentFixture<AgendaMonthlyViewListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AgendaMonthlyViewListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AgendaMonthlyViewListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
