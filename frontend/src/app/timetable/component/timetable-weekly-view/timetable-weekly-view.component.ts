import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
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
        // '00:00',
        // '01:00',
        // '02:00',
        // '03:00',
        // '04:00',
        // '05:00',
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
    rowNumber: number[] = Array(36)
        .fill(0)
        .map((x, i) => i);
    colNumber: number[] = Array(8)
        .fill(0)
        .map((x, i) => i);

    selectedTimetableId: number = 0;
    allLesson: LessonDto[] = [];
    subjectIdNameMap: Map<number, SubjectDto> = new Map<number, SubjectDto>();

    mouseDown: boolean = false;

    startX: number = 0;
    startY: number = 0;

    scrollLeft: number = 0;
    scrollTop: number = 0;

    constructor(
        private timetableService: TimetableService,
        private lessonService: LessonService,
        private subjectService: SubjectService
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
        return (65 + hour * 50 + Math.floor((minute / 60) * 50) - 6 * 50).toString();
    }

    getLeftStyle(lesson: LessonDto): string {
        let left: number = 0;
        this.WEEK_DAYS.forEach((day, index) => {
            if (day === lesson.day) left = 101.86 + 199.64 * (index - 1);
        });
        return left.toString();
    }

    getHeightStyle(lesson: LessonDto): string {
        let hour: number = +lesson.endTime.split(':')[0] - +lesson.startTime.split(':')[0];
        let minute: number = 0;
        if (hour === 0) minute = +lesson.endTime.split(':')[1] - +lesson.startTime.split(':')[1];
        else if (hour > 0 && +lesson.endTime.split(':')[1] - +lesson.startTime.split(':')[1] === 0) minute = 0;
        else minute = 60 - +lesson.startTime.split(':')[1] + +lesson.endTime.split(':')[1] - 60;

        return (hour * 50 + Math.floor((minute / 60) * 50)).toString();
    }

    startDragging(e: MouseEvent, el: HTMLDivElement) {
        this.mouseDown = true;
        this.startX = e.pageX - el.offsetLeft;
        this.scrollLeft = el.scrollLeft;

        this.startY = e.pageY - el.offsetTop;
        this.scrollTop = el.scrollTop;
    }

    stopDragging() {
        this.mouseDown = false;
    }

    moveEvent(e: MouseEvent, el: HTMLDivElement) {
        e.preventDefault();
        if (!this.mouseDown) {
            return;
        }
        const x = e.pageX - el.offsetLeft;
        const scrollUp = x - this.startX;
        el.scrollLeft = this.scrollLeft - scrollUp;

        const y = e.pageY - el.offsetTop;
        const scrollDown = y - this.startY;
        el.scrollTop = this.scrollTop - scrollDown;
    }
}
