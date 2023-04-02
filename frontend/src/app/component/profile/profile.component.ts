import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UniversityDto } from '../../shared/model/forum/university.dto';
import { FacultyDto } from '../../shared/model/forum/faculty.dto';
import { MajorDto } from '../../shared/model/forum/major.dto';
import { UniversityService } from '../../shared/service/forum/university.service';
import { FacultyService } from '../../shared/service/forum/faculty.service';
import { MajorService } from '../../shared/service/forum/major.service';
import { Observable } from 'rxjs';
import { TimetableDto } from '../../shared/model/timetable/dto/timetable.dto';
import { TimetableService } from '../../shared/service/timetable/timetable.service';
import { MatSelectChange } from '@angular/material/select';
import { UserDto } from '../../shared/model/authentication/dto/user.dto';
import { UserService } from '../../shared/service/user.service';
import { SnackBarService } from '../../shared/service/snack-bar.service';
import { AuthenticationModifyRequest } from '../../shared/model/authentication/authentication-modify-request';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    email = new FormControl('');
    password = new FormControl('');
    passwordAgain = new FormControl('');
    firstname = new FormControl('');
    lastname = new FormControl('');
    username = new FormControl('');

    newUniversity = new FormControl(0);
    newMajors = new FormControl([] as number[]);
    newFaculties = new FormControl([] as number[]);

    allUniversity: UniversityDto[] = [];
    allFaculty: FacultyDto[] = [];
    filteredFaculties: FacultyDto[] = [];
    allMajor: MajorDto[] = [];
    filteredMajors: MajorDto[] = [];

    allTimetable$: Observable<TimetableDto[]> = this.timetableService.getAllTimetableSubject();
    selectedTimetableId: number = 0;
    currentUser: UserDto = {} as UserDto;

    constructor(
        private universityService: UniversityService,
        private facultyService: FacultyService,
        private majorService: MajorService,
        public timetableService: TimetableService,
        private userService: UserService,
        private snacBarService: SnackBarService
    ) {}

    ngOnInit(): void {
        this.addValidators();
        this.getAllUniversity();
        this.getAllFaculty();
        this.getAllMajor();
        this.getSelectedTimetableId();
        this.getCurrentUser();
    }

    addValidators(): void {
        this.newUniversity?.addValidators([Validators.required]);
        this.email?.addValidators([Validators.required, Validators.maxLength(255), Validators.email]);
        this.password?.addValidators([Validators.required, Validators.maxLength(255)]);
        this.passwordAgain?.addValidators([
            Validators.required,
            Validators.maxLength(255),
            this.passwrodsEqualValidator(),
        ]);
        this.firstname?.addValidators([Validators.required, Validators.maxLength(255)]);
        this.lastname?.addValidators([Validators.required, Validators.maxLength(255)]);
        this.username?.addValidators([Validators.required, Validators.maxLength(255)]);
    }

    private getCurrentUser() {
        this.userService.getUserByToken().subscribe(user => {
            this.currentUser = user;
            this.setFormControlValues();
        });
    }

    setFormControlValues(setAll: boolean = true): void {
        this.newUniversity.setValue(this.currentUser.universityPreference ? this.currentUser.universityPreference : 0);
        this.universityChanged(this.newUniversity.value!);
        this.newFaculties.setValue(this.currentUser.facultiesPreference ? this.currentUser.facultiesPreference : []);
        this.facultyChanged(this.newFaculties.value!);
        this.newMajors.setValue(this.currentUser.majorsPreference ? this.currentUser.majorsPreference : []);
        this.selectedTimetableId = this.currentUser.timetablePreference ? this.currentUser.timetablePreference : 0;
        this.lastname.setValue(this.currentUser.lastname);
        this.firstname.setValue(this.currentUser.firstname);
        this.username.setValue(this.currentUser.appUsername);
        if (setAll) this.email.setValue(this.currentUser.email);
    }

    isPreferenceFormValid(): boolean {
        return (
            this.newUniversity.valid &&
            this.newMajors.valid &&
            this.newFaculties.valid &&
            this.lastname.valid &&
            this.firstname.valid &&
            this.username.valid
        );
    }

    isAuthenticationFormValid(): boolean {
        return this.email.valid && this.password.valid && this.passwordAgain.valid;
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

    getSelectedTimetableId(): void {
        this.timetableService
            .getSelectedTimetableId()
            .subscribe(timetableId => (this.selectedTimetableId = timetableId));
    }

    onTimetableSelected(selectChangeEvent: MatSelectChange): void {
        this.selectedTimetableId = selectChangeEvent.value;
    }

    passwrodsEqualValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return this.password.value === this.passwordAgain.value
                ? null
                : { passwordsAreEqual: { value: control.value } };
        };
    }

    savePreferenceData(): void {
        if (this.isPreferenceFormValid()) {
            let newUser = this.createUser();
            this.userService.modifyUserPreference(newUser).subscribe({
                next: user => {
                    this.snacBarService.infoSnackBar('A felhasználó preferencia módosítása sikeres!');
                    this.currentUser = user;
                    this.setFormControlValues();
                },
                error: err => {
                    this.snacBarService.errorSnackBar('A felhasználó preferencia módosítása sikertelen!');
                },
            });
        }
    }

    saveAuthenticationData(): void {
        let newUserAuthenticationData = this.createAuthenticationModifyRequest();
        this.userService.modifyUserAuthenticationData(newUserAuthenticationData).subscribe({
            next: user => {
                this.snacBarService.infoSnackBar('A felhasználó autentikációs adat módosítása sikeres!');
                this.currentUser = user;
                this.setFormControlValues();
            },
            error: err => {
                this.snacBarService.errorSnackBar('A felhasználó autentikációs adat módosítása sikertelen!');
            },
        });
    }

    private createUser(): UserDto {
        return new UserDto(
            this.currentUser.id,
            this.firstname.value!,
            this.lastname.value!,
            this.username.value!,
            this.currentUser.email,
            this.currentUser.role,
            this.selectedTimetableId === 0 ? null : this.selectedTimetableId,
            this.newUniversity.value === 0 ? null : this.newUniversity.value,
            this.newFaculties.value === [] ? null : this.newFaculties.value,
            this.newMajors.value === [] ? null : this.newMajors.value
        );
    }

    private createAuthenticationModifyRequest(): AuthenticationModifyRequest {
        let newEmail;
        let password;
        newEmail =
            this.email.valid && this.email.value !== this.currentUser.email
                ? this.email.value!
                : this.currentUser.email;
        password =
            this.password.valid && this.passwordAgain.valid && this.password.value?.trim() !== ''
                ? this.password.value!
                : '';
        return new AuthenticationModifyRequest(this.currentUser.email, newEmail, password);
    }
}
