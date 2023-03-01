import { Component } from '@angular/core';
import { MainTaskService } from 'src/app/shared/service/timetable/main-task.service';
import { TimetableService } from 'src/app/shared/service/timetable/timetable.service';

@Component({
    selector: 'app-agenda-monthly-view',
    templateUrl: './agenda-monthly-view.component.html',
    styleUrls: ['./agenda-monthly-view.component.scss'],
})
export class AgendaMonthlyViewComponent {
    selectedTimetableId: number = 0;
    selectedDayDate: number = 0;
    isCalendarShown: boolean = true;

    constructor(private timetableService: TimetableService, private mainTaskService: MainTaskService) {
        this.getTimetableId();
    }

    getTimetableId(){
        this.timetableService.getSelectedTimetableId().subscribe(timetableId => {
            this.selectedTimetableId = timetableId;
        });
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    showBothCard(): boolean {
        return this.getScreenWidth() > 1000;
    }

    showMonthlyViewCalendarCard(): boolean {
        return this.showBothCard() || (!this.showBothCard() && this.isCalendarShown);
    }

    showMonthlyViewListCard(): boolean {
        return this.showBothCard() || (!this.showBothCard() && !this.isCalendarShown);
    }

    selectDayFromCalendar(currentDate: number): void {
        this.selectedDayDate = currentDate;
        this.isCalendarShown = false;
    }

    backFromMonthlyViewList(currentDate: number): void {
        this.selectedDayDate = currentDate;
        this.isCalendarShown = true;
    }
}
