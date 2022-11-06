import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    selectedTimetableMenuElement: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor() {}

    setSelectedTimetableMenuElement(selectedMenuId: number) {
        this.selectedTimetableMenuElement.next(selectedMenuId);
    }
}
