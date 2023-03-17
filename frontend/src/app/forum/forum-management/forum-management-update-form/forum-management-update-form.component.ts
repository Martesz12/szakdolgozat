import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs';
import { FacultyDto } from 'src/app/shared/model/forum/faculty.dto';
import { ForumDto } from 'src/app/shared/model/forum/forum.dto';
import { MajorDto } from 'src/app/shared/model/forum/major.dto';
import { UniversityDto } from 'src/app/shared/model/forum/university.dto';
import { FacultyService } from 'src/app/shared/service/forum/faculty.service';
import { ForumService } from 'src/app/shared/service/forum/forum.service';
import { MajorService } from 'src/app/shared/service/forum/major.service';
import { UniversityService } from 'src/app/shared/service/forum/university.service';

@Component({
    selector: 'app-forum-management-update-form',
    templateUrl: './forum-management-update-form.component.html',
    styleUrls: ['./forum-management-update-form.component.scss'],
})
export class ForumManagementUpdateFormComponent implements OnInit {
    updatedName = new FormControl('');
    updatedDescription = new FormControl('');
    updatedUniversity = new FormControl(0);
    updatedMajors = new FormControl([] as number[]);
    updatedFaculties = new FormControl([] as number[]);

    allUniversity: UniversityDto[] = [];
    allFaculty: FacultyDto[] = [];
    filteredFaculties: FacultyDto[] = [];
    allMajor: MajorDto[] = [];
    filteredMajors: MajorDto[] = [];

    selectedForumId: number = 0;

    constructor(
        private universityService: UniversityService,
        private facultyService: FacultyService,
        private majorService: MajorService,
        private forumService: ForumService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.updatedName?.addValidators([Validators.required, Validators.maxLength(255)]);
        this.updatedDescription?.addValidators(Validators.maxLength(255));
        this.updatedUniversity?.addValidators([Validators.required, this.idValidator()]);
        this.updatedMajors?.addValidators(Validators.required);
        this.updatedFaculties?.addValidators(Validators.required);
        this.getSelectedForum();
        this.getAllUniversity();
        this.getAllFaculty();
        this.getAllMajor();
    }

    getSelectedForum(): void {
        this.forumService
            .getSelectedForumSubject()
            .pipe(filter(selectedForum => !!selectedForum && !!Object.keys(selectedForum).length))
            .subscribe(selectedForum => {
                this.updatedName.setValue(selectedForum.name);
                this.updatedDescription.setValue(selectedForum.description);
                this.updatedUniversity.setValue(selectedForum.universityId);
                this.universityChanged(selectedForum.universityId);
                this.updatedFaculties.setValue(selectedForum.facultyIds);
                this.facultyChanged(selectedForum.facultyIds);
                this.updatedMajors.setValue(selectedForum.majorIds);
                this.selectedForumId = selectedForum.id!;
            });
    }

    getAllUniversity(): void {
        this.universityService.getAllUniversitySubject().subscribe(allUniversity => {
            this.allUniversity = allUniversity;
        });
    }

    getAllFaculty(): void {
        this.facultyService.getAllFacultySubject().subscribe(allFaculty => {
            this.allFaculty = allFaculty;
        });
    }

    getAllMajor(): void {
        this.majorService.getAllMajorSubject().subscribe(allMajor => {
            this.allMajor = allMajor;
        });
    }

    universityChanged(universityId: number): void {
        this.filteredFaculties = this.allFaculty.filter(faculty => faculty.universityId === universityId);
        this.updatedFaculties.setValue([]);
        this.updatedMajors.setValue([]);
    }

    facultyChanged(facultyIds: number[]): void {
        let majorIds: number[] = [];
        this.allFaculty.forEach(faculty => {
            if (facultyIds.includes(faculty.id!)) majorIds.push(...faculty.majorIds);
        });
        this.filteredMajors = this.allMajor.filter(major => majorIds.includes(major.id!));
        this.updatedMajors.setValue(this.updatedMajors.value!.filter(majorId => majorIds.includes(majorId)));
    }

    addForum(): void {
        if (this.isFormValid()) {
            let newforum: ForumDto = this.createforum();
            this.forumService.addForum(newforum).subscribe({
                next: _ => {
                    this.forumService.getAllForum();
                    this.resetForm();
                    this.snackBar.open('Szoba módosítása sikeres!', 'X', {
                        duration: 2000,
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['info-snackbar'],
                    });
                },
                error: error =>
                    this.snackBar.open('Hiba szoba módosítása során: ' + error, 'X', {
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['error-snackbar'],
                    }),
            });
        } else {
            if (this.updatedName.invalid) this.updatedName.markAsTouched();
            if (this.updatedDescription.invalid) this.updatedDescription.markAsTouched();
            if (this.updatedFaculties.invalid) this.updatedFaculties.markAsTouched();
            if (this.updatedUniversity.invalid) this.updatedUniversity.markAsTouched();
            if (this.updatedMajors.invalid) this.updatedMajors.markAsTouched();
        }
    }

    isFormValid(): boolean {
        return (
            this.updatedName.valid &&
            this.updatedDescription.valid &&
            this.updatedFaculties.valid &&
            this.updatedUniversity.valid &&
            this.updatedMajors.valid
        );
    }

    resetForm(): void {
        this.updatedName.setValue('');
        this.updatedDescription.setValue('');
        this.updatedFaculties.setValue([]);
        this.updatedUniversity.setValue(0);
        this.updatedMajors.setValue([]);
        this.updatedName.markAsUntouched();
        this.updatedDescription.markAsUntouched();
        this.updatedFaculties.markAsUntouched();
        this.updatedUniversity.markAsUntouched();
        this.updatedMajors.markAsUntouched();
    }

    private createforum(): ForumDto {
        return new ForumDto(
            this.updatedName.value!,
            this.updatedUniversity.value!,
            this.updatedMajors.value!,
            this.updatedFaculties.value!,
            this.updatedDescription.value!,
            true
        );
    }

    idValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return this.updatedUniversity.value !== 0 ? null : { idNotValid: { value: control.value } };
        };
    }
}
