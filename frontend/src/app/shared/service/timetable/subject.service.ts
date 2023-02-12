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
  colorPickerIndex: number = 0;
  readonly SUBJECT_COLORS: string[] = [
    '',
    '#1abc9c',
    '#16a085',
    '#2ecc71',
    '#27ae60',
    '#3498db',
    '#2980b9',
    '#9b59b6',
    '#8e44ad',
    '#34495e',
    '#2c3e50',
    '#f1c40f',
    '#f39c12',
    '#e67e22',
    '#d35400',
    '#e74c3c',
    '#95a5a6',
    '#666b5e',
    '#a98467',
    '#4e3524',
    '#411900',
];

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
    if(state === DataOperationPageState.Add) this.colorPickerIndex = 0;
      this.subjectDataOperationPageState = state;
  }
}
