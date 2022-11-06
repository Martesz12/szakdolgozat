import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TeacherDto } from '../../model/timetable/dto/teacher.dto';
import { TeacherWebService } from '../api/timetable/teacher-web.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  allTeacherSubject: BehaviorSubject<TeacherDto[]> = new BehaviorSubject<
    TeacherDto[]
  >([]);
  selectedTeacherSubject: BehaviorSubject<TeacherDto> =
    new BehaviorSubject<TeacherDto>({} as TeacherDto);

  constructor(private teacherWebService: TeacherWebService) {
    this.getAllTeacher();
  }

  getAllTeacher() {
    this.teacherWebService.getAllTeacher().subscribe((teachers) => {
      this.allTeacherSubject.next(teachers);
      console.log(teachers);
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
      .subscribe((teacher) => this.selectedTeacherSubject.next(teacher));
  }

  removeSelectedTeacher(){
    this.selectedTeacherSubject.next({} as TeacherDto)
  }

  addTeacher(teacher: TeacherDto): Observable<TeacherDto> {
    return this.teacherWebService.addTeacher(teacher);
  }

  deleteTeacher(teacherId: number){
    return this.teacherWebService.deleteTeacher(teacherId);
  }
  updateTeacher(teacher: TeacherDto): Observable<TeacherDto> {
    console.log(teacher);
    return this.teacherWebService.updateTeacher(teacher);
  }
}
