import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataOperationPageState } from '../../enum/DataOperationPageState.enum';
import { MainTaskDto } from '../../model/timetable/dto/main-task.dto';
import { MainTaskWebService } from '../api/timetable/main-task-web.service';

@Injectable({
    providedIn: 'root',
})
export class MainTaskService {
    allMainTaskSubject: BehaviorSubject<MainTaskDto[]> = new BehaviorSubject<MainTaskDto[]>([]);
    selectedMainTaskSubject: BehaviorSubject<MainTaskDto> = new BehaviorSubject<MainTaskDto>({} as MainTaskDto);
    mainTaskDataOperationPageState: DataOperationPageState = DataOperationPageState.Base;

    constructor(private mainTaskWebService: MainTaskWebService) {
        this.getAllMainTask();
    }

    getAllMainTask() {
        this.mainTaskWebService.getAllMainTask().subscribe(mainTasks => {
            this.allMainTaskSubject.next(mainTasks);
        });
    }

    getAllMainTaskSubject(): Observable<MainTaskDto[]> {
        return this.allMainTaskSubject.asObservable();
    }

    getSelectedMainTaskSubject(): Observable<MainTaskDto> {
        return this.selectedMainTaskSubject.asObservable();
    }

    selectMainTask(mainTaskId: number) {
        this.mainTaskWebService
            .getMainTaskById(mainTaskId)
            .subscribe(mainTask => this.selectedMainTaskSubject.next(mainTask));
    }

    removeSelectedMainTask() {
        this.selectedMainTaskSubject.next({} as MainTaskDto);
    }

    addMainTask(mainTask: MainTaskDto): Observable<MainTaskDto> {
        return this.mainTaskWebService.addMainTask(mainTask);
    }

    deleteMainTask(mainTaskId: number) {
        return this.mainTaskWebService.deleteMainTask(mainTaskId);
    }

    updateMainTask(mainTask: MainTaskDto): Observable<MainTaskDto> {
        return this.mainTaskWebService.updateMainTask(mainTask);
    }

    getMainTaskById(id: number): Observable<MainTaskDto>{
        return this.mainTaskWebService.getMainTaskById(id);
    }

    getMainTaskDataOperationPageState() {
        return this.mainTaskDataOperationPageState;
    }

    setMainTaskDataOperationPageState(state: DataOperationPageState) {
        this.mainTaskDataOperationPageState = state;
    }
}
