import { Component, OnInit } from '@angular/core';
import { MainTaskService } from 'src/app/shared/service/timetable/main-task.service';

@Component({
    selector: 'app-agenda-list-view-data-operations',
    templateUrl: './agenda-list-view-data-operations.component.html',
    styleUrls: ['./agenda-list-view-data-operations.component.scss'],
})
export class AgendaListViewDataOperationsComponent {
    constructor(private mainTaskService: MainTaskService) {}

    isStateTheCurrentPageState(state: string): boolean {
        return state === this.mainTaskService.getMainTaskDataOperationPageState();
    }
}
