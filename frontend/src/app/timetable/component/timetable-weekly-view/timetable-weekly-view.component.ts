import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-timetable-weekly-view',
    templateUrl: './timetable-weekly-view.component.html',
    styleUrls: ['./timetable-weekly-view.component.scss'],
})
export class TimetableWeeklyViewComponent implements OnInit {
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
    rowNumber: number[] = Array(48).fill(0).map((x,i)=>i);
    colNumber: number[] = Array(8).fill(0).map((x,i)=>i);

    constructor() {}

    ngOnInit(): void {}
}
