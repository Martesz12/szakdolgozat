import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogData } from 'src/app/shared/component/dialog/dialog-data.model';
import { DialogComponent } from 'src/app/shared/component/dialog/dialog.component';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { MainTaskDto } from 'src/app/shared/model/timetable/dto/main-task.dto';
import { SubTaskDto } from 'src/app/shared/model/timetable/dto/sub-task.dto';
import { MainTaskService } from 'src/app/shared/service/timetable/main-task.service';
import { SubTaskService } from 'src/app/shared/service/timetable/sub-task.service';
import { TimetableService } from 'src/app/shared/service/timetable/timetable.service';

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

    selectedTimetableId: number = 0;
    editedSubTasks: Map<number, string> = new Map<number, string>();
    filteredTypes: string[] = ['Feladat', 'Vizsga', 'Zárthelyi', 'Beadandó', 'Teszt'];

    //TODO valami szín hogy melyik tantárgyhoz tartozik a feladat
    constructor(
        private mainTaskService: MainTaskService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private timetableService: TimetableService,
        private subTaskService: SubTaskService
    ) {
        this.getAllMainTask();
        this.getAllSubTask();
        this.getSelectedMainTask();
        this.getSelecterTimetableId();
    }

    getAllMainTask(): void {
        this.mainTaskService.getAllMainTaskSubject().subscribe(mainTasks => {
            this.mainTasks = mainTasks.filter(mainTask => !mainTask.fulfilled);
            this.filteredMainTasks = this.mainTasks.filter(mainTask => this.filteredTypes.includes(mainTask.type));
            this.fulfilledMainTasks = mainTasks.filter(mainTask => mainTask.fulfilled);
        });
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
                    this.mainTaskService.getMainTasksByLessonIds();
                    this.mainTaskService.removeSelectedMainTask();
                    this.mainTaskService.setMainTaskDataOperationPageState(DataOperationPageState.Base);
                    this.snackBar.open('Feladat törlése sikeres!', 'X', {
                        duration: 2000,
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['info-snackbar'],
                    });
                },
                error: error =>
                    this.snackBar.open('Hiba feladat törlése során: ' + error, 'X', {
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['error-snackbar'],
                    }),
            });
    }

    addSubTask(mainTaskId: number): void {
        let newSubTask: SubTaskDto = new SubTaskDto('Új Alfeladat', false, mainTaskId);
        this.subTaskService.addSubTask(newSubTask).subscribe({
            next: subTask => {
                this.subTaskService.getSubTasksByLessonIds();
                this.subTaskService.setSubTaskDataOperationPageState(DataOperationPageState.Description);
                this.modifySubTask(subTask);
                if (subTask.id !== null) this.subTaskService.selectSubTask(subTask.id);
                this.snackBar.open('Alfeladat hozzáadása sikeres!', 'X', {
                    duration: 2000,
                    horizontalPosition: 'right',
                    verticalPosition: 'bottom',
                    panelClass: ['info-snackbar'],
                });
            },
            error: error =>
                this.snackBar.open('Hiba alfeladat hozzáadása során: ' + error, 'X', {
                    horizontalPosition: 'right',
                    verticalPosition: 'bottom',
                    panelClass: ['error-snackbar'],
                }),
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
        if (this.editedSubTasks.get(subTask.id!)) {
            let updatedSubTask: SubTaskDto = new SubTaskDto(
                this.editedSubTasks.get(subTask.id!)!,
                subTask.fulfilled,
                subTask.mainTaskId,
                subTask.id
            );
            this.subTaskService.updateSubTask(updatedSubTask).subscribe({
                next: _ => {
                    this.subTaskService.getSubTasksByLessonIds();
                    this.editedSubTasks.delete(subTask.id!);
                    this.snackBar.open('Alfeladat módosítása sikeres!', 'X', {
                        duration: 2000,
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['info-snackbar'],
                    });
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

    deleteSubTask(subTaskId: number): void {
        this.subTaskService.deleteSubTask(subTaskId).subscribe({
            next: _ => {
                this.subTaskService.getSubTasksByLessonIds();
                this.editedSubTasks.delete(subTaskId);
                this.snackBar.open('Alfeladat törlése sikeres!', 'X', {
                    duration: 2000,
                    horizontalPosition: 'right',
                    verticalPosition: 'bottom',
                    panelClass: ['info-snackbar'],
                });
            },
            error: error =>
                this.snackBar.open('Hiba alfeladat törlése során: ' + error, 'X', {
                    horizontalPosition: 'right',
                    verticalPosition: 'bottom',
                    panelClass: ['error-snackbar'],
                }),
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
            error: error =>
                this.snackBar.open('Hiba alfeladat módosítása során: ' + error, 'X', {
                    horizontalPosition: 'right',
                    verticalPosition: 'bottom',
                    panelClass: ['error-snackbar'],
                }),
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
        })
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
}
