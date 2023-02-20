import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataOperationPageState } from '../../enum/DataOperationPageState.enum';
import { SubTaskDto } from '../../model/timetable/dto/sub-task.dto';
import { SubTaskWebService } from '../api/timetable/sub-task-web.service';

@Injectable({
    providedIn: 'root',
})
export class SubTaskService {
    allSubTaskSubject: BehaviorSubject<SubTaskDto[]> = new BehaviorSubject<SubTaskDto[]>([]);
    selectedSubTaskSubject: BehaviorSubject<SubTaskDto> = new BehaviorSubject<SubTaskDto>({} as SubTaskDto);
    SubTaskDataOperationPageState: DataOperationPageState = DataOperationPageState.Base;

    constructor(private subTaskWebService: SubTaskWebService) {
        this.getAllSubTask();
    }

    getAllSubTask() {
        this.subTaskWebService.getAllSubTask().subscribe(subTasks => {
            this.allSubTaskSubject.next(subTasks);
        });
    }

    getAllSubTaskSubject(): Observable<SubTaskDto[]> {
        return this.allSubTaskSubject.asObservable();
    }

    getSelectedSubTaskSubject(): Observable<SubTaskDto> {
        return this.selectedSubTaskSubject.asObservable();
    }

    selectSubTask(subTaskId: number) {
        this.subTaskWebService
            .getSubTaskById(subTaskId)
            .subscribe(subTask => this.selectedSubTaskSubject.next(subTask));
    }

    removeSelectedSubTask() {
        this.selectedSubTaskSubject.next({} as SubTaskDto);
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

    getSubTaskDataOperationPageState() {
        return this.SubTaskDataOperationPageState;
    }

    setSubTaskDataOperationPageState(state: DataOperationPageState) {
        this.SubTaskDataOperationPageState = state;
    }
}
