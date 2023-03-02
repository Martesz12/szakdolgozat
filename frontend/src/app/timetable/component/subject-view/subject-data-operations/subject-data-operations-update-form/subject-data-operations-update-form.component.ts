import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogData } from 'src/app/shared/component/dialog/dialog-data.model';
import { DialogComponent } from 'src/app/shared/component/dialog/dialog.component';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { SubjectDto } from 'src/app/shared/model/timetable/dto/subject.dto';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';

@Component({
    selector: 'app-subject-data-operations-update-form',
    templateUrl: './subject-data-operations-update-form.component.html',
    styleUrls: ['./subject-data-operations-update-form.component.scss'],
})
export class SubjectDataOperationsUpdateFormComponent {
    colorPickerValid: boolean = true;
    selectedSubject: SubjectDto = {} as SubjectDto;

    updatedName = new FormControl('');
    updatedAbbreviation = new FormControl('');
    updatedRequirement = new FormControl('');

    constructor(public subjectService: SubjectService, private snackBar: MatSnackBar, private dialog: MatDialog) {
        this.getSelectedSubject();
        this.updatedName?.addValidators([Validators.required, Validators.maxLength(255)]);
        this.updatedAbbreviation?.addValidators([Validators.required, Validators.maxLength(255)]);
    }

    private getSelectedSubject(): void {
        this.subjectService.getSelectedSubjectSubject().subscribe(subject => {
            this.selectedSubject = subject;
            this.updatedName.setValue(subject.name);
            this.updatedAbbreviation.setValue(subject.abbreviation);
            let index = this.subjectService.SUBJECT_COLORS.indexOf(subject.color);
            this.subjectService.colorPickerIndex = index !== -1 ? index : 0;
            this.updatedRequirement.setValue(subject.requirement);
        });
    }

    updateSubject(): void {
        if (this.updatedName.valid && this.updatedAbbreviation.valid && this.colorPickerValid) {
            let updatedSubject: SubjectDto = this.createSubject();
            this.subjectService.updateSubject(updatedSubject).subscribe({
                next: subject => {
                    this.subjectService.getAllSubject();
                    this.subjectService.setSubjectDataOperationPageState(DataOperationPageState.Description);
                    if (subject.id !== null) this.subjectService.selectSubject(subject.id);
                    this.updatedName.markAsUntouched();
                    this.snackBar.open('Tantárgy módosítása sikeres!', 'X', {
                        duration: 2000,
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['info-snackbar'],
                    });
                },
                error: error =>
                    this.snackBar.open('Hiba tantárgy módosítása során: ' + error, 'X', {
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['error-snackbar'],
                    }),
            });
        } else {
            if (this.subjectService.colorPickerIndex === 0) this.colorPickerValid = false;
            if (this.updatedName.invalid) this.updatedName.markAsTouched();
            if (this.updatedAbbreviation.invalid) this.updatedAbbreviation.markAsTouched();
        }
    }

    openDeleteDialog(subjectId: number | null): void {
        const dialogInterface: DialogData = {
            dialogHeader: 'Tantárgy törlése',
            dialogContent: 'Biztos ki akarod törölni? A "Törlés" gombra nyomva végleg törlöd.',
            cancelButtonLabel: 'Vissza',
            confirmButtonLabel: 'Törlés',
            callbackMethod: () => {
                this.deleteSubject(subjectId);
            },
        };
        this.dialog.open(DialogComponent, {
            data: dialogInterface,
        });
    }

    deleteSubject(subjectId: number | null): void {
        if (subjectId !== null)
            this.subjectService.deleteSubject(subjectId).subscribe({
                next: _ => {
                    this.subjectService.getAllSubject();
                    this.subjectService.removeSelectedSubject();
                    this.subjectService.setSubjectDataOperationPageState(DataOperationPageState.Base);
                    this.snackBar.open('Tantárgy törlése sikeres!', 'X', {
                        duration: 2000,
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['info-snackbar'],
                    });
                },
                error: error =>
                    this.snackBar.open('Hiba tantárgy törlése során: ' + error, 'X', {
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['error-snackbar'],
                    }),
            });
    }

    private createSubject(): SubjectDto {
        let name: string = '';
        let color: string = '';
        let abbreviation: string = '';
        let requirement: string = '';
        if (this.updatedName.value !== null) name = this.updatedName.value;
        color = this.subjectService.SUBJECT_COLORS[this.subjectService.colorPickerIndex];
        if (this.updatedAbbreviation.value !== null) abbreviation = this.updatedAbbreviation.value;
        if (this.updatedRequirement.value !== null) requirement = this.updatedRequirement.value;
        return new SubjectDto(name, abbreviation, color, requirement, 1, this.selectedSubject.id);
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
