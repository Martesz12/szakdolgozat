import { Component } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { LessonDto } from 'src/app/shared/model/timetable/dto/lesson.dto';
import { SubjectDto } from 'src/app/shared/model/timetable/dto/subject.dto';
import { TeacherDto } from 'src/app/shared/model/timetable/dto/teacher.dto';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';
import { TeacherService } from 'src/app/shared/service/timetable/teacher.service';
import { TimetableService } from 'src/app/shared/service/timetable/timetable.service';

@Component({
    selector: 'app-lesson-data-operations-save-form',
    templateUrl: './lesson-data-operations-save-form.component.html',
    styleUrls: ['./lesson-data-operations-save-form.component.scss'],
})
export class LessonDataOperationsSaveFormComponent {
    readonly DAYS: string[] = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];

    readonly TYPES: string[] = ['Előadás', 'Gyakorlat'];

    allSubject: SubjectDto[] = [];
    allTeacher: TeacherDto[] = [];
    newDay = new FormControl('');
    newStartTime = new FormControl('');
    newEndTime = new FormControl('');
    newLocation = new FormControl('');
    newType = new FormControl('');
    newSubjectId = new FormControl('');
    newTeacherId = new FormControl('');

    selectedTimetableId: number = 0;

    constructor(
        private lessonService: LessonService,
        private snackBar: MatSnackBar,
        private subjectService: SubjectService,
        private teacherService: TeacherService,
        private timetableService: TimetableService
    ) {
        this.getAllSubject();
        this.getAllTeacher();
        this.newDay?.addValidators(Validators.required);
        this.newStartTime?.addValidators(Validators.required);
        this.newEndTime?.addValidators([Validators.required, this.startTimeLowerThanEndTimeValidator()]);
        this.newType?.addValidators(Validators.required);
        this.newSubjectId?.addValidators(Validators.required);
        this.newTeacherId?.addValidators(Validators.required);
        this.getSelecterTimetableId();
    }

    getSelecterTimetableId() {
        this.timetableService
            .getSelectedTimetableId()
            .subscribe(timetableId => (this.selectedTimetableId = timetableId));
    }

    getAllSubject(): void {
        this.subjectService.getAllSubjectSubject().subscribe(subjects => (this.allSubject = subjects));
    }

    getAllTeacher(): void {
        this.teacherService.getAllTeacherSubject().subscribe(teachers => (this.allTeacher = teachers));
    }

    addLesson(): void {
        if (
            this.newDay.valid &&
            this.newStartTime.valid &&
            this.newEndTime.valid &&
            this.newType.valid &&
            this.newSubjectId.valid &&
            this.newTeacherId.valid
        ) {
            let newLesson: LessonDto = this.createLesson();
            this.lessonService.addLesson(newLesson).subscribe({
                next: lesson => {
                    this.lessonService.getLessonsByTimetableId();
                    this.lessonService.setLessonDataOperationPageState(DataOperationPageState.Description);
                    if (lesson.id !== null) this.lessonService.selectLesson(lesson.id);
                    this.newDay.markAsUntouched();
                    this.newStartTime.markAsUntouched();
                    this.newEndTime.markAsUntouched();
                    this.newType.markAsUntouched();
                    this.newSubjectId.markAsUntouched();
                    this.newTeacherId.markAsUntouched();
                    this.snackBar.open('Tanóra hozzáadása sikeres!', 'X', {
                        duration: 2000,
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['info-snackbar'],
                    });
                },
                error: error => {
                    if (this.selectedTimetableId === 0) error = 'Nincs kiválasztott órarend!';
                    this.snackBar.open('Hiba tanóra hozzáadása során: ' + error, 'X', {
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['error-snackbar'],
                    });
                },
            });
        } else {
            if (this.newDay.invalid) this.newDay.markAsTouched();
            if (this.newStartTime.invalid) this.newStartTime.markAsTouched();
            if (this.newEndTime.invalid) this.newEndTime.markAsTouched();
            if (this.newType.invalid) this.newType.markAsTouched();
            if (this.newSubjectId.invalid) this.newSubjectId.markAsTouched();
            if (this.newTeacherId.invalid) this.newTeacherId.markAsTouched();
        }
    }

    startTimeLowerThanEndTimeValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let startTime = this.newStartTime.value?.split(':');
            let endTime = this.newEndTime.value?.split(':');

            if (startTime?.length && endTime?.length) {
                return +startTime[0] < +endTime[0] || (+startTime[0] === +endTime[0] && +startTime[1] < +endTime[1])
                    ? null
                    : { forbiddenTime: { value: control.value } };
            }
            return { forbiddenTime: { value: control.value } };
        };
    }

    startTimeLowerThanEndTime(): boolean {
        let startTime = this.newStartTime.value?.split(':');
        let endTime = this.newEndTime.value?.split(':');

        if (startTime?.length && endTime?.length) {
            console.log(+startTime[0]);
            console.log(+endTime[0]);

            console.log(+startTime[0] < +endTime[0] || (+startTime[0] === +endTime[0] && +startTime[1] < +endTime[1]));
            return +startTime[0] < +endTime[0] || (+startTime[0] === +endTime[0] && +startTime[1] < +endTime[1]);
        }
        return true;
    }

    private createLesson(): LessonDto {
        let day: string = '';
        let startTime: string = '';
        let endTime: string = '';
        let location: string = '';
        let type: string = '';
        let subjectId: number = -1;
        let teacherId: number = -1;
        if (this.newDay.value !== null) day = this.newDay.value;
        if (this.newStartTime.value !== null) startTime = this.newStartTime.value;
        if (this.newEndTime.value !== null) endTime = this.newEndTime.value;
        if (this.newType.value !== null) type = this.newType.value;
        if (this.newLocation.value !== null) location = this.newLocation.value;
        if (this.newSubjectId.value !== null) subjectId = +this.newSubjectId.value;
        if (this.newTeacherId.value !== null) teacherId = +this.newTeacherId.value;
        return new LessonDto(day, startTime, endTime, location, type, subjectId, this.selectedTimetableId, teacherId);
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    isInMobileView(): boolean {
        return this.getScreenWidth() <= 1000;
    }
}
