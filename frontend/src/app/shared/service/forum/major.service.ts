import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MajorDto } from '../../model/forum/major.dto';
import { MajorWebService } from '../api/forum/major-web.service';

@Injectable({
    providedIn: 'root',
})
export class MajorService {
    allMajorSubject: BehaviorSubject<MajorDto[]> = new BehaviorSubject<MajorDto[]>([]);

    constructor(private majorWebService: MajorWebService) {
        this.getAllMajor();
    }

    getAllMajor() {
        this.majorWebService
            .getAllMajor()
            .subscribe(majors => {
                this.allMajorSubject.next(majors);
            });
    }

    getAllMajorSubject(): Observable<MajorDto[]> {
        return this.allMajorSubject.asObservable();
    }

    resetMajorState(afterDelete: boolean = false): void {
        if (afterDelete) this.getAllMajor();
    }
}
