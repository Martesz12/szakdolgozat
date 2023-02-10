import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogData } from 'src/app/shared/component/dialog/dialog-data.model';
import { DialogComponent } from 'src/app/shared/component/dialog/dialog.component';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { SubjectDto } from 'src/app/shared/model/timetable/dto/subject.dto';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';

@Component({
    selector: 'app-subject-data-operations-save-form',
    templateUrl: './subject-data-operations-save-form.component.html',
    styleUrls: ['./subject-data-operations-save-form.component.scss'],
})
export class SubjectDataOperationsSaveFormComponent {
    readonly SUBJECT_COLORS: string[] = [
        '#1abc9c',
        '#16a085',
        '#2ecc71',
        '#27ae60',
        '#3498db',
        '#2980b9',
        '#9b59b6',
        '#8e44ad',
        '#34495e',
        '#2c3e50',
        '#f1c40f',
        '#f39c12',
        '#e67e22',
        '#d35400',
        '#e74c3c',
        '#95a5a6',
        '#666b5e',
        '#a98467',
        '#4e3524',
        '#411900'
    ];
    //TODO kell változó, hogy betöltéskor egyből arra ugorjon, lementeni ennek értékét

    selectedSubject: SubjectDto = {} as SubjectDto;

    newName = new FormControl('');
    newAbbreviation = new FormControl('');
    newColor = new FormControl('');
    newRequirement = new FormControl('');

    updatedName = new FormControl('');
    updatedAbbreviation = new FormControl('');
    updatedColor = new FormControl('');
    updatedRequirement = new FormControl('');

    constructor(private subjectService: SubjectService, private snackBar: MatSnackBar, private dialog: MatDialog) {
        this.getSelectedSubject();
        this.newName?.addValidators(Validators.required);
        this.newAbbreviation?.addValidators(Validators.required);
        this.newColor?.addValidators(Validators.required);
        this.updatedName?.addValidators(Validators.required);
        this.updatedAbbreviation?.addValidators(Validators.required);
        this.updatedColor?.addValidators(Validators.required);
    }

    private getSelectedSubject(): void {
        this.subjectService.getSelectedSubjectSubject().subscribe(subject => {
            this.selectedSubject = subject;
            this.updatedName.setValue(subject.name);
            this.updatedAbbreviation.setValue(subject.abbreviation);
            this.updatedColor.setValue(subject.color);
            this.updatedRequirement.setValue(subject.requirement);
        });
    }

    updateSubject(): void {
        if (this.updatedName.valid && this.updatedAbbreviation.valid && this.updatedColor.valid) {
            let updatedSubject: SubjectDto = this.createSubject(true);
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
        }
    }

    addSubject(): void {
        if (this.newName.valid && this.newAbbreviation.valid && this.newColor.valid) {
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

    private createSubject(isUpdated: boolean = false): SubjectDto {
        let name: string = '';
        let color: string = '';
        let abbreviation: string = '';
        let requirement: string = '';
        if (isUpdated) {
            if (this.updatedName.value !== null) name = this.updatedName.value;
            if (this.updatedColor.value !== null) color = this.updatedColor.value;
            if (this.updatedAbbreviation.value !== null) abbreviation = this.updatedAbbreviation.value;
            if (this.updatedRequirement.value !== null) requirement = this.updatedRequirement.value;
            return new SubjectDto(name, abbreviation, color, requirement, 1, this.selectedSubject.id);
        } else {
            if (this.newName.value !== null) name = this.newName.value;
            if (this.newColor.value !== null) color = this.newColor.value;
            if (this.newAbbreviation.value !== null) abbreviation = this.newAbbreviation.value;
            if (this.newRequirement.value !== null) requirement = this.newRequirement.value;
            return new SubjectDto(name, abbreviation, color, requirement, 1);
        }
    }

    isStateTheCurrentPageState(state: string): boolean {
        return state === this.subjectService.getSubjectDataOperationPageState();
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    isInMobileView(): boolean {
        return this.getScreenWidth() <= 599;
    }
}
