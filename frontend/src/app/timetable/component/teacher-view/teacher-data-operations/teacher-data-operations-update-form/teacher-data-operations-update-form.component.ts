import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/component/dialog/dialog-data.model';
import { DialogComponent } from 'src/app/shared/component/dialog/dialog.component';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { TeacherDto } from 'src/app/shared/model/timetable/dto/teacher.dto';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';
import { MainTaskService } from 'src/app/shared/service/timetable/main-task.service';
import { SubTaskService } from 'src/app/shared/service/timetable/sub-task.service';
import { TeacherService } from 'src/app/shared/service/timetable/teacher.service';
import { SnackBarService } from '../../../../../shared/service/snack-bar.service';

@Component({
    selector: 'app-teacher-data-operations-update-form',
    templateUrl: './teacher-data-operations-update-form.component.html',
    styleUrls: ['./teacher-data-operations-update-form.component.scss'],
})
export class TeacherDataOperationsUpdateFormComponent {
    selectedTeacher: TeacherDto = {} as TeacherDto;

    updatedName = new FormControl('');
    updatedEmail = new FormControl('');
    updatedWebpage = new FormControl('');
    updatedOffice = new FormControl('');
    updatedMoreInformation = new FormControl('');

    constructor(
        private teacherService: TeacherService,
        private snackBarService: SnackBarService,
        private dialog: MatDialog,
        private lessonService: LessonService,
        private mainTaskService: MainTaskService,
        private subTaskService: SubTaskService
    ) {
        this.getSelectedTeacher();
        this.updatedName?.addValidators([Validators.required, Validators.maxLength(255)]);
        this.updatedEmail?.addValidators(Validators.maxLength(255));
        this.updatedWebpage?.addValidators(Validators.maxLength(255));
        this.updatedOffice?.addValidators(Validators.maxLength(255));
    }

    private getSelectedTeacher(): void {
        this.teacherService.getSelectedTeacherSubject().subscribe(teacher => {
            this.selectedTeacher = teacher;
            this.updatedName.setValue(teacher.name);
            this.updatedEmail.setValue(teacher.email);
            this.updatedWebpage.setValue(teacher.webpage);
            this.updatedOffice.setValue(teacher.office);
            this.updatedMoreInformation.setValue(teacher.moreInformation);
        });
    }

    updateTeacher(): void {
        if (
            this.updatedName.valid &&
            this.updatedEmail.valid &&
            this.updatedWebpage.valid &&
            this.updatedOffice.valid
        ) {
            let updatedTeacher: TeacherDto = this.createTeacher();
            this.teacherService.updateTeacher(updatedTeacher).subscribe({
                next: teacher => {
                    this.teacherService.getAllTeacher();
                    this.teacherService.setTeacherDataOperationPageState(DataOperationPageState.Description);
                    if (teacher.id !== null) this.teacherService.selectTeacher(teacher.id);
                    this.updatedName.markAsUntouched();
                    this.snackBarService.infoSnackBar('Tanár módosítása sikeres!');
                },
                error: error => this.snackBarService.errorSnackBar('Hiba tanár módosítása során!'),
            });
        } else {
            if (this.updatedName.invalid) this.updatedName.markAsTouched();
            if (this.updatedEmail.invalid) this.updatedEmail.markAsTouched();
            if (this.updatedWebpage.invalid) this.updatedWebpage.markAsTouched();
            if (this.updatedOffice.invalid) this.updatedOffice.markAsTouched();
        }
    }

    openDeleteDialog(teacherId: number | null): void {
        const dialogInterface: DialogData = {
            dialogHeader: 'Tanár törlése',
            dialogContent:
                'Biztos ki akarod törölni? A "Törlés" gombra nyomva végleg törlöd. A tanár törlése magával vonja az összes hozzá tartozó tanóra és feladat törlését.',
            cancelButtonLabel: 'Vissza',
            confirmButtonLabel: 'Törlés',
            callbackMethod: () => {
                this.deleteTeacher(teacherId);
            },
        };
        this.dialog.open(DialogComponent, {
            data: dialogInterface,
        });
    }

    deleteTeacher(teacherId: number | null): void {
        if (teacherId !== null)
            this.teacherService.deleteTeacher(teacherId).subscribe({
                next: _ => {
                    this.teacherService.resetTeacherState(true);
                    this.lessonService.resetLessonState(true);
                    this.mainTaskService.resetMainTaskState(true);
                    this.subTaskService.resetSubTaskState(true);
                    this.snackBarService.infoSnackBar('Tanár törlése sikeres!');
                },
                error: error => this.snackBarService.errorSnackBar('Hiba tanár törlése során!'),
            });
    }

    private createTeacher(): TeacherDto {
        let name: string = '';
        let webpage: string = '';
        let email: string = '';
        let office: string = '';
        let moreInformation: string = '';
        if (this.updatedName.value !== null) name = this.updatedName.value;
        if (this.updatedWebpage.value !== null)
            webpage = this.updatedWebpage.value.replace('http://', '').replace('https://', '');
        if (this.updatedEmail.value !== null) email = this.updatedEmail.value;
        if (this.updatedOffice.value !== null) office = this.updatedOffice.value;
        if (this.updatedMoreInformation.value !== null) moreInformation = this.updatedMoreInformation.value;
        return new TeacherDto(
            name,
            webpage,
            email,
            this.selectedTeacher.userId,
            office,
            moreInformation,
            this.selectedTeacher.id
        );
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    isInMobileView(): boolean {
        return this.getScreenWidth() <= 1000;
    }
}
