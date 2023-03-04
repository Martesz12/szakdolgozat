import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { DialogData } from 'src/app/shared/component/dialog/dialog-data.model';
import { DialogComponent } from 'src/app/shared/component/dialog/dialog.component';
import { TimetableDto } from 'src/app/shared/model/timetable/dto/timetable.dto';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';
import { MainTaskService } from 'src/app/shared/service/timetable/main-task.service';
import { SubTaskService } from 'src/app/shared/service/timetable/sub-task.service';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';
import { TeacherService } from 'src/app/shared/service/timetable/teacher.service';
import { TimetableService } from 'src/app/shared/service/timetable/timetable.service';

@Component({
    selector: 'app-timetable-dialog',
    templateUrl: './timetable-dialog.component.html',
    styleUrls: ['./timetable-dialog.component.scss'],
})
export class TimetableDialogComponent {
    allTimetable$: Observable<TimetableDto[]> = this.timetableService.getAllTimetableSubject();
    timetableName = new FormControl('', Validators.required);
    editedTimetables: Map<number, string> = new Map<number, string>();
    selectedTimetableId: number = 0;

    constructor(
        public dialogRef: MatDialogRef<TimetableDialogComponent>,
        public timetableService: TimetableService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        private lessonService: LessonService,
        private mainTaskService: MainTaskService,
        private subTaskService: SubTaskService,
        private subjectService: SubjectService,
        private teacherService: TeacherService
    ) {
        this.timetableService.getAllTimetableSubject().subscribe(timetables => {
            if (timetables.length === 0) this.addTimetable();
        });
        this.getSelecterTimetableId();
    }

    getSelecterTimetableId() {
        this.timetableService
            .getSelectedTimetableId()
            .subscribe(timetableId => (this.selectedTimetableId = timetableId));
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
            if (this.editedTimetables.get(timetable.id) && this.editedTimetables.get(timetable.id)?.length! <= 255) {
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
            } else {
                this.snackBar.open('Hiba órarend módosítása során: A név nem lehet hosszabb 255 karakternél!', 'X', {
                    horizontalPosition: 'right',
                    verticalPosition: 'bottom',
                    panelClass: ['error-snackbar'],
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

    deleteTimetable(timetableId: number | null): void {
        if (timetableId)
            this.timetableService.deleteTimetable(timetableId).subscribe({
                next: _ => {
                    this.timetableService.resetTimetableState(true);
                    this.teacherService.resetTeacherState(true);
                    this.subjectService.resetSubjectState(true);
                    this.lessonService.resetLessonState(true);
                    this.mainTaskService.resetMainTaskState(true);
                    this.subTaskService.resetSubTaskState(true);
                    this.editedTimetables.delete(timetableId);
                    if (this.selectedTimetableId === timetableId) this.timetableService.setSelectedTimetableId(0);
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
