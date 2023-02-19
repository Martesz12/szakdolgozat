import { Component } from '@angular/core';
import { switchMap } from 'rxjs';
import { LessonDto } from 'src/app/shared/model/timetable/dto/lesson.dto';
import { SubjectDto } from 'src/app/shared/model/timetable/dto/subject.dto';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';
import { TimetableService } from 'src/app/shared/service/timetable/timetable.service';

@Component({
    selector: 'app-timetable-daily-view-list',
    templateUrl: './timetable-daily-view-list.component.html',
    styleUrls: ['./timetable-daily-view-list.component.scss'],
})
export class TimetableDailyViewListComponent {
    readonly DAYS: string[] = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];
    selectedTimetableId: number = 0;
    allLesson: LessonDto[] = [];
    subjectIdNameMap: Map<number, SubjectDto> = new Map<number, SubjectDto>();

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

    getLessonsByDay(currentDay: string): LessonDto[] {
        return this.allLesson
            .filter(lesson => lesson.day === currentDay)
            .sort((lesson1, lesson2) =>
                lesson1.startTime > lesson2.startTime ? 1 : lesson2.startTime > lesson1.startTime ? -1 : 0
            );
    }

    formatTime(time: string): Date {
        return new Date('1970-01-01T' + time);
    }

    selectLesson(lesson: LessonDto): void {
        //TODO kiválasztani a lessonhoz a dolgokat
        //TODO a mellette lévő card-nál megjeleníteni adatokat
    }
}
