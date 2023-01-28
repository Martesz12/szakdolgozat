import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeacherDto } from 'src/app/shared/model/timetable/dto/teacher.dto';
import { TeacherService } from 'src/app/shared/service/timetable/teacher.service';

@Component({
    selector: 'app-teacher-data-operations-save-form',
    templateUrl: './teacher-data-operations-save-form.component.html',
    styleUrls: ['./teacher-data-operations-save-form.component.scss'],
})
export class TeacherDataOperationsSaveFormComponent {
    selectedTeacher: TeacherDto = {} as TeacherDto;

    updatedName = new FormControl('');
    updatedEmail = new FormControl('');
    updatedWebpage = new FormControl('');
    updatedOffice = new FormControl('');
    updatedMoreInformation = new FormControl('');

    newName = new FormControl('');
    newEmail = new FormControl('');
    newWebpage = new FormControl('');
    newOffice = new FormControl('');
    newMoreInformation = new FormControl('');

    constructor(private teacherService: TeacherService, private snackBar: MatSnackBar) {
        this.getSelectedTeacher();
        this.newName?.addValidators(Validators.required);
        this.updatedName?.addValidators(Validators.required);
    }

    private getSelectedTeacher() {
        this.teacherService.getSelectedTeacherSubject().subscribe(teacher => {
            this.selectedTeacher = teacher;
            this.updatedName.setValue(this.selectedTeacher.name);
            this.updatedEmail.setValue(this.selectedTeacher.email);
            this.updatedWebpage.setValue(this.selectedTeacher.webpage);
            this.updatedOffice.setValue(this.selectedTeacher.office);
            this.updatedMoreInformation.setValue(this.selectedTeacher.moreInformation);
        });
    }

    updateTeacher() {
        if (this.updatedName.valid) {
            let updatedTeacher: TeacherDto = this.createUpdatedTeacher();
            this.teacherService.updateTeacher(updatedTeacher).subscribe(
                _ => {
                    this.teacherService.getAllTeacher();
                    if (updatedTeacher.id !== null) this.teacherService.selectTeacher(updatedTeacher.id);
                    this.snackBar.open('Tanár módosítása sikeres!', 'X', { duration: 2000 });
                },
                err => this.snackBar.open('Hiba tanár módosítása során: ' + err, 'X', { duration: 10000 })
            );
        }
    }

    deleteTeacher(teacherId: number | null) {
        if (teacherId !== null)
            this.teacherService.deleteTeacher(teacherId).subscribe(
                _ => {
                    this.teacherService.getAllTeacher();
                    this.teacherService.removeSelectedTeacher();
                    this.snackBar.open('Tanár törlése sikeres!', 'X', { duration: 2000 });
                },
                err => this.snackBar.open('Hiba tanár törlése során: ' + err, 'X', { duration: 10000 })
            );
    }

    addTeacher() {
        if (this.newName.valid) {
            let newTeacher: TeacherDto = this.createNewTeacher();
            this.teacherService.addTeacher(newTeacher).subscribe(
                _ => {
                    this.teacherService.getAllTeacher();
                    this.snackBar.open('Tanár hozzáadása sikeres!', 'X', { duration: 2000 });
                    this.newName.setValue('');
                    this.newEmail.setValue('');
                    this.newWebpage.setValue('');
                },
                err => this.snackBar.open('Hiba tanár hozzáadása során: ' + err, 'X', { duration: 10000 })
            );
        }
    }

    createNewTeacher(): TeacherDto {
        let name: string = '';
        let webpage: string = '';
        let email: string = '';
        let office: string = '';
        let moreInformation: string = '';
        if (this.newName.value !== null) name = this.newName.value;
        if (this.newWebpage.value !== null) webpage = this.newWebpage.value;
        if (this.newEmail.value !== null) email = this.newEmail.value;
        if (this.newOffice.value !== null) office = this.newOffice.value;
        if (this.newMoreInformation.value !== null) moreInformation = this.newMoreInformation.value;
        return new TeacherDto(name, webpage, email, 3, office, moreInformation);
    }

    createUpdatedTeacher(): TeacherDto {
        let name: string = '';
        let webpage: string = '';
        let email: string = '';
        let office: string = '';
        let moreInformation: string = '';
        if (this.updatedName.value !== null) name = this.updatedName.value;
        if (this.updatedWebpage.value !== null) webpage = this.updatedWebpage.value;
        if (this.updatedEmail.value !== null) email = this.updatedEmail.value;
        if (this.updatedOffice.value !== null) office = this.updatedOffice.value;
        if (this.updatedMoreInformation.value !== null) moreInformation = this.updatedMoreInformation.value;
        console.log(name + ' ' + webpage + ' ' + email);

        return new TeacherDto(name, webpage, email, 3, office, moreInformation, this.selectedTeacher.id);
    }

    isStateTheCurrentPageState(state: string): boolean {
        return state === this.teacherService.getTeacherDataOperationPageState();
    }
}
