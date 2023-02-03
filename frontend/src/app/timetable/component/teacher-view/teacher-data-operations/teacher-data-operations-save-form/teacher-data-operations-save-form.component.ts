import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { TeacherDto } from 'src/app/shared/model/timetable/dto/teacher.dto';
import { TeacherService } from 'src/app/shared/service/timetable/teacher.service';

@Component({
    selector: 'app-teacher-data-operations-save-form',
    templateUrl: './teacher-data-operations-save-form.component.html',
    styleUrls: ['./teacher-data-operations-save-form.component.scss'],
})
export class TeacherDataOperationsSaveFormComponent {
    selectedTeacher: TeacherDto = {} as TeacherDto;

    newName = new FormControl('');
    newEmail = new FormControl('');
    newWebpage = new FormControl('');
    newOffice = new FormControl('');
    newMoreInformation = new FormControl('');

    updatedName = new FormControl('');
    updatedEmail = new FormControl('');
    updatedWebpage = new FormControl('');
    updatedOffice = new FormControl('');
    updatedMoreInformation = new FormControl('');

    constructor(private teacherService: TeacherService, private snackBar: MatSnackBar) {
        this.getSelectedTeacher();
        this.newName?.addValidators(Validators.required);
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
            let updatedTeacher: TeacherDto = this.createTeacher(true);
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
                        panelClass: ['info-snackbar']
                    });
                },
                error: error =>
                    this.snackBar.open('Hiba tanár módosítása során: ' + error, 'X', {
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['error-snackbar']
                    }),
            });
        }
    }

    addTeacher(): void {
        if (this.newName.valid) {
            let newTeacher: TeacherDto = this.createTeacher();
            this.teacherService.addTeacher(newTeacher).subscribe({
                next: teacher => {
                    this.teacherService.getAllTeacher();
                    this.teacherService.setTeacherDataOperationPageState(DataOperationPageState.Description);
                    if (teacher.id !== null) this.teacherService.selectTeacher(teacher.id);
                    this.newName.markAsUntouched();
                    this.snackBar.open('Tanár hozzáadása sikeres!', 'X', {
                        duration: 2000,
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['info-snackbar']
                    });
                },
                error: error =>
                    this.snackBar.open('Hiba tanár hozzáadása során: ' + error, 'X', {
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['error-snackbar']
                    }),
            });
        }
    }

    //TODO egységes snackbar-t csinálni maybe
    //TODO icon-t rakni a snackbar-ba
    //TODO Dialog, hogy biztosan akarja e törölni
    //TODO egységes dialog maybe
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
                        panelClass: ['info-snackbar']
                    });
                },
                error: error =>
                    this.snackBar.open('Hiba tanár törlése során: ' + error, 'X', {
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['error-snackbar']
                    }),
            });
    }

    private createTeacher(isUpdated: boolean = false): TeacherDto {
        let name: string = '';
        let webpage: string = '';
        let email: string = '';
        let office: string = '';
        let moreInformation: string = '';
        if (isUpdated) {
            if (this.updatedName.value !== null) name = this.updatedName.value;
            if (this.updatedWebpage.value !== null) webpage = this.updatedWebpage.value;
            if (this.updatedEmail.value !== null) email = this.updatedEmail.value;
            if (this.updatedOffice.value !== null) office = this.updatedOffice.value;
            if (this.updatedMoreInformation.value !== null) moreInformation = this.updatedMoreInformation.value;
            return new TeacherDto(name, webpage, email, 1, office, moreInformation, this.selectedTeacher.id);
        } else {
            if (this.newName.value !== null) name = this.newName.value;
            if (this.newWebpage.value !== null) webpage = this.newWebpage.value;
            if (this.newEmail.value !== null) email = this.newEmail.value;
            if (this.newOffice.value !== null) office = this.newOffice.value;
            if (this.newMoreInformation.value !== null) moreInformation = this.newMoreInformation.value;
            return new TeacherDto(name, webpage, email, 1, office, moreInformation);
        }
    }

    isStateTheCurrentPageState(state: string): boolean {
        return state === this.teacherService.getTeacherDataOperationPageState();
    }

    getScreenWidth(): number{
        return window.innerWidth;
    }

    isInMobileView(): boolean{
        return this.getScreenWidth() <= 599;
    }
}
