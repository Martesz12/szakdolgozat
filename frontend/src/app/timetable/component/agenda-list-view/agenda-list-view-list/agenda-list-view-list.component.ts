import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { DialogData } from 'src/app/shared/component/dialog/dialog-data.model';
import { DialogComponent } from 'src/app/shared/component/dialog/dialog.component';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { LessonDto } from 'src/app/shared/model/timetable/dto/lesson.dto';
import { MainTaskDto } from 'src/app/shared/model/timetable/dto/main-task.dto';
import { SubTaskDto } from 'src/app/shared/model/timetable/dto/sub-task.dto';
import { SubjectDto } from 'src/app/shared/model/timetable/dto/subject.dto';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';
import { MainTaskService } from 'src/app/shared/service/timetable/main-task.service';
import { SubTaskService } from 'src/app/shared/service/timetable/sub-task.service';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';
import { TimetableService } from 'src/app/shared/service/timetable/timetable.service';
import { SnackBarService } from '../../../../shared/service/snack-bar.service';

@Component({
    selector: 'app-agenda-list-view-list',
    templateUrl: './agenda-list-view-list.component.html',
    styleUrls: ['./agenda-list-view-list.component.scss'],
})
export class AgendaListViewListComponent {
    mainTasks: MainTaskDto[] = [];
    filteredMainTasks: MainTaskDto[] = [];
    fulfilledMainTasks: MainTaskDto[] = [];
    allSubTask: SubTaskDto[] = [];
    selectedMainTask: MainTaskDto = {} as MainTaskDto;
    allLesson: LessonDto[] = [];
    allSubject: SubjectDto[] = [];

    selectedTimetableId: number = 0;
    editedSubTasks: Map<number, string> = new Map<number, string>();
    filteredTypes: string[] = ['Feladat', 'Vizsga', 'Zárthelyi', 'Beadandó', 'Teszt'];

    constructor(
        private mainTaskService: MainTaskService,
        private dialog: MatDialog,
        private snackBarService: SnackBarService,
        private timetableService: TimetableService,
        private subTaskService: SubTaskService,
        private lessonService: LessonService,
        private subjectService: SubjectService
    ) {
        this.getAllMainTask();
        this.getAllSubTask();
        this.getSelectedMainTask();
        this.getSelecterTimetableId();
    }

