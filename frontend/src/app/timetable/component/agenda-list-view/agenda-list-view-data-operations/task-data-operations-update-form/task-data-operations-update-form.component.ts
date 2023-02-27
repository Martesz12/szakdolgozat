import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { DialogData } from 'src/app/shared/component/dialog/dialog-data.model';
import { DialogComponent } from 'src/app/shared/component/dialog/dialog.component';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { LessonDto } from 'src/app/shared/model/timetable/dto/lesson.dto';
import { MainTaskDto } from 'src/app/shared/model/timetable/dto/main-task.dto';
import { SubjectDto } from 'src/app/shared/model/timetable/dto/subject.dto';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';
import { MainTaskService } from 'src/app/shared/service/timetable/main-task.service';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';

@Component({
    selector: 'app-task-data-operations-update-form',
    templateUrl: './task-data-operations-update-form.component.html',
    styleUrls: ['./task-data-operations-update-form.component.scss'],
})
export class TaskDataOperationsUpdateFormComponent {
    readonly TYPES: string[] = ['Feladat', 'Vizsga', 'Zárthelyi', 'Beadandó', 'Teszt'];
    allLesson$: Observable<LessonDto[]> = this.lessonService.getAllLessonSubject();
    allSubject: SubjectDto[] = [];
    selectedMainTaskId: number = 0;

    updatedLesson = new FormControl(0);
    updatedName = new FormControl('');
    updatedDeadline = new FormControl(new Date());
    updatedNote = new FormControl('');
    updatedType = new FormControl('');

    constructor(
        private mainTaskService: MainTaskService,
        private snackBar: MatSnackBar,
        private lessonService: LessonService,
        private subjectService: SubjectService,
        private dialog: MatDialog
    ) {
        this.updatedLesson?.addValidators(Validators.required);
        this.updatedName?.addValidators(Validators.required);
        this.updatedDeadline?.addValidators(Validators.required);
        this.getAllSubject();
        this.getSelectedMainTask();
    }

    getSelectedMainTask() {
        this.mainTaskService.getSelectedMainTaskSubject().subscribe(mainTask => {
            this.updatedName.setValue(mainTask.name);
            this.updatedLesson.setValue(mainTask.lessonId);
            this.updatedDeadline.setValue(mainTask.deadline);
            this.updatedNote.setValue(mainTask.note);
            this.updatedType.setValue(mainTask.type);
            this.selectedMainTaskId = mainTask.id!;
        });
    }

    getAllSubject(): void {
        this.subjectService.getAllSubjectSubject().subscribe(subjects => (this.allSubject = subjects));
    }

    //TODO ha kitörlünk egy subject-et akkor mi lesz a lesson subjectId-ával
    getSubjectName(subjectId: number): string {
        return this.allSubject.find(subject => subject.id === subjectId)!.name;
    }

    updateMainTask(): void {
        if (this.updatedName.valid && this.updatedDeadline.valid && this.updatedLesson.valid) {
            let newMainTask: MainTaskDto = this.createMainTask();
            this.mainTaskService.updateMainTask(newMainTask).subscribe({
                next: mainTask => {
                    this.mainTaskService.getMainTasksByLessonIds();
                    this.mainTaskService.setMainTaskDataOperationPageState(DataOperationPageState.Description);
                    if (mainTask.id !== null) this.mainTaskService.selectMainTask(mainTask.id);
                    this.updatedLesson.markAsUntouched();
                    this.updatedName.markAsUntouched();
                    this.updatedDeadline.markAsUntouched();
                    this.snackBar.open('Feladat módosítása sikeres!', 'X', {
                        duration: 2000,
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['info-snackbar'],
                    });
                },
                error: error =>
                    this.snackBar.open('Hiba feladat módosítása során: ' + error, 'X', {
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['error-snackbar'],
                    }),
            });
        } else {
            if (this.updatedLesson.invalid) this.updatedLesson.markAsTouched();
            if (this.updatedName.invalid) this.updatedName.markAsTouched();
            if (this.updatedDeadline.invalid) this.updatedDeadline.markAsTouched();
        }
    }

    private createMainTask(): MainTaskDto {
        let lessonId: number = 0;
        let name: string = '';
        let note: string = '';
        let deadline: Date = new Date();
        let type: string = '';

        if (this.updatedLesson.value !== null) lessonId = this.updatedLesson.value;
        if (this.updatedName.value !== null) name = this.updatedName.value;
        if (this.updatedNote.value !== null) note = this.updatedNote.value;
        if (this.updatedDeadline.value !== null) deadline = this.updatedDeadline.value;
        if (this.updatedType.value !== null) type = this.updatedType.value;
        return new MainTaskDto(name, false, deadline, note, type, lessonId, this.selectedMainTaskId);
    }

    openDeleteDialog(mainTaskId: number | null): void {
        const dialogInterface: DialogData = {
            dialogHeader: 'Feladat törlése',
            dialogContent: 'Biztos ki akarod törölni? A "Törlés" gombra nyomva végleg törlöd.',
            cancelButtonLabel: 'Vissza',
            confirmButtonLabel: 'Törlés',
            callbackMethod: () => {
                this.deleteMainTask(mainTaskId);
            },
        };
        this.dialog.open(DialogComponent, {
            data: dialogInterface,
        });
    }

    deleteMainTask(mainTaskId: number | null): void {
        if (mainTaskId !== null)
            this.mainTaskService.deleteMainTask(mainTaskId).subscribe({
                next: _ => {
                    this.mainTaskService.getMainTasksByLessonIds();
                    this.mainTaskService.removeSelectedMainTask();
                    this.mainTaskService.setMainTaskDataOperationPageState(DataOperationPageState.Base);
                    this.snackBar.open('Feladat törlése sikeres!', 'X', {
                        duration: 2000,
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['info-snackbar'],
                    });
                },
                error: error =>
                    this.snackBar.open('Hiba feladat törlése során: ' + error, 'X', {
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['error-snackbar'],
                    }),
            });
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    isInMobileView(): boolean {
        return this.getScreenWidth() <= 1000;
    }
}
