import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
    selector: 'app-agenda-monthly-view-list',
    templateUrl: './agenda-monthly-view-list.component.html',
    styleUrls: ['./agenda-monthly-view-list.component.scss'],
})
export class AgendaMonthlyViewListComponent implements OnChanges {
    @Input() selectedDayDate: number = 0;
    currentDate: Date = new Date();

    constructor() {}

    ngOnChanges(): void {
        if(this.selectedDayDate !== 0) this.currentDate = new Date(this.selectedDayDate);
    }
}
