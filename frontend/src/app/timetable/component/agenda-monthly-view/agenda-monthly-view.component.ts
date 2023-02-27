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

    isStateTheCurrentPageState(state: string): boolean {
        return state === this.mainTaskService.getMainTaskDataOperationPageState();
    }

    showMainTaskListCard(): boolean {
        return this.showBothCard() || (!this.showBothCard() && this.isStateTheCurrentPageState('base'));
    }

    showMainTaskDataOperationCard(): boolean {
        return this.showBothCard() || (!this.showBothCard() && !this.isStateTheCurrentPageState('base'));
    }
}
