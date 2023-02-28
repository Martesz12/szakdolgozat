import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { filter, switchMap } from 'rxjs';
import { MainTaskDto } from 'src/app/shared/model/timetable/dto/main-task.dto';
import { MainTaskService } from 'src/app/shared/service/timetable/main-task.service';
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

    constructor(private mainTaskService: MainTaskService, private timetableService: TimetableService) {
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
                })
            )
            .subscribe(mainTasks => {
                this.mainTasks = mainTasks;
                mainTasks.forEach(mainTask => this.mainTaskDates.push(new Date(mainTask.deadline).getTime()));
                this.renderCalendar();
            });
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
        this.currentDays = new Map<number, number>();;
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
        console.log(currentDate);
    }
}
