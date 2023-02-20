import { Component } from '@angular/core';
import { Observable, filter, map, switchMap } from 'rxjs';
import { LessonDto } from 'src/app/shared/model/timetable/dto/lesson.dto';
import { SubjectDto } from 'src/app/shared/model/timetable/dto/subject.dto';
import { TeacherDto } from 'src/app/shared/model/timetable/dto/teacher.dto';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';
import { TeacherService } from 'src/app/shared/service/timetable/teacher.service';

@Component({
    selector: 'app-timetable-daily-view-description',
    templateUrl: './timetable-daily-view-description.component.html',
    styleUrls: ['./timetable-daily-view-description.component.scss'],
})
export class TimetableDailyViewDescriptionComponent {
    selectedLesson: LessonDto = {} as LessonDto;
    selectedLessonSubject: SubjectDto = {} as SubjectDto;
    selectedLessonTeacher: TeacherDto = {} as TeacherDto;

    constructor(
        private lessonService: LessonService,
        private subjectService: SubjectService,
        private teacherService: TeacherService
    ) {
        this.initializeDataForDescription();
    }

    initializeDataForDescription(): void {
        this.lessonService
            .getSelectedLessonSubject()
            .pipe(
                filter(lesson => lesson !== undefined && Object.keys(lesson).length !== 0),
                switchMap(lesson => {
                    this.selectedLesson = lesson;
                    return this.teacherService.getTeacherById(this.selectedLesson.teacherId);
                }),
                switchMap(teacher => {
                    this.selectedLessonTeacher = teacher;
                    return this.subjectService.getSubjectById(this.selectedLesson.subjectId);
                })
            )
            .subscribe(subject => (this.selectedLessonSubject = subject));
    }

    hasSelectedLesson(): Observable<boolean> {
        return this.lessonService.getSelectedLessonSubject().pipe(
            map(lesson => {
                return lesson !== undefined && Object.keys(lesson).length !== 0;
            })
        );
    }

    backToListView(): void {
        this.lessonService.removeSelectedLesson();
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    showBothCard(): boolean {
        return this.getScreenWidth() > 599;
    }
}
