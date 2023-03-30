import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { SubjectDto } from 'src/app/shared/model/timetable/dto/subject.dto';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
    selector: 'app-subject-data-operations-save-form',
    templateUrl: './subject-data-operations-save-form.component.html',
    styleUrls: ['./subject-data-operations-save-form.component.scss'],
})
export class SubjectDataOperationsSaveFormComponent {
    colorPickerValid: boolean = true;
    currentUserId: number | null = null;

    newName = new FormControl('');
    newAbbreviation = new FormControl('');
    newRequirement = new FormControl('');

    constructor(
        public subjectService: SubjectService,
        private snackBar: MatSnackBar,
        private userService: UserService
    ) {
        this.newName?.addValidators([Validators.required, Validators.maxLength(255)]);
        this.newAbbreviation?.addValidators([Validators.required, Validators.maxLength(255)]);
        this.getUserId();
    }

    getUserId(): void {
        this.userService.getUserByToken().subscribe(user => (this.currentUserId = user.id!));
    }

    addSubject(): void {
        if (this.currentUserId) {
            if (this.newName.valid && this.newAbbreviation.valid && this.colorPickerValid) {
                let newSubject: SubjectDto = this.createSubject();
                this.subjectService.addSubject(newSubject).subscribe({
                    next: subject => {
                        this.subjectService.getAllSubject();
                        this.subjectService.setSubjectDataOperationPageState(DataOperationPageState.Description);
                        if (subject.id !== null) this.subjectService.selectSubject(subject.id);
                        this.newName.markAsUntouched();
                        this.snackBar.open('Tantárgy hozzáadása sikeres!', 'X', {
                            duration: 2000,
                            horizontalPosition: 'right',
                            verticalPosition: 'bottom',
                            panelClass: ['info-snackbar'],
                        });
                    },
                    error: error =>
                        this.snackBar.open('Hiba tantárgy hozzáadása során: ' + error, 'X', {
                            horizontalPosition: 'right',
                            verticalPosition: 'bottom',
                            panelClass: ['error-snackbar'],
                        }),
                });
            } else {
                if (this.subjectService.colorPickerIndex === 0) this.colorPickerValid = false;
                if (this.newName.invalid) this.newName.markAsTouched();
                if (this.newAbbreviation.invalid) this.newAbbreviation.markAsTouched();
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

    private createSubject(): SubjectDto {
        let name: string = '';
        let color: string = '';
        let abbreviation: string = '';
        let requirement: string = '';
        if (this.newName.value !== null) name = this.newName.value;
        color = this.subjectService.SUBJECT_COLORS[this.subjectService.colorPickerIndex];
        if (this.newAbbreviation.value !== null) abbreviation = this.newAbbreviation.value;
        if (this.newRequirement.value !== null) requirement = this.newRequirement.value;
        return new SubjectDto(name, abbreviation, color, requirement, this.currentUserId!);
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    isInMobileView(): boolean {
        return this.getScreenWidth() <= 1000;
    }

    colorSliderChange(value: number) {
        if (value !== 0) this.colorPickerValid = true;
        else this.colorPickerValid = false;
        this.subjectService.colorPickerIndex = value;
    }
}
