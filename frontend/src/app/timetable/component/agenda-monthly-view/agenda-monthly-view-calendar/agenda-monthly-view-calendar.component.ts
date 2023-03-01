import { AfterViewInit, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { filter, switchMap } from 'rxjs';
import { LessonDto } from 'src/app/shared/model/timetable/dto/lesson.dto';
import { MainTaskDto } from 'src/app/shared/model/timetable/dto/main-task.dto';
import { SubjectDto } from 'src/app/shared/model/timetable/dto/subject.dto';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';
import { MainTaskService } from 'src/app/shared/service/timetable/main-task.service';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';
import { TimetableService } from 'src/app/shared/service/timetable/timetable.service';

@Component({
    selector: 'app-agenda-monthly-view-calendar',
    templateUrl: './agenda-monthly-view-calendar.component.html',
    styleUrls: ['./agenda-monthly-view-calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AgendaMonthlyViewCalendarComponent implements AfterViewInit {
    readonly months = [
        'Január',
        'Február',
        'Március',
        'Április',
        'Május',
        'Június',
        'Július',
        'Augusztus',
        'Szeptember',
        'Október',
        'November',
        'December',
    ];
    mainTasks: MainTaskDto[] = [];
    allLesson: LessonDto[] = [];
    allSubject: SubjectDto[] = [];
    mainTaskDates: number[] = [];
    currentDate: Date = new Date();
    selectedTimetableId: number = 0;
    calendarMonth: string = '';
    calendarDate: Date = new Date();
    previousDays: number[] = [];
    currentDays: Map<number, number> = new Map<number, number>();
    nextDays: number[] = [];
    today: number = 0;
    eventDays: number[] = [];
    @Output() selectDayEvent = new EventEmitter<number>();

    //TODO valószínűleg a s/ms bezavar a dátum összehasonlításban
    //TODO csak év hónap nap alapján ellenőrizni a dolgokat
    constructor(
        private mainTaskService: MainTaskService,
        private timetableService: TimetableService,
        private lessonService: LessonService,
        private subjectService: SubjectService
    ) {
        this.getMainTasksWhenTimetableSelected();
    }
    ngAfterViewInit(): void {
        if (this.selectedTimetableId) this.renderCalendar();
    }

    private getMainTasksWhenTimetableSelected(): void {
        this.timetableService
            .getSelectedTimetableId()
            .pipe(
                filter(timetableId => timetableId !== 0),
                switchMap(timetableId => {
                    this.selectedTimetableId = timetableId;
                    return this.mainTaskService.getAllMainTaskSubject();
                }),
                switchMap(mainTasks => {
                    this.mainTasks = mainTasks.filter(mainTask => !mainTask.fulfilled);
                    mainTasks
                        .filter(mainTask => !mainTask.fulfilled)
                        .forEach(filteredMainTask => {
                            let mainTaskDate = new Date(filteredMainTask.deadline);
                            console.log(mainTaskDate);

                            this.mainTaskDates.push(
                                new Date(
                                    mainTaskDate.getFullYear(),
                                    mainTaskDate.getMonth(),
                                    mainTaskDate.getDate()
                                ).getTime()
                            );
                        });
                    this.renderCalendar();
                    return this.lessonService.getAllLessonSubject();
                }),
                switchMap(lessons => {
                    this.allLesson = lessons;
                    return this.subjectService.getAllSubjectSubject();
                })
            )
            .subscribe(subject => (this.allSubject = subject));
    }

    navigateBack(): void {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.renderCalendar();
    }

    navigateForeward(): void {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.renderCalendar();
    }

    backToCurrentDate(): void {
        this.currentDate = new Date();
        this.renderCalendar();
    }

    renderCalendar(): void {
        this.previousDays = [];
        this.currentDays = new Map<number, number>();
        this.nextDays = [];
        this.today = 0;
        this.eventDays = [];

        this.currentDate.setDate(1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
        const prevLastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();
        const firstDayIndex = this.currentDate.getDay() - 1;
        const lastDayIndex = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDay() - 1;
        let nextDays = 7 - lastDayIndex - 1;

        this.calendarMonth = this.months[this.currentDate.getMonth()];
        this.calendarDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

        for (let x = firstDayIndex; x > 0; x--) this.previousDays.push(prevLastDay - x + 1);

        for (let i = 1; i <= lastDay; i++) {
            if (
                i === new Date().getDate() &&
                this.currentDate.getMonth() === new Date().getMonth() &&
                this.currentDate.getFullYear() === new Date().getFullYear()
            )
                this.today = i;

            let currentDate = new Date(
                this.currentDate.getFullYear(),
                this.currentDate.getMonth(),
                this.currentDate.getDate() + i - 1
            ).getTime();

            this.currentDays.set(i, currentDate);

            if (this.mainTaskDates.includes(currentDate)) this.eventDays.push(i);
        }

        if (firstDayIndex === -1) nextDays -= 1;

        for (let j = 1; j <= nextDays; j++) this.nextDays.push(j);
    }

    selectDay(currentDate: number): void {
        this.selectDayEvent.emit(currentDate);
    }

    getTooltipForEventDay(currentDate: number): string {
        let tooltip: string = '';
        this.mainTasks.forEach(mainTask => {
            let mainTaskDate = new Date(mainTask.deadline);
            if (
                new Date(mainTaskDate.getFullYear(), mainTaskDate.getMonth(), mainTaskDate.getDate()).getTime() ===
                currentDate
            ) {
                let currentLesson = this.allLesson.find(lesson => lesson.id === mainTask.lessonId)!;
                let currentSubject = this.allSubject.find(subject => subject.id === currentLesson?.subjectId)!;
                tooltip += currentSubject.name + ' (' + currentLesson.type + ') - ' + mainTask.name + '\n';
            }
        });

        return tooltip;
    }
}
