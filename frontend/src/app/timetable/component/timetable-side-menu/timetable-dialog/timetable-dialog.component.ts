import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TimetableDto } from 'src/app/shared/model/timetable/dto/timetable.dto';
import { TimetableService } from 'src/app/shared/service/timetable/timetable.service';

export const timetableOperationStates = ['base', 'add', 'modify'] as const;
export type TimetableOperationStates = typeof timetableOperationStates[number];

@Component({
    selector: 'app-timetable-dialog',
    templateUrl: './timetable-dialog.component.html',
    styleUrls: ['./timetable-dialog.component.scss'],
})
export class TimetableDialogComponent {
    allTimetable$: Observable<TimetableDto[]> = this.timetableService.getAllTimetableSubject();
    selectedTimetableId: number | null = null;
    timetableName = new FormControl('', Validators.required);
    currentOperationState: TimetableOperationStates = 'base';

    constructor(public dialogRef: MatDialogRef<TimetableDialogComponent>, public timetableService: TimetableService) {
        this.selectedTimetableId = timetableService.getSelectedTimetableId();
    }

    setSelectedTimetable(selectedId: number | null): void {
        this.selectedTimetableId = selectedId;
    }

    modifyTimetable(timetable: TimetableDto): void {
        //TODO beállítani a nevet meg selected Timetable esetleg
        this.currentOperationState = 'modify';
    }

    openDeleteDialog(timetableId: number | null): void {}

    addTimetable(): void {
        //TODO csinálni új timetable-t és az a selected Timetable esetleg
        this.currentOperationState = 'add';
    }

    saveTimetable(): void {
        if (this.currentOperationState === 'add') {
            //TODO
        } else if (this.currentOperationState === 'modify') {
            //TODO
        }
        this.currentOperationState = 'base';
    }

    saveDialog(): void {
        //TODO átírni az aktuális kijelöltre a selected timetable-t
        this.dialogRef.close();
    }

    closeDialog(): void {
        this.dialogRef.close();
    }
}
