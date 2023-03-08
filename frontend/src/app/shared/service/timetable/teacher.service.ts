import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, switchMap } from 'rxjs';
import { DataOperationPageState } from '../../enum/DataOperationPageState.enum';
import { TeacherDto } from '../../model/timetable/dto/teacher.dto';
import { TeacherWebService } from '../api/timetable/teacher-web.service';
import { UserService } from '../user.service';

@Injectable({
    providedIn: 'root',
})
export class TeacherService {
    allTeacherSubject: BehaviorSubject<TeacherDto[]> = new BehaviorSubject<TeacherDto[]>([]);
    selectedTeacherSubject: BehaviorSubject<TeacherDto> = new BehaviorSubject<TeacherDto>({} as TeacherDto);
    teacherDataOperationPageState: DataOperationPageState = DataOperationPageState.Base;

    constructor(private teacherWebService: TeacherWebService, private userService: UserService) {
        this.getAllTeacher();
    }

    getAllTeacher() {
        this.teacherWebService.getTeachersByUserId(this.userService.getUserId()).subscribe(teachers => {
            this.allTeacherSubject.next(teachers);
        });
    }

    getAllTeacherSubject(): Observable<TeacherDto[]> {
        return this.allTeacherSubject.asObservable();
    }

    getSelectedTeacherSubject(): Observable<TeacherDto> {
        return this.selectedTeacherSubject.asObservable();
    }

    selectTeacher(teacherId: number) {
        this.teacherWebService
            .getTeacherById(teacherId)
            .subscribe(teacher => this.selectedTeacherSubject.next(teacher));
    }

    removeSelectedTeacher() {
        this.selectedTeacherSubject.next({} as TeacherDto);
    }

    addTeacher(teacher: TeacherDto): Observable<TeacherDto> {
        return this.teacherWebService.addTeacher(teacher);
    }

    deleteTeacher(teacherId: number) {
        return this.teacherWebService.deleteTeacher(teacherId);
    }

    updateTeacher(teacher: TeacherDto): Observable<TeacherDto> {
        return this.teacherWebService.updateTeacher(teacher);
    }

    getTeacherById(id: number): Observable<TeacherDto> {
        return this.teacherWebService.getTeacherById(id);
    }

    getTeacherDataOperationPageState() {
        return this.teacherDataOperationPageState;
    }

    setTeacherDataOperationPageState(state: DataOperationPageState) {
        this.teacherDataOperationPageState = state;
    }

    resetTeacherState(afterDelete: boolean = false): void {
        this.removeSelectedTeacher();
        this.setTeacherDataOperationPageState(DataOperationPageState.Base);
        if (afterDelete) this.getAllTeacher();
    }
}
