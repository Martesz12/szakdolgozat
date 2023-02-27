import { Component } from '@angular/core';
import { SubjectDto } from 'src/app/shared/model/timetable/dto/subject.dto';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';

@Component({
  selector: 'app-subject-data-operations-description',
  templateUrl: './subject-data-operations-description.component.html',
  styleUrls: ['./subject-data-operations-description.component.scss']
})
export class SubjectDataOperationsDescriptionComponent {
  selectedSubject: SubjectDto = {} as SubjectDto;

  constructor(private subjectService: SubjectService) {
      this.getSelectedSubject();
  }

  private getSelectedSubject() {
      this.subjectService.getSelectedSubjectSubject().subscribe(subject => {
          this.selectedSubject = subject;
      });
  }

  getScreenWidth(): number{
      return window.innerWidth;
  }

  isInMobileView(): boolean{
      return this.getScreenWidth() <= 1000;
  }
}
