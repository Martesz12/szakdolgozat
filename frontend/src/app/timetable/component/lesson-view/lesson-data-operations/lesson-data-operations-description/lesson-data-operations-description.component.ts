import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LessonDto } from 'src/app/shared/model/timetable/dto/lesson.dto';
import { SubjectDto } from 'src/app/shared/model/timetable/dto/subject.dto';
import { TeacherDto } from 'src/app/shared/model/timetable/dto/teacher.dto';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';
import { TeacherService } from 'src/app/shared/service/timetable/teacher.service';

@Component({
    selector: 'app-lesson-data-operations-description',
    templateUrl: './lesson-data-operations-description.component.html',
    styleUrls: ['./lesson-data-operations-description.component.scss'],
})
export class LessonDataOperationsDescriptionComponent {
    selectedLesson: LessonDto = {} as LessonDto;
    allSubject: SubjectDto[] = [];
    allTeacher: TeacherDto[] = [];
    selectedLessonSubjectId: number = -1;
    selectedLessonTeacherId: number = -1;

    constructor(
        private lessonService: LessonService,
        private subjectService: SubjectService,
        private teacherService: TeacherService
    ) {
        this.getAllSubject();
        // this.getAllTeacher();
        // this.getSelectedLesson();
    }

    private getSelectedLesson() {
        this.lessonService.getSelectedLessonSubject().subscribe(lesson => {
            this.selectedLesson = lesson;
            this.selectedLessonSubjectId = this.allSubject.findIndex(subject => subject.id === lesson.subjectId);
            this.selectedLessonTeacherId = this.allTeacher.findIndex(teacher => teacher.id === lesson.teacherId);
        });
    }

    getAllSubject(): void {
        this.subjectService.getAllSubjectSubject().subscribe(subjects => {
            this.allSubject = subjects;
            this.getAllTeacher();
        });
    }

    getAllTeacher(): void {
        this.teacherService.getAllTeacherSubject().subscribe(teachers => {
            this.allTeacher = teachers;
            this.getSelectedLesson();
        });
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    isInMobileView(): boolean {
        return this.getScreenWidth() <= 599;
    }
}
