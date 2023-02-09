import { Component, OnInit } from '@angular/core';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { TeacherService } from 'src/app/shared/service/timetable/teacher.service';

@Component({
    selector: 'app-teacher-data-operations-navigation',
    templateUrl: './teacher-data-operations-navigation.component.html',
    styleUrls: ['./teacher-data-operations-navigation.component.scss'],
})
export class TeacherDataOperationsNavigationComponent {
    constructor(private teacherService: TeacherService) {}

    setPageState(state: string) {
        if (state === DataOperationPageState.Base) this.teacherService.removeSelectedTeacher();
        this.teacherService.setTeacherDataOperationPageState(state as DataOperationPageState);
    }

    isStateTheCurrentPageState(state: string): boolean {
        return state === this.teacherService.getTeacherDataOperationPageState();
    }
}