    getAllMainTask(): void {
        this.mainTaskService
            .getAllMainTaskSubject()
            .pipe(
                switchMap(mainTasks => {
                    this.mainTasks = mainTasks.filter(mainTask => !mainTask.fulfilled);
                    this.filteredMainTasks = this.mainTasks.filter(mainTask =>
                        this.filteredTypes.includes(mainTask.type)
                    );
                    this.fulfilledMainTasks = mainTasks.filter(mainTask => mainTask.fulfilled);
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

    getSelecterTimetableId() {
        this.timetableService
            .getSelectedTimetableId()
            .subscribe(timetableId => (this.selectedTimetableId = timetableId));
    }

    private getSelectedMainTask() {
        this.mainTaskService.getSelectedMainTaskSubject().subscribe(mainTask => {
            this.selectedMainTask = mainTask;
        });
    }

    selectMainTask(mainTaskId: number | null) {
        if (mainTaskId !== null) {
            if (this.selectedMainTask.id !== mainTaskId) this.mainTaskService.selectMainTask(mainTaskId);
            this.mainTaskService.setMainTaskDataOperationPageState(DataOperationPageState.Description);
        }
    }

    addMainTask() {
        this.mainTaskService.setMainTaskDataOperationPageState(DataOperationPageState.Add);
    }

    modifyMainTask(mainTaskId: number | null) {
        if (mainTaskId !== null) {
            if (this.selectedMainTask.id !== mainTaskId) this.mainTaskService.selectMainTask(mainTaskId);
            this.mainTaskService.setMainTaskDataOperationPageState(DataOperationPageState.Modify);
        }
    }

    openDeleteDialog(mainTaskId: number | null): void {
        const dialogInterface: DialogData = {
            dialogHeader: 'Feladat törlése',
            dialogContent: 'Biztos ki akarod törölni? A "Törlés" gombra nyomva végleg törlöd.',
            cancelButtonLabel: 'Vissza',
            confirmButtonLabel: 'Törlés',
            callbackMethod: () => {
                this.deleteMainTask(mainTaskId);
            },
        };
        this.dialog.open(DialogComponent, {
            data: dialogInterface,
        });
    }

    deleteMainTask(mainTaskId: number | null): void {
        if (mainTaskId !== null)
            this.mainTaskService.deleteMainTask(mainTaskId).subscribe({
                next: _ => {
                    this.mainTaskService.resetMainTaskState(true);
                    this.subTaskService.resetSubTaskState(true);
                    this.snackBarService.infoSnackBar('Feladat törlése sikeres!');
                },
                error: error => this.snackBarService.errorSnackBar('Hiba feladat törlése során!'),
            });
    }

    addSubTask(mainTaskId: number): void {
        let newSubTask: SubTaskDto = new SubTaskDto('Új Alfeladat', false, mainTaskId);
        this.subTaskService.addSubTask(newSubTask).subscribe({
            next: subTask => {
                this.subTaskService.getSubTasksByMainTaskIds();
                this.modifySubTask(subTask);
                this.snackBarService.infoSnackBar('Alfeladat hozzáadása sikeres!');
            },
            error: error => this.snackBarService.errorSnackBar('Hiba alfeladat hozzáadása során!'),
        });
    }

    filterSubTasksByMainTaskId(mainTaskId: number): SubTaskDto[] {
        return this.allSubTask.filter(subTask => subTask.mainTaskId === mainTaskId);
    }

    modifySubTask(subTask: SubTaskDto): void {
        if (subTask.id) this.editedSubTasks.set(subTask.id, subTask.name);
    }

    changeUpdatedName(id: number, updatedName: string): void {
        this.editedSubTasks.set(id, updatedName);
    }

    saveSubTask(subTask: SubTaskDto): void {
        if (this.editedSubTasks.get(subTask.id!) && this.editedSubTasks.get(subTask.id!)?.length! <= 255) {
            let updatedSubTask: SubTaskDto = new SubTaskDto(
                this.editedSubTasks.get(subTask.id!)!,
                subTask.fulfilled,
                subTask.mainTaskId,
                subTask.id
            );
            this.subTaskService.updateSubTask(updatedSubTask).subscribe({
                next: _ => {
                    this.subTaskService.getSubTasksByMainTaskIds();
                    this.editedSubTasks.delete(subTask.id!);
                    this.snackBarService.infoSnackBar('Alfeladat módosítása sikeres!');
                },
                error: error => this.snackBarService.errorSnackBar('Hiba alfeladat módosítása során!'),
            });
        } else {
            this.snackBarService.errorSnackBar(
                'Hiba alfeladat módosítása során: A név nem lehet hosszabb 255 karakternél!'
            );
        }
    }

    deleteSubTask(subTaskId: number): void {
        this.subTaskService.deleteSubTask(subTaskId).subscribe({
            next: _ => {
                this.subTaskService.resetSubTaskState(true);
                this.editedSubTasks.delete(subTaskId);
                this.snackBarService.infoSnackBar('Alfeladat törlése sikeres!');
            },
            error: error => this.snackBarService.errorSnackBar('Hiba alfeladat törlése során!'),
        });
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
            error: error => this.snackBarService.errorSnackBar('Hiba alfeladat módosítása során!'),
        });
    }

    checkTypeFilter(checkedType: string): void {
        if (this.filteredTypes.includes(checkedType))
            this.filteredTypes = this.filteredTypes.filter(type => type !== checkedType);
        else this.filteredTypes.push(checkedType);
    }

    saveFilter(): void {
        this.filteredMainTasks = this.mainTasks.filter(mainTask => this.filteredTypes.includes(mainTask.type));
    }

    openDeleteAllFulfilledTaskDialog(): void {
        const dialogInterface: DialogData = {
            dialogHeader: 'Teljesített alfeladatok törlése',
            dialogContent: 'Biztos ki akarod törölni? A "Törlés" gombra nyomva végleg törlöd.',
            cancelButtonLabel: 'Vissza',
            confirmButtonLabel: 'Törlés',
            callbackMethod: () => {
                this.deleteAllFulfilledMainTask();
            },
        };
        this.dialog.open(DialogComponent, {
            data: dialogInterface,
        });
    }

    deleteAllFulfilledMainTask(): void {
        this.fulfilledMainTasks.forEach(mainTask => {
            this.deleteMainTask(mainTask.id);
        });
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
            error: error => this.snackBarService.errorSnackBar('Hiba alfeladat módosítása során!'),
        });
    }

    sortByDate(mainTasks: MainTaskDto[]): MainTaskDto[] {
        return mainTasks.sort((a, b) => (a.deadline > b.deadline ? 1 : b.deadline > a.deadline ? -1 : 0));
    }

    getSubjectName(lessonId: number): string {
        let tempLesson = this.allLesson.find(lesson => lesson.id === lessonId);
        let tempSubject = this.allSubject.find(subject => subject.id === tempLesson?.subjectId);
        return tempSubject?.name!;
    }
}
