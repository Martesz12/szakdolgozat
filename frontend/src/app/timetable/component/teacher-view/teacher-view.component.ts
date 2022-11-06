import { Component, OnInit } from '@angular/core';
import { TeacherDto } from 'src/app/shared/model/timetable/dto/teacher.dto';
import { TeacherService } from 'src/app/shared/service/timetable/teacher.service';

@Component({
    selector: 'app-teacher-view',
    templateUrl: './teacher-view.component.html',
    styleUrls: ['./teacher-view.component.scss'],
})
export class TeacherViewComponent {
    constructor(private teacherService: TeacherService) {}
}
