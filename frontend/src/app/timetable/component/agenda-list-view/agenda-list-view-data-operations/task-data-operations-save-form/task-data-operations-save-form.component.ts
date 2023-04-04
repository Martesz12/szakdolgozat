import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { LessonDto } from 'src/app/shared/model/timetable/dto/lesson.dto';
import { MainTaskDto } from 'src/app/shared/model/timetable/dto/main-task.dto';
import { SubjectDto } from 'src/app/shared/model/timetable/dto/subject.dto';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';
import { MainTaskService } from 'src/app/shared/service/timetable/main-task.service';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';
import { SnackBarService } from '../../../../../shared/service/snack-bar.service';

@Component({
    selector: 'app-task-data-operations-save-form',
    templateUrl: './task-data-operations-save-form.component.html',
    styleUrls: ['./task-data-operations-save-form.component.scss'],
})
export class TaskDataOperationsSaveFormComponent {
    readonly TYPES: string[] = ['Feladat', 'Vizsga', 'Zárthelyi', 'Beadandó', 'Teszt'];
    allLesson$: Observable<LessonDto[]> = this.lessonService.getAllLessonSubject();
    allSubject: SubjectDto[] = [];

    newLesson = new FormControl(0);
    newName = new FormControl('');
    newDeadline = new FormControl(new Date());
    newNote = new FormControl('');
    newType = new FormControl('');

    constructor(
        private mainTaskService: MainTaskService,
        private snackBarService: SnackBarService,
        private lessonService: LessonService,
        private subjectService: SubjectService
    ) {
        this.newLesson?.addValidators(Validators.required);
        this.newName?.addValidators([Validators.required, Validators.maxLength(255)]);
        this.newDeadline?.addValidators(Validators.required);
        this.getAllSubject();
    }

    getAllSubject(): void {
        this.subjectService.getAllSubjectSubject().subscribe(subjects => (this.allSubject = subjects));
    }

    getSubjectName(subjectId: number): string {
        return this.allSubject.find(subject => subject.id === subjectId)!.name;
    }

    addMainTask(): void {
        if (this.newName.valid && this.newDeadline.valid && this.newLesson.valid) {
            let newMainTask: MainTaskDto = this.createMainTask();
            this.mainTaskService.addMainTask(newMainTask).subscribe({
                next: mainTask => {
                    this.mainTaskService.getMainTasksByLessonIds();
                    this.mainTaskService.setMainTaskDataOperationPageState(DataOperationPageState.Description);
                    if (mainTask.id !== null) this.mainTaskService.selectMainTask(mainTask.id);
                    this.newLesson.markAsUntouched();
                    this.newName.markAsUntouched();
                    this.newDeadline.markAsUntouched();
                    this.snackBarService.infoSnackBar('Feladat hozzáadása sikeres!');
                },
                error: error => this.snackBarService.errorSnackBar('Hiba feladat hozzáadása során!'),
            });
        } else {
            if (this.newLesson.invalid) this.newLesson.markAsTouched();
            if (this.newName.invalid) this.newName.markAsTouched();
            if (this.newDeadline.invalid) this.newDeadline.markAsTouched();
        }
    }

    private createMainTask(): MainTaskDto {
        let lessonId: number = 0;
        let name: string = '';
        let note: string = '';
        let deadline: Date = new Date();
        let type: string = 'Feladat';

        if (this.newLesson.value !== null) lessonId = this.newLesson.value;
        if (this.newName.value !== null) name = this.newName.value;
        if (this.newNote.value !== null) note = this.newNote.value;
        if (this.newDeadline.value !== null) deadline = this.newDeadline.value;
        if (this.newType.value !== null && this.newType.value !== '') type = this.newType.value;

        return new MainTaskDto(name, false, deadline, note, type, lessonId);
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    isInMobileView(): boolean {
        return this.getScreenWidth() <= 1000;
    }
}
