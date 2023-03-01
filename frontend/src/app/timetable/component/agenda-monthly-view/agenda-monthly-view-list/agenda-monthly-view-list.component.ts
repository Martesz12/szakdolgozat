import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { LessonDto } from 'src/app/shared/model/timetable/dto/lesson.dto';
import { MainTaskDto } from 'src/app/shared/model/timetable/dto/main-task.dto';
import { SubTaskDto } from 'src/app/shared/model/timetable/dto/sub-task.dto';
import { SubjectDto } from 'src/app/shared/model/timetable/dto/subject.dto';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';
import { MainTaskService } from 'src/app/shared/service/timetable/main-task.service';
import { SubTaskService } from 'src/app/shared/service/timetable/sub-task.service';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';

@Component({
    selector: 'app-agenda-monthly-view-list',
    templateUrl: './agenda-monthly-view-list.component.html',
    styleUrls: ['./agenda-monthly-view-list.component.scss'],
})
export class AgendaMonthlyViewListComponent implements OnChanges {
    @Input() selectedDayDate: number = 0;
    currentDate: Date = new Date();

    allMainTask: MainTaskDto[] = [];
    filteredMainTasks: MainTaskDto[] = [];
    allSubTask: SubTaskDto[] = [];
    allLesson: LessonDto[] = [];
    allSubject: SubjectDto[] = [];

    constructor(
        private mainTaskService: MainTaskService,
        private subTaskService: SubTaskService,
        private lessonService: LessonService,
        private subjectService: SubjectService,
        private snackBar: MatSnackBar,
    ) {
        this.getAllMainTask();
        this.getAllSubTask();
    }

    ngOnChanges(): void {
        this.reloadTaskList();
    }

    reloadTaskList(): void {
        if (this.selectedDayDate !== 0) {
            this.currentDate = new Date(this.selectedDayDate);
            this.filteredMainTasks = this.allMainTask.filter(mainTask => {
                let mainTaskDate = new Date(mainTask.deadline);
                return this.selectedDayDate === new Date(mainTaskDate.getFullYear(), mainTaskDate.getMonth(), mainTaskDate.getDate()).getTime();
            });
        }
    }

    getAllMainTask(): void {
        this.mainTaskService
            .getAllMainTaskSubject()
            .pipe(
                switchMap(mainTasks => {
                    this.allMainTask = mainTasks.filter(mainTask => !mainTask.fulfilled);
                    this.reloadTaskList();
                    return this.lessonService.getAllLessonSubject();
                }),
                switchMap(lessons => {
                    this.allLesson = lessons;
                    return this.subjectService.getAllSubjectSubject();
                })
            )
            .subscribe(subject => (this.allSubject = subject));
    }

    getAllSubTask(): void {
        this.subTaskService.getAllSubTaskSubject().subscribe(subTasks => {
            this.allSubTask = subTasks;
        });
    }

    sortByDate(mainTasks: MainTaskDto[]): MainTaskDto[] {
        return mainTasks.sort((a, b) => (a.deadline > b.deadline ? 1 : b.deadline > a.deadline ? -1 : 0));
    }

    getSubjectColor(lessonId: number): string {
        let tempLesson = this.allLesson.find(lesson => lesson.id === lessonId);
        let tempSubject = this.allSubject.find(subject => subject.id === tempLesson?.subjectId);
        return tempSubject?.color!;
    }

    getTypeForClass(type: string): string {
        switch (type) {
            case 'Feladat':
                return 'task';
            case 'Vizsga':
                return 'exam';
            case 'Zárthelyi':
                return 'zh';
            case 'Beadandó':
                return 'assigment';
            case 'Teszt':
                return 'test';
            default:
                return '';
        }
    }

    filterSubTasksByMainTaskId(mainTaskId: number): SubTaskDto[] {
        return this.allSubTask.filter(subTask => subTask.mainTaskId === mainTaskId);
    }

    checkMainTask(event$: any, mainTask: MainTaskDto): void {
        event$.stopPropagation();
        let updatedMainTask: MainTaskDto = new MainTaskDto(
            mainTask.name,
            !mainTask.fulfilled,
            mainTask.deadline,
            mainTask.note,
            mainTask.type,
            mainTask.lessonId,
            mainTask.id
        );
        this.mainTaskService.updateMainTask(updatedMainTask).subscribe({
            next: _ => {
                this.mainTaskService.getMainTasksByLessonIds();
            },
            error: error =>
                this.snackBar.open('Hiba alfeladat módosítása során: ' + error, 'X', {
                    horizontalPosition: 'right',
                    verticalPosition: 'bottom',
                    panelClass: ['error-snackbar'],
                }),
        })
    }

    checkSubTask(subTask: SubTaskDto): void {
        let updatedSubtask: SubTaskDto = new SubTaskDto(
            subTask.name,
            !subTask.fulfilled,
            subTask.mainTaskId,
            subTask.id
        );
        this.subTaskService.updateSubTask(updatedSubtask).subscribe({
            next: _ => {
                this.allSubTask[this.allSubTask.findIndex(task => task.id === subTask.id)] = { ...updatedSubtask };
            },
            error: error =>
                this.snackBar.open('Hiba alfeladat módosítása során: ' + error, 'X', {
                    horizontalPosition: 'right',
                    verticalPosition: 'bottom',
                    panelClass: ['error-snackbar'],
                }),
        });
    }
}
