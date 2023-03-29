import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { TeacherDto } from 'src/app/shared/model/timetable/dto/teacher.dto';
import { TeacherService } from 'src/app/shared/service/timetable/teacher.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
    selector: 'app-teacher-data-operations-save-form',
    templateUrl: './teacher-data-operations-save-form.component.html',
    styleUrls: ['./teacher-data-operations-save-form.component.scss'],
})
export class TeacherDataOperationsSaveFormComponent {
    newName = new FormControl('');
    newEmail = new FormControl('');
    newWebpage = new FormControl('');
    newOffice = new FormControl('');
    newMoreInformation = new FormControl('');
    currentUserId: number | null = null;

    constructor(
        private teacherService: TeacherService,
        private snackBar: MatSnackBar,
        private userService: UserService
    ) {
        this.newName?.addValidators([Validators.required, Validators.maxLength(255)]);
        this.newEmail?.addValidators(Validators.maxLength(255));
        this.newWebpage?.addValidators(Validators.maxLength(255));
        this.newOffice?.addValidators(Validators.maxLength(255));
        this.getUserId();
    }

    getUserId(): void {
        this.userService.getUserByToken().subscribe(user => (this.currentUserId = user.id!));
    }

    addTeacher(): void {
        if (this.currentUserId) {
            if (this.newName.valid && this.newEmail.valid && this.newWebpage.valid && this.newOffice.valid) {
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
                            panelClass: ['info-snackbar'],
                        });
                    },
                    error: error =>
                        this.snackBar.open('Hiba tanár hozzáadása során: ' + error, 'X', {
                            horizontalPosition: 'right',
                            verticalPosition: 'bottom',
                            panelClass: ['error-snackbar'],
                        }),
                });
            } else {
                if (this.newName.invalid) this.newName.markAsTouched();
                if (this.newEmail.invalid) this.newEmail.markAsTouched();
                if (this.newWebpage.invalid) this.newWebpage.markAsTouched();
                if (this.newOffice.invalid) this.newOffice.markAsTouched();
            }
        } else {
            this.getUserId();
            this.snackBar.open('Hiba tantárgy hozzáadása során: Felhasználó ismeretlen', 'X', {
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
                panelClass: ['error-snackbar'],
            });
        }
    }

    private createTeacher(): TeacherDto {
        let name: string = '';
        let webpage: string = '';
        let email: string = '';
        let office: string = '';
        let moreInformation: string = '';
        if (this.newName.value !== null) name = this.newName.value;
        if (this.newWebpage.value !== null)
            webpage = this.newWebpage.value.replace('http://', '').replace('https://', '');
        if (this.newEmail.value !== null) email = this.newEmail.value;
        if (this.newOffice.value !== null) office = this.newOffice.value;
        if (this.newMoreInformation.value !== null) moreInformation = this.newMoreInformation.value;
        return new TeacherDto(name, webpage, email, this.currentUserId!, office, moreInformation);
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    isInMobileView(): boolean {
        return this.getScreenWidth() <= 1000;
    }
}
