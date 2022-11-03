import { Component, OnInit } from '@angular/core';
import { TeacherDto } from 'src/app/shared/model/timetable/dto/teacher.dto';
import { TeacherWebService } from 'src/app/shared/service/api/timetable/teacher-web.service';

@Component({
  selector: 'app-teacher-view',
  templateUrl: './teacher-view.component.html',
  styleUrls: ['./teacher-view.component.scss']
})
export class TeacherViewComponent implements OnInit {

  constructor(private teacherWebService: TeacherWebService) {
    
  }

  ngOnInit(): void {
  }

}
