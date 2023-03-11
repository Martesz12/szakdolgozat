import { Component, OnInit } from '@angular/core';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';

@Component({
    selector: 'app-lesson-data-operations',
    templateUrl: './lesson-data-operations.component.html',
    styleUrls: ['./lesson-data-operations.component.scss'],
})
export class LessonDataOperationsComponent {
    constructor(private lessonService: LessonService) {}

    isStateTheCurrentPageState(state: string): boolean {
        return state === this.lessonService.getLessonDataOperationPageState();
    }
}
