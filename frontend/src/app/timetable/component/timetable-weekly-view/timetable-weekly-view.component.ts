import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { switchMap } from 'rxjs';
import { LessonDto } from 'src/app/shared/model/timetable/dto/lesson.dto';
import { SubjectDto } from 'src/app/shared/model/timetable/dto/subject.dto';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';
import { TimetableService } from 'src/app/shared/service/timetable/timetable.service';

@Component({
    selector: 'app-timetable-weekly-view',
    templateUrl: './timetable-weekly-view.component.html',
    styleUrls: ['./timetable-weekly-view.component.scss'],
})
export class TimetableWeeklyViewComponent {
    readonly WEEK_DAYS: string[] = ['', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];
    readonly DAY_TIMES: string[] = [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
    ];
    rowNumber: number[] = Array(48)
        .fill(0)
        .map((x, i) => i);
    colNumber: number[] = Array(8)
        .fill(0)
        .map((x, i) => i);

    selectedTimetableId: number = 0;
    allLesson: LessonDto[] = [];
    subjectIdNameMap: Map<number, SubjectDto> = new Map<number, SubjectDto>();
    @ViewChild('timetable') timetable!: ElementRef;

    constructor(
        private timetableService: TimetableService,
        private lessonService: LessonService,
        private subjectService: SubjectService,
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.getAllLesson();
        this.getSelecterTimetableId();
    }

    private getSelecterTimetableId(): void {
        this.timetableService
            .getSelectedTimetableId()
            .subscribe(timetableId => (this.selectedTimetableId = timetableId));
    }

    private getAllLesson(): void {
        this.lessonService
            .getAllLessonSubject()
            .pipe(
                switchMap(lessons => {
                    this.allLesson = lessons;
                    return this.subjectService.getAllSubjectSubject();
                })
            )
            .subscribe(subjects => {
                if (subjects && subjects.length)
                    subjects.forEach(subject => this.subjectIdNameMap.set(subject.id!, subject));
            });
    }

    getTopStyle(lesson: LessonDto): string {
        let hour: number = +lesson.startTime.split(':')[0];
        let minute: number = +lesson.startTime.split(':')[1];
        return (65 + hour * 50 + Math.floor(minute/60*50)).toString();
    }
}
