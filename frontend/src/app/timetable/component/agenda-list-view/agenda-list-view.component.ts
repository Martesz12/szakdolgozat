import { Component, OnDestroy } from '@angular/core';
import { MainTaskService } from 'src/app/shared/service/timetable/main-task.service';
import { TimetableService } from 'src/app/shared/service/timetable/timetable.service';

@Component({
    selector: 'app-agenda-list-view',
    templateUrl: './agenda-list-view.component.html',
    styleUrls: ['./agenda-list-view.component.scss'],
})
export class AgendaListViewComponent implements OnDestroy {
    constructor(private timetableService: TimetableService, private mainTaskService: MainTaskService) {
        this.resetIfTimetableChanged();
    }

    ngOnDestroy(): void {
        this.mainTaskService.resetMainTaskState();
    }

    resetIfTimetableChanged() {
        this.timetableService.getSelectedTimetableId().subscribe(_ => {});
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
