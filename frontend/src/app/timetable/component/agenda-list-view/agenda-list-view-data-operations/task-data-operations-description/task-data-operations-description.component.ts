import { Component, OnInit } from '@angular/core';
import { filter, switchMap } from 'rxjs';
import { LessonDto } from 'src/app/shared/model/timetable/dto/lesson.dto';
import { MainTaskDto } from 'src/app/shared/model/timetable/dto/main-task.dto';
import { SubjectDto } from 'src/app/shared/model/timetable/dto/subject.dto';
import { TeacherDto } from 'src/app/shared/model/timetable/dto/teacher.dto';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';
import { MainTaskService } from 'src/app/shared/service/timetable/main-task.service';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';
import { TeacherService } from 'src/app/shared/service/timetable/teacher.service';

@Component({
    selector: 'app-task-data-operations-description',
    templateUrl: './task-data-operations-description.component.html',
    styleUrls: ['./task-data-operations-description.component.scss'],
})
export class TaskDataOperationsDescriptionComponent {
    selectedMainTask: MainTaskDto = {} as MainTaskDto;
    selectedLesson: LessonDto = {} as LessonDto;
    selectedLessonSubject: SubjectDto = {} as SubjectDto;
    selectedLessonTeacher: TeacherDto = {} as TeacherDto;

    constructor(
        private lessonService: LessonService,
        private subjectService: SubjectService,
        private teacherService: TeacherService,
        private mainTaskService: MainTaskService
    ) {
        this.initializeDataForDescription();
    }

    initializeDataForDescription() {
        this.mainTaskService
            .getSelectedMainTaskSubject()
            .pipe(
                filter(mainTask => mainTask !== undefined && Object.keys(mainTask).length !== 0),
                switchMap(mainTask => {
                    this.selectedMainTask = mainTask;
                    return this.lessonService.getLessonById(this.selectedMainTask.lessonId);
                }),
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

    getScreenWidth(): number {
        return window.innerWidth;
    }

    isInMobileView(): boolean {
        return this.getScreenWidth() <= 1000;
    }
}
