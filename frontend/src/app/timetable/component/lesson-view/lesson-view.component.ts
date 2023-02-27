import { Component, OnDestroy } from '@angular/core';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';
import { TimetableService } from 'src/app/shared/service/timetable/timetable.service';

@Component({
    selector: 'app-lesson-view',
    templateUrl: './lesson-view.component.html',
    styleUrls: ['./lesson-view.component.scss'],
})
export class LessonViewComponent implements OnDestroy {
    constructor(private lessonService: LessonService, private timetableService: TimetableService) {
        this.resetIfTimetableChanged();
    }

    ngOnDestroy(): void {
        this.lessonService.removeSelectedLesson();
    }

    resetIfTimetableChanged(){
        this.timetableService.getSelectedTimetableId().subscribe(_ => {
            this.lessonService.setLessonDataOperationPageState(DataOperationPageState.Base);
            this.lessonService.removeSelectedLesson();
        });
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    showBothCard(): boolean {
        return this.getScreenWidth() > 1000;
    }

    isStateTheCurrentPageState(state: string): boolean {
        return state === this.lessonService.getLessonDataOperationPageState();
    }

    showLessonListCard(): boolean {
        return this.showBothCard() || (!this.showBothCard() && this.isStateTheCurrentPageState('base'));
    }

    showLessonDataOperationCard(): boolean {
        return this.showBothCard() || (!this.showBothCard() && !this.isStateTheCurrentPageState('base'));
    }
}
