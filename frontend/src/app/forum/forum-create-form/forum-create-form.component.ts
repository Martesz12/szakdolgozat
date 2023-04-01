import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FacultyDto } from 'src/app/shared/model/forum/faculty.dto';
import { ForumDto } from 'src/app/shared/model/forum/forum.dto';
import { MajorDto } from 'src/app/shared/model/forum/major.dto';
import { UniversityDto } from 'src/app/shared/model/forum/university.dto';
import { FacultyService } from 'src/app/shared/service/forum/faculty.service';
import { ForumService } from 'src/app/shared/service/forum/forum.service';
import { MajorService } from 'src/app/shared/service/forum/major.service';
import { UniversityService } from 'src/app/shared/service/forum/university.service';
import { SnackBarService } from '../../shared/service/snack-bar.service';

@Component({
    selector: 'app-forum-create-form',
    templateUrl: './forum-create-form.component.html',
    styleUrls: ['./forum-create-form.component.scss'],
})
export class ForumCreateFormComponent implements OnInit {
    newName = new FormControl('');
    newDescription = new FormControl('');
    newUniversity = new FormControl(0);
    newMajors = new FormControl([]);
    newFaculties = new FormControl([]);

    allUniversity: UniversityDto[] = [];
    allFaculty: FacultyDto[] = [];
    filteredFaculties: FacultyDto[] = [];
    allMajor: MajorDto[] = [];
    filteredMajors: MajorDto[] = [];

    constructor(
        private universityService: UniversityService,
        private facultyService: FacultyService,
        private majorService: MajorService,
        private forumService: ForumService,
        private snackBarService: SnackBarService
    ) {}

    ngOnInit(): void {
        this.newName?.addValidators([Validators.required, Validators.maxLength(255)]);
        this.newDescription?.addValidators(Validators.maxLength(255));
        this.newUniversity?.addValidators([Validators.required, this.idValidator()]);
        this.newMajors?.addValidators(Validators.required);
        this.newFaculties?.addValidators(Validators.required);
        this.getAllUniversity();
        this.getAllFaculty();
        this.getAllMajor();
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
        this.newFaculties.setValue([]);
        this.newMajors.setValue([]);
    }

    facultyChanged(facultyIds: number[]): void {
        let majorIds: number[] = [];
        this.allFaculty.forEach(faculty => {
            if (facultyIds.includes(faculty.id!)) majorIds.push(...faculty.majorIds);
        });
        this.filteredMajors = this.allMajor.filter(major => majorIds.includes(major.id!));
        this.newMajors.setValue(this.newMajors.value!.filter(majorId => majorIds.includes(majorId)));
    }

    addForum(): void {
        if (this.isFormValid()) {
            let newforum: ForumDto = this.createforum();
            this.forumService.addForum(newforum).subscribe({
                next: _ => {
                    this.forumService.getAllForum();
                    this.resetForm();
                    this.snackBarService.infoSnackBar('Szoba kérvény beadása sikeres!');
                },
                error: error => this.snackBarService.errorSnackBar('Hiba szoba kérvény beadása során!'),
            });
        } else {
            if (this.newName.invalid) this.newName.markAsTouched();
            if (this.newDescription.invalid) this.newDescription.markAsTouched();
            if (this.newFaculties.invalid) this.newFaculties.markAsTouched();
            if (this.newUniversity.invalid) this.newUniversity.markAsTouched();
            if (this.newMajors.invalid) this.newMajors.markAsTouched();
        }
    }

    isFormValid(): boolean {
        return (
            this.newName.valid &&
            this.newDescription.valid &&
            this.newFaculties.valid &&
            this.newUniversity.valid &&
            this.newMajors.valid
        );
    }

    resetForm(): void {
        this.newName.setValue('');
        this.newDescription.setValue('');
        this.newFaculties.setValue([]);
        this.newUniversity.setValue(0);
        this.newMajors.setValue([]);
        this.newName.markAsUntouched();
        this.newDescription.markAsUntouched();
        this.newFaculties.markAsUntouched();
        this.newUniversity.markAsUntouched();
        this.newMajors.markAsUntouched();
    }

    private createforum(): ForumDto {
        return new ForumDto(
            this.newName.value!,
            this.newUniversity.value!,
            this.newMajors.value!,
            this.newFaculties.value!,
            this.newDescription.value!,
            false
        );
    }

    idValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return this.newUniversity.value !== 0 ? null : { idNotValid: { value: control.value } };
        };
    }
}
