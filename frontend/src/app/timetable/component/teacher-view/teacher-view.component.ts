import { Component, OnDestroy } from '@angular/core';
import { TeacherService } from 'src/app/shared/service/timetable/teacher.service';

@Component({
    selector: 'app-teacher-view',
    templateUrl: './teacher-view.component.html',
    styleUrls: ['./teacher-view.component.scss'],
})
export class TeacherViewComponent implements OnDestroy {
    constructor(private teacherService: TeacherService) {}

    ngOnDestroy(): void {
        this.teacherService.resetTeacherState();
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    showBothCard(): boolean {
        return this.getScreenWidth() > 1000;
    }

    isStateTheCurrentPageState(state: string): boolean {
        return state === this.teacherService.getTeacherDataOperationPageState();
    }

    showTeacherListCard(): boolean {
        return this.showBothCard() || (!this.showBothCard() && this.isStateTheCurrentPageState('base'));
    }

    showTeacherDataOperationCard(): boolean {
        return this.showBothCard() || (!this.showBothCard() && !this.isStateTheCurrentPageState('base'));
    }
}
