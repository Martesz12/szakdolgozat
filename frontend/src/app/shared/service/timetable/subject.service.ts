import { Injectable } from '@angular/core';
import { SubjectDto } from '../../model/timetable/dto/subject.dto';
import { DataOperationPageState } from '../../enum/DataOperationPageState.enum';
import { BehaviorSubject, Observable } from 'rxjs';
import { SubjectWebService } from '../api/timetable/subject-web.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  allSubjectSubject: BehaviorSubject<SubjectDto[]> = new BehaviorSubject<SubjectDto[]>([]);
  selectedSubjectSubject: BehaviorSubject<SubjectDto> = new BehaviorSubject<SubjectDto>({} as SubjectDto);
  subjectDataOperationPageState: DataOperationPageState = DataOperationPageState.Base;

  constructor(private subjectWebService: SubjectWebService) {
      this.getAllSubject();
  }

  getAllSubject() {
      this.subjectWebService.getAllSubject().subscribe(subjects => {
          this.allSubjectSubject.next(subjects);
          console.log(subjects);
      });
  }

  getAllSubjectSubject(): Observable<SubjectDto[]> {
      return this.allSubjectSubject.asObservable();
  }

  getSelectedSubjectSubject(): Observable<SubjectDto> {
      return this.selectedSubjectSubject.asObservable();
  }

  selectSubject(subjectId: number) {
      this.subjectWebService
          .getSubjectById(subjectId)
          .subscribe(subject => this.selectedSubjectSubject.next(subject));
  }

  removeSelectedSubject() {
      this.selectedSubjectSubject.next({} as SubjectDto);
  }

  addSubject(subject: SubjectDto): Observable<SubjectDto> {
      return this.subjectWebService.addSubject(subject);
  }

  deleteSubject(subjectId: number) {
      return this.subjectWebService.deleteSubject(subjectId);
  }

  updateSubject(subject: SubjectDto): Observable<SubjectDto> {
      return this.subjectWebService.updateSubject(subject);
  }

  getSubjectDataOperationPageState() {
      return this.subjectDataOperationPageState;
  }

  setSubjectDataOperationPageState(state: DataOperationPageState) {
      this.subjectDataOperationPageState = state;
  }
}
