import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FacultyDto } from '../../model/forum/faculty.dto';
import { FacultyWebService } from '../api/forum/faculty-web.service';

@Injectable({
    providedIn: 'root',
})
export class FacultyService {
    allFacultySubject: BehaviorSubject<FacultyDto[]> = new BehaviorSubject<FacultyDto[]>([]);

    constructor(private facultyWebService: FacultyWebService) {
        this.getAllFaculty();
    }

    getAllFaculty() {
        this.facultyWebService.getAllFaculty().subscribe(facultys => {
            this.allFacultySubject.next(facultys);
        });
    }

    getAllFacultySubject(): Observable<FacultyDto[]> {
        return this.allFacultySubject.asObservable();
    }

    resetFacultyState(afterDelete: boolean = false): void {
        if (afterDelete) this.getAllFaculty();
    }

    getFacultiesByIds(facultyIds: number[]): Observable<FacultyDto[]> {
        return this.facultyWebService.getFacultiesByIds(facultyIds);
    }
}
