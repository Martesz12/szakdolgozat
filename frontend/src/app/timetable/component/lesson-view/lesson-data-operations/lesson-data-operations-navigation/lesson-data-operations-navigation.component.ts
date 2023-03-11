import { Component, OnInit } from '@angular/core';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';

@Component({
    selector: 'app-lesson-data-operations-navigation',
    templateUrl: './lesson-data-operations-navigation.component.html',
    styleUrls: ['./lesson-data-operations-navigation.component.scss'],
})
export class LessonDataOperationsNavigationComponent {
    constructor(private lessonService: LessonService) {}

    setPageState(state: string) {
        if (state === DataOperationPageState.Base) this.lessonService.removeSelectedLesson();
        this.lessonService.setLessonDataOperationPageState(state as DataOperationPageState);
    }

    isStateTheCurrentPageState(state: string): boolean {
        return state === this.lessonService.getLessonDataOperationPageState();
    }
}
