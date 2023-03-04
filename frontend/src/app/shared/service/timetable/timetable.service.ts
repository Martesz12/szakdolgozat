import { Injectable } from '@angular/core';
import { TimetableWebService } from '../api/timetable/timetable-web.service';
import { TimetableDto } from '../../model/timetable/dto/timetable.dto';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TimetableService {
    private allTimetableSubject: BehaviorSubject<TimetableDto[]> = new BehaviorSubject<TimetableDto[]>([]);
    private selectedTimetableId: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor(private timetableWebService: TimetableWebService) {
        this.getAllTimetable();
    }

    getAllTimetable() {
        this.timetableWebService.getAllTimetable().subscribe(timetables => {
            this.allTimetableSubject.next(timetables);
        });
    }

    getAllTimetableSubject(): Observable<TimetableDto[]> {
        return this.allTimetableSubject.asObservable();
    }

    addTimetable(timetable: TimetableDto): Observable<TimetableDto> {
        return this.timetableWebService.addTimetable(timetable);
    }

    deleteTimetable(timetableId: number) {
        return this.timetableWebService.deleteTimetable(timetableId);
    }

    updateTimetable(timetable: TimetableDto): Observable<TimetableDto> {
        return this.timetableWebService.updateTimetable(timetable);
    }

    getTimetableById(number: number): Observable<TimetableDto> {
        return this.timetableWebService.getTimetableById(number);
    }

    setSelectedTimetableId(selectedId: number): void {
        this.selectedTimetableId.next(selectedId);
    }

    getSelectedTimetableId(): Observable<number> {
        return this.selectedTimetableId.asObservable();
    }

    resetTimetableState(afterDelete: boolean = false): void {
        if (afterDelete) this.getAllTimetable();
    }
}
