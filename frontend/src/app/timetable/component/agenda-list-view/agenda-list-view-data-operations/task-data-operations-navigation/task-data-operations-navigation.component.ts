import { Component, OnInit } from '@angular/core';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { MainTaskService } from 'src/app/shared/service/timetable/main-task.service';

@Component({
  selector: 'app-task-data-operations-navigation',
  templateUrl: './task-data-operations-navigation.component.html',
  styleUrls: ['./task-data-operations-navigation.component.scss']
})
export class TaskDataOperationsNavigationComponent {

    constructor(private mainTaskService: MainTaskService) {}

    setPageState(state: string) {
        if (state === DataOperationPageState.Base) this.mainTaskService.removeSelectedMainTask();
        this.mainTaskService.setMainTaskDataOperationPageState(state as DataOperationPageState);
    }
  
    isStateTheCurrentPageState(state: string): boolean {
        return state === this.mainTaskService.getMainTaskDataOperationPageState();
    }

}
