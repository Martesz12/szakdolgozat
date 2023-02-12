import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogData } from 'src/app/shared/component/dialog/dialog-data.model';
import { DialogComponent } from 'src/app/shared/component/dialog/dialog.component';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { TeacherDto } from 'src/app/shared/model/timetable/dto/teacher.dto';
import { TeacherService } from 'src/app/shared/service/timetable/teacher.service';

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

    constructor(private teacherService: TeacherService, private snackBar: MatSnackBar, private dialog: MatDialog) {
        this.getSelectedTeacher();
        this.updatedName?.addValidators(Validators.required);
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
        if (this.updatedName.valid) {
            let updatedTeacher: TeacherDto = this.createTeacher();
            this.teacherService.updateTeacher(updatedTeacher).subscribe({
                next: teacher => {
                    this.teacherService.getAllTeacher();
                    this.teacherService.setTeacherDataOperationPageState(DataOperationPageState.Description);
                    if (teacher.id !== null) this.teacherService.selectTeacher(teacher.id);
                    this.updatedName.markAsUntouched();
                    this.snackBar.open('Tanár módosítása sikeres!', 'X', {
                        duration: 2000,
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['info-snackbar'],
                    });
                },
                error: error =>
                    this.snackBar.open('Hiba tanár módosítása során: ' + error, 'X', {
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['error-snackbar'],
                    }),
            });
        } else {
            if (this.updatedName.invalid) this.updatedName.markAsTouched();
        }
    }

    openDeleteDialog(teacherId: number | null): void {
        const dialogInterface: DialogData = {
            dialogHeader: 'Tanár törlése',
            dialogContent: 'Biztos ki akarod törölni? A "Törlés" gombra nyomva végleg törlöd.',
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
                    this.teacherService.getAllTeacher();
                    this.teacherService.removeSelectedTeacher();
                    this.teacherService.setTeacherDataOperationPageState(DataOperationPageState.Base);
                    this.snackBar.open('Tanár törlése sikeres!', 'X', {
                        duration: 2000,
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['info-snackbar'],
                    });
                },
                error: error =>
                    this.snackBar.open('Hiba tanár törlése során: ' + error, 'X', {
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['error-snackbar'],
                    }),
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
        return new TeacherDto(name, webpage, email, 1, office, moreInformation, this.selectedTeacher.id);
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    isInMobileView(): boolean {
        return this.getScreenWidth() <= 599;
    }
}
