import { Component, OnDestroy } from '@angular/core';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';

@Component({
    selector: 'app-timetable-daily-view',
    templateUrl: './timetable-daily-view.component.html',
    styleUrls: ['./timetable-daily-view.component.scss'],
})
export class TimetableDailyViewComponent implements OnDestroy {
    hasSelectedLesson: boolean = false;

    constructor(private lessonService: LessonService) {
        this.lessonService
            .getSelectedLessonSubject()
            .subscribe(lesson => (this.hasSelectedLesson = lesson !== undefined && Object.keys(lesson).length !== 0));
    }

    ngOnDestroy(): void {
        this.lessonService.removeSelectedLesson();
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    showBothCard(): boolean {
        return this.getScreenWidth() > 599;
    }

    showLessonListCard(): boolean {
        return this.showBothCard() || (!this.showBothCard() && !this.hasSelectedLesson);
    }

    showLessonDescriptionCard(): boolean {
        return this.showBothCard() || (!this.showBothCard() && this.hasSelectedLesson);
    }
}
