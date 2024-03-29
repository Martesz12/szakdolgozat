import { Component } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LessonDto } from 'src/app/shared/model/timetable/dto/lesson.dto';
import { SubjectDto } from 'src/app/shared/model/timetable/dto/subject.dto';
import { TeacherDto } from 'src/app/shared/model/timetable/dto/teacher.dto';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';
import { TeacherService } from 'src/app/shared/service/timetable/teacher.service';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { DialogData } from 'src/app/shared/component/dialog/dialog-data.model';
import { DialogComponent } from 'src/app/shared/component/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MainTaskService } from 'src/app/shared/service/timetable/main-task.service';
import { SubTaskService } from 'src/app/shared/service/timetable/sub-task.service';
import { SnackBarService } from '../../../../../shared/service/snack-bar.service';

@Component({
    selector: 'app-lesson-data-operations-update-form',
    templateUrl: './lesson-data-operations-update-form.component.html',
    styleUrls: ['./lesson-data-operations-update-form.component.scss'],
})
export class LessonDataOperationsUpdateFormComponent {
    readonly DAYS: string[] = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];
    readonly TYPES: string[] = ['Előadás', 'Gyakorlat'];

    allSubject: SubjectDto[] = [];
    allTeacher: TeacherDto[] = [];
    updatedDay = new FormControl('');
    updatedStartTime = new FormControl('');
    updatedEndTime = new FormControl('');
    updatedLocation = new FormControl('');
    updatedType = new FormControl('');
    updatedSubjectId = new FormControl(0);
    updatedTeacherId = new FormControl(0);

    selectedLesson: LessonDto = {} as LessonDto;

    constructor(
        private lessonService: LessonService,
        private snackBarService: SnackBarService,
        private subjectService: SubjectService,
        private teacherService: TeacherService,
        private dialog: MatDialog,
        private mainTaskService: MainTaskService,
        private subTaskService: SubTaskService
    ) {
        this.getSelectedLesson();
        this.getAllSubject();
        this.getAllTeacher();
        this.updatedDay?.addValidators(Validators.required);
        this.updatedStartTime?.addValidators(Validators.required);
        this.updatedEndTime?.addValidators([Validators.required, this.startTimeLowerThanEndTimeValidator()]);
        this.updatedType?.addValidators(Validators.required);
        this.updatedSubjectId?.addValidators(Validators.required);
        this.updatedTeacherId?.addValidators(Validators.required);
    }

    private getSelectedLesson(): void {
        this.lessonService.getSelectedLessonSubject().subscribe(lesson => {
            if (lesson !== undefined && Object.keys(lesson).length) {
                this.selectedLesson = lesson;
                this.updatedDay.setValue(lesson.day);
                this.updatedStartTime.setValue(lesson.startTime);
                this.updatedEndTime.setValue(lesson.endTime);
                this.updatedType.setValue(lesson.type);
                this.updatedSubjectId.setValue(+lesson.subjectId.toString());
                this.updatedTeacherId.setValue(+lesson.teacherId.toString());
                this.updatedLocation.setValue(lesson.location.toString());
            }
        });
    }

    getAllSubject(): void {
        this.subjectService.getAllSubjectSubject().subscribe(subjects => (this.allSubject = subjects));
    }

    getAllTeacher(): void {
        this.teacherService.getAllTeacherSubject().subscribe(teachers => (this.allTeacher = teachers));
    }

    updateLesson(): void {
        if (
            this.updatedDay.valid &&
            this.updatedStartTime.valid &&
            this.updatedEndTime.valid &&
            this.updatedType.valid &&
            this.updatedSubjectId.valid &&
            this.updatedTeacherId.valid
        ) {
            let updatedLesson: LessonDto = this.createLesson();
            this.lessonService.updateLesson(updatedLesson).subscribe({
                next: lesson => {
                    this.lessonService.getLessonsByTimetableId();
                    this.lessonService.setLessonDataOperationPageState(DataOperationPageState.Description);
                    if (lesson.id !== null) this.lessonService.selectLesson(lesson.id);
                    this.updatedDay.markAsUntouched();
                    this.updatedStartTime.markAsUntouched();
                    this.updatedEndTime.markAsUntouched();
                    this.updatedType.markAsUntouched();
                    this.updatedSubjectId.markAsUntouched();
                    this.updatedTeacherId.markAsUntouched();
                    this.snackBarService.infoSnackBar('Tanóra módosítása sikeres!');
                },
                error: error => this.snackBarService.errorSnackBar('Hiba tanóra módosítása során!'),
            });
        } else {
            if (this.updatedDay.invalid) this.updatedDay.markAsTouched();
            if (this.updatedStartTime.invalid) this.updatedStartTime.markAsTouched();
            if (this.updatedEndTime.invalid) this.updatedEndTime.markAsTouched();
            if (this.updatedType.invalid) this.updatedType.markAsTouched();
            if (this.updatedSubjectId.invalid) this.updatedSubjectId.markAsTouched();
            if (this.updatedTeacherId.invalid) this.updatedTeacherId.markAsTouched();
        }
    }

    openDeleteDialog(LessonId: number | null): void {
        const dialogInterface: DialogData = {
            dialogHeader: 'Tanóra törlése',
            dialogContent:
                'Biztos ki akarod törölni? A "Törlés" gombra nyomva végleg törlöd. A tanóra törlése magával vonja az összes hozzá tartozó feladat törlését.',
            cancelButtonLabel: 'Vissza',
            confirmButtonLabel: 'Törlés',
            callbackMethod: () => {
                this.deleteLesson(LessonId);
            },
        };
        this.dialog.open(DialogComponent, {
            data: dialogInterface,
        });
    }

    deleteLesson(lessonId: number | null): void {
        if (lessonId !== null)
            this.lessonService.deleteLesson(lessonId).subscribe({
                next: _ => {
                    this.lessonService.resetLessonState(true);
                    this.mainTaskService.resetMainTaskState(true);
                    this.subTaskService.resetSubTaskState(true);
                    this.snackBarService.infoSnackBar('Tanóra törlése sikeres!');
                },
                error: error => this.snackBarService.errorSnackBar('Hiba tanóra törlése során!'),
            });
    }

    startTimeLowerThanEndTimeValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let startTime = this.updatedStartTime.value?.split(':');
            let endTime = this.updatedEndTime.value?.split(':');

            if (startTime?.length && endTime?.length) {
                return +startTime[0] < +endTime[0] || (+startTime[0] === +endTime[0] && +startTime[1] < +endTime[1])
                    ? null
                    : { forbiddenTime: { value: control.value } };
            }
            return { forbiddenTime: { value: control.value } };
        };
    }

    private createLesson(): LessonDto {
        let day: string = '';
        let startTime: string = '';
        let endTime: string = '';
        let location: string = '';
        let type: string = '';
        let subjectId: number = -1;
        let teacherId: number = -1;
        if (this.updatedDay.value !== null) day = this.updatedDay.value;
        if (this.updatedStartTime.value !== null) startTime = this.updatedStartTime.value;
        if (this.updatedEndTime.value !== null) endTime = this.updatedEndTime.value;
        if (this.updatedType.value !== null) type = this.updatedType.value;
        if (this.updatedLocation.value !== null) location = this.updatedLocation.value;
        if (this.updatedSubjectId.value !== null) subjectId = +this.updatedSubjectId.value;
        if (this.updatedTeacherId.value !== null) teacherId = +this.updatedTeacherId.value;
        return new LessonDto(
            day,
            startTime,
            endTime,
            location,
            type,
            subjectId,
            this.selectedLesson.timetableId,
            teacherId,
            this.selectedLesson.id
        );
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    isInMobileView(): boolean {
        return this.getScreenWidth() <= 1000;
    }
}
