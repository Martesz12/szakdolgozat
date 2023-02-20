import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-agenda-list-view',
    templateUrl: './agenda-list-view.component.html',
    styleUrls: ['./agenda-list-view.component.scss'],
})
export class AgendaListViewComponent {
    constructor() {
        this.resetIfTimetableChanged();
    }

    resetIfTimetableChanged(){
        // this.timetableService.getSelectedTimetableId().subscribe(_ => {
        //     this.lessonService.setLessonDataOperationPageState(DataOperationPageState.Base);
        //     this.lessonService.removeSelectedLesson();
        // });
    }

    // getScreenWidth(): number {
    //     return window.innerWidth;
    // }

    // showBothCard(): boolean {
    //     return this.getScreenWidth() > 599;
    // }

    // isStateTheCurrentPageState(state: string): boolean {
    //     return state === this.lessonService.getLessonDataOperationPageState();
    // }

    showLessonListCard(): boolean {
        return true;
        // return this.showBothCard() || (!this.showBothCard() && this.isStateTheCurrentPageState('base'));
    }

    showLessonDataOperationCard(): boolean {
        return true;
        // return this.showBothCard() || (!this.showBothCard() && !this.isStateTheCurrentPageState('base'));
    }
}
