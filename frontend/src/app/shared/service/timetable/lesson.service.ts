import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataOperationPageState } from '../../enum/DataOperationPageState.enum';
import { LessonDto } from '../../model/timetable/dto/lesson.dto';
import { LessonWebService } from '../api/timetable/lesson-web.service';

@Injectable({
    providedIn: 'root',
})
export class LessonService {
    allLessonSubject: BehaviorSubject<LessonDto[]> = new BehaviorSubject<LessonDto[]>([]);
    selectedLessonSubject: BehaviorSubject<LessonDto> = new BehaviorSubject<LessonDto>({} as LessonDto);
    lessonDataOperationPageState: DataOperationPageState = DataOperationPageState.Base;

    constructor(private lessonWebService: LessonWebService) {
        this.getAllLesson();
    }

    getAllLesson() {
        this.lessonWebService.getAllLesson().subscribe(lessons => {
            this.allLessonSubject.next(lessons);
            console.log(lessons);
        });
    }

    getAllLessonSubject(): Observable<LessonDto[]> {
        return this.allLessonSubject.asObservable();
    }

    getSelectedLessonSubject(): Observable<LessonDto> {
        return this.selectedLessonSubject.asObservable();
    }

    selectLesson(lessonId: number) {
        this.lessonWebService
            .getLessonById(lessonId)
            .subscribe(lesson => this.selectedLessonSubject.next(lesson));
    }

    removeSelectedLesson() {
        this.selectedLessonSubject.next({} as LessonDto);
    }

    addLesson(lesson: LessonDto): Observable<LessonDto> {
        return this.lessonWebService.addLesson(lesson);
    }

    deleteLesson(lessonId: number) {
        return this.lessonWebService.deleteLesson(lessonId);
    }

    updateLesson(lesson: LessonDto): Observable<LessonDto> {
        return this.lessonWebService.updateLesson(lesson);
    }

    getLessonDataOperationPageState() {
        return this.lessonDataOperationPageState;
    }

    setLessonDataOperationPageState(state: DataOperationPageState) {
        this.lessonDataOperationPageState = state;
    }
}
