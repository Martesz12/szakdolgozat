import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { DataOperationPageState } from '../../enum/DataOperationPageState.enum';
import { SubTaskDto } from '../../model/timetable/dto/sub-task.dto';
import { SubTaskWebService } from '../api/timetable/sub-task-web.service';
import { MainTaskService } from './main-task.service';

@Injectable({
    providedIn: 'root',
})
export class SubTaskService {
    allSubTaskSubject: BehaviorSubject<SubTaskDto[]> = new BehaviorSubject<SubTaskDto[]>([]);

    constructor(private subTaskWebService: SubTaskWebService, private mainTaskService: MainTaskService) {
        this.getSubTasksByMainTaskIds();
    }

    getSubTasksByMainTaskIds() {
        this.mainTaskService
            .getAllMainTaskSubject()
            .pipe(
                switchMap(mainTasks => {
                    let mainTaskIds: number[] = [];
                    mainTasks.forEach(mainTask => mainTaskIds.push(mainTask.id!));
                    return this.subTaskWebService.getSubTasksByMainTaskIds(mainTaskIds);
                })
            )
            .subscribe(subTasks => {
                this.allSubTaskSubject.next(subTasks);
            });
    }

    getAllSubTaskSubject(): Observable<SubTaskDto[]> {
        return this.allSubTaskSubject.asObservable();
    }

    addSubTask(subTask: SubTaskDto): Observable<SubTaskDto> {
        return this.subTaskWebService.addSubTask(subTask);
    }

    deleteSubTask(subTaskId: number) {
        return this.subTaskWebService.deleteSubTask(subTaskId);
    }

    updateSubTask(subTask: SubTaskDto): Observable<SubTaskDto> {
        return this.subTaskWebService.updateSubTask(subTask);
    }

    getSubTaskById(id: number): Observable<SubTaskDto>{
        return this.subTaskWebService.getSubTaskById(id);
    }

    resetSubTaskState(afterDelete: boolean = false): void {
        if(afterDelete) this.getSubTasksByMainTaskIds();
    }
}
