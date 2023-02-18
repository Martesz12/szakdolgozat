import { Component } from '@angular/core';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';
import { TimetableService } from 'src/app/shared/service/timetable/timetable.service';

@Component({
    selector: 'app-lesson-view',
    templateUrl: './lesson-view.component.html',
    styleUrls: ['./lesson-view.component.scss'],
})
export class LessonViewComponent {
    constructor(private lessonService: LessonService, private timetableService: TimetableService) {
        this.resetIfTimetableChanged();
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
        return this.getScreenWidth() > 599;
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
