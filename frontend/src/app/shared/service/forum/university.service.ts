import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, switchMap } from 'rxjs';
import { UniversityDto } from '../../model/forum/university.dto';
import { UniversityWebService } from '../api/forum/university-web.service';

@Injectable({
    providedIn: 'root',
})
export class UniversityService {
    allUniversitySubject: BehaviorSubject<UniversityDto[]> = new BehaviorSubject<UniversityDto[]>([]);

    constructor(private universityWebService: UniversityWebService) {
        this.getAllUniversity();
    }

    getAllUniversity() {
        this.universityWebService.getAllUniversity().subscribe(universities => {
            this.allUniversitySubject.next(universities);
        });
    }

    getAllUniversitySubject(): Observable<UniversityDto[]> {
        return this.allUniversitySubject.asObservable();
    }

    resetUniversityState(afterDelete: boolean = false): void {
        if (afterDelete) this.getAllUniversity();
    }

    getUniversityById(universityId: number): Observable<UniversityDto> {
        return this.universityWebService.getUniversityById(universityId);
    }
}
