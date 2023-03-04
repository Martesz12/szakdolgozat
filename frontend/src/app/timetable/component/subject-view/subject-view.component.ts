import { Component, OnDestroy } from '@angular/core';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';

@Component({
    selector: 'app-subject-view',
    templateUrl: './subject-view.component.html',
    styleUrls: ['./subject-view.component.scss'],
})
export class SubjectViewComponent implements OnDestroy {
    constructor(private subjectService: SubjectService) {}

    ngOnDestroy(): void {
        this.subjectService.resetSubjectState();
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    showBothCard(): boolean {
        return this.getScreenWidth() > 1000;
    }

    isStateTheCurrentPageState(state: string): boolean {
        return state === this.subjectService.getSubjectDataOperationPageState();
    }

    showSubjectListCard(): boolean {
        return this.showBothCard() || (!this.showBothCard() && this.isStateTheCurrentPageState('base'));
    }

    showSubjectDataOperationCard(): boolean {
        return this.showBothCard() || (!this.showBothCard() && !this.isStateTheCurrentPageState('base'));
    }
}
