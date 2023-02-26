import { AfterViewInit, Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { MainTaskDto } from 'src/app/shared/model/timetable/dto/main-task.dto';
import { MainTaskService } from 'src/app/shared/service/timetable/main-task.service';

@Component({
    selector: 'app-agenda-monthly-view-calendar',
    templateUrl: './agenda-monthly-view-calendar.component.html',
    styleUrls: ['./agenda-monthly-view-calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AgendaMonthlyViewCalendarComponent implements AfterViewInit {
    mainTasks: MainTaskDto[] = [];
    mainTaskDates: number[] = [];
    currentDate: Date = new Date();

    constructor(private mainTaskService: MainTaskService) {
        this.mainTaskService.getAllMainTaskSubject().subscribe(mainTasks => {
            this.mainTasks = mainTasks;
            mainTasks.forEach(mainTask => this.mainTaskDates.push(new Date(mainTask.deadline).getTime()));
            this.renderCalendar();
        });
    }

    ngAfterViewInit(): void {
        // this.renderCalendar();
    }

    navigateBack(): void {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.renderCalendar();
    }

    navigateForeward(): void {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.renderCalendar();
    }

    renderCalendar(): void {
        this.currentDate.setDate(1);

        const monthDays = document.querySelector('.days');

        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();

        const prevLastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();

        const firstDayIndex = this.currentDate.getDay()-1;

        const lastDayIndex = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDay()-1;

        const nextDays = 7 - lastDayIndex - 1;

        const months = [
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

        document.querySelector('.date .month-name')!.innerHTML = months[this.currentDate.getMonth()];

        document.querySelector('.date .date-name')!.innerHTML = new Date().toDateString();

        let days = '';

        for (let x = firstDayIndex; x > 0; x--) {
            days += `<div class="full-day"><div class="prev-date">${prevLastDay - x + 1}</div><div class="bullet-empty"></div></div>`;
        }

        
        for (let i = 1; i <= lastDay; i++) {
            days += '<div class="full-day '
            if (i === new Date().getDate() && this.currentDate.getMonth() === new Date().getMonth() && this.currentDate.getFullYear() === new Date().getFullYear()) {
                days += `today"/><div>${i}</div>`;
            } else {
                days += `"/><div>${i}</div>`;
            }
            if(this.mainTaskDates.includes(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate()+i-1).getTime())){
                days += '<div class="bullet-full"></div>'
            } else {
                days += '<div class="bullet-empty"></div>'
            }
            days += '</div>'
        }

        for (let j = 1; j <= nextDays; j++) {
            days += `<div class="full-day"><div class="next-date">${j}</div><div class="bullet-empty"></div></div>`;
            monthDays!.innerHTML = days;
        }
    }
}
