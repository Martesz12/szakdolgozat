import { Component, OnInit } from '@angular/core';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';

@Component({
    selector: 'app-subject-data-operations-navigation',
    templateUrl: './subject-data-operations-navigation.component.html',
    styleUrls: ['./subject-data-operations-navigation.component.scss'],
})
export class SubjectDataOperationsNavigationComponent {
    constructor(private subjectService: SubjectService) {}

    setPageState(state: string) {
        if (state === DataOperationPageState.Base) this.subjectService.removeSelectedSubject();
        this.subjectService.setSubjectDataOperationPageState(state as DataOperationPageState);
    }

    isStateTheCurrentPageState(state: string): boolean {
        return state === this.subjectService.getSubjectDataOperationPageState();
    }
}
