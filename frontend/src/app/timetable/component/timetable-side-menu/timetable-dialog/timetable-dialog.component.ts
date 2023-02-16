import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { DialogData } from 'src/app/shared/component/dialog/dialog-data.model';
import { DialogComponent } from 'src/app/shared/component/dialog/dialog.component';
import { TimetableDto } from 'src/app/shared/model/timetable/dto/timetable.dto';
import { TimetableService } from 'src/app/shared/service/timetable/timetable.service';

@Component({
    selector: 'app-timetable-dialog',
    templateUrl: './timetable-dialog.component.html',
    styleUrls: ['./timetable-dialog.component.scss'],
})
export class TimetableDialogComponent {
    allTimetable$: Observable<TimetableDto[]> = this.timetableService.getAllTimetableSubject();
    timetableName = new FormControl('', Validators.required);
    selectedForEditIds: number[] = [];
    editedTimetables: Map<number, string> = new Map<number, string>();
    numberOfTimetables: number = 0;

    constructor(
        public dialogRef: MatDialogRef<TimetableDialogComponent>,
        public timetableService: TimetableService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar
    ) {
        this.timetableService.getAllTimetableSubject().subscribe(timetables => {
            this.numberOfTimetables = timetables.length;
            if (this.numberOfTimetables === 1 || this.timetableService.getSelectedTimetableId() === 0)
                this.timetableService.setSelectedTimetableId(timetables[0].id!);
        });
    }

    modifyTimetable(timetable: TimetableDto): void {
        if (timetable.id) this.editedTimetables.set(timetable.id, timetable.name);
    }

    addTimetable(): void {
        let timetable: TimetableDto = new TimetableDto('Új órarend', 1);
        this.timetableService.addTimetable(timetable).subscribe({
            next: newTimetable => {
                this.timetableService.getAllTimetable();
                this.modifyTimetable(newTimetable);
                this.snackBar.open('Órarend hozzáadása sikeres!', 'X', {
                    duration: 2000,
                    horizontalPosition: 'right',
                    verticalPosition: 'bottom',
                    panelClass: ['info-snackbar'],
                });
            },
            error: error =>
                this.snackBar.open('Hiba órarend hozzáadása során: ' + error, 'X', {
                    horizontalPosition: 'right',
                    verticalPosition: 'bottom',
                    panelClass: ['error-snackbar'],
                }),
        });
    }

    saveTimetable(timetable: TimetableDto): void {
        if (timetable.id) {
            if (this.editedTimetables.get(timetable.id)) {
                let updatedTimetable: TimetableDto = new TimetableDto(
                    this.editedTimetables.get(timetable.id)!,
                    timetable.userId,
                    timetable.id
                );
                this.timetableService.updateTimetable(updatedTimetable).subscribe({
                    next: _ => {
                        this.timetableService.getAllTimetable();
                        this.editedTimetables.delete(timetable.id!);
                        this.snackBar.open('Órarend módosítása sikeres!', 'X', {
                            duration: 2000,
                            horizontalPosition: 'right',
                            verticalPosition: 'bottom',
                            panelClass: ['info-snackbar'],
                        });
                    },
                    error: error =>
                        this.snackBar.open('Hiba órarend módosítása során: ' + error, 'X', {
                            horizontalPosition: 'right',
                            verticalPosition: 'bottom',
                            panelClass: ['error-snackbar'],
                        }),
                });
            }
        }
    }

    openDeleteDialog(timetableId: number | null): void {
        const dialogInterface: DialogData = {
            dialogHeader: 'Órarend törlése',
            dialogContent: 'Biztos ki akarod törölni? A "Törlés" gombra nyomva végleg törlöd.',
            cancelButtonLabel: 'Vissza',
            confirmButtonLabel: 'Törlés',
            callbackMethod: () => {
                this.deleteTimetable(timetableId);
            },
        };
        this.dialog.open(DialogComponent, {
            data: dialogInterface,
        });
    }

    //TODO ha törölsz órarendet, akkor a tanórák törlődjenek
    //TODO megnézni hogy hogy van a törlésénél a cascade-olás
    //TODO Valami subject vagy nem tudom, ami felimseri a timetable változást
    deleteTimetable(timetableId: number | null): void {
        if (timetableId)
            this.timetableService.deleteTimetable(timetableId).subscribe({
                next: _ => {
                    if (this.numberOfTimetables === 1) {
                        this.addTimetable();
                    } else {
                        if (timetableId === this.timetableService.getSelectedTimetableId()) {
                            this.timetableService.setSelectedTimetableId(0);
                        }
                        this.timetableService.getAllTimetable();
                    }
                    this.editedTimetables.delete(timetableId);
                    this.snackBar.open('Órarend törlése sikeres!', 'X', {
                        duration: 2000,
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['info-snackbar'],
                    });
                },
                error: error =>
                    this.snackBar.open('Hiba órarend törlése során: ' + error, 'X', {
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['error-snackbar'],
                    }),
            });
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    changeUpdatedName(id: number, updatedName: string): void {
        this.editedTimetables.set(id, updatedName);
    }
}
