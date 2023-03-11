import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';

@Component({
    selector: 'app-subject-data-operations',
    templateUrl: './subject-data-operations.component.html',
    styleUrls: ['./subject-data-operations.component.scss'],
})
export class SubjectDataOperationsComponent {
    constructor(private subjcetService: SubjectService) {}

    isStateTheCurrentPageState(state: string): boolean {
        return state === this.subjcetService.getSubjectDataOperationPageState();
    }
}
