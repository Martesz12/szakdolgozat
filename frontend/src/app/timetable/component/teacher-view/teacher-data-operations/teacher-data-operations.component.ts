import { Component } from '@angular/core';
import { TeacherService } from 'src/app/shared/service/timetable/teacher.service';

@Component({
    selector: 'app-teacher-data-operations',
    templateUrl: './teacher-data-operations.component.html',
    styleUrls: ['./teacher-data-operations.component.scss'],
})
export class TeacherDataOperationsComponent {
    constructor(private teacherService: TeacherService) {}

    isStateTheCurrentPageState(state: string): boolean {
        return state === this.teacherService.getTeacherDataOperationPageState();
    }
}
