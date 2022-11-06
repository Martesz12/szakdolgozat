import { Component, OnInit } from '@angular/core';
import { TeacherDto } from 'src/app/shared/model/timetable/dto/teacher.dto';
import { TeacherService } from 'src/app/shared/service/timetable/teacher.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
})
export class TeacherListComponent {
  allTeacher: TeacherDto[] = [];
  filteredAllTeacher: TeacherDto[] = [];
  filterText: string = '';

  constructor(private teacherService: TeacherService) {
    this.getAllTeacher();
  }

  private getAllTeacher(){
    this.teacherService.getAllTeacherSubject().subscribe((teachers) => {
      this.allTeacher = teachers;
      this.filteredAllTeacher = teachers;
    });
  }

  selectTeacher(teacherId: number | null) {
    if (teacherId !== null) this.teacherService.selectTeacher(teacherId);
  }

  //TODO nem highlightol pl.: Kelemen -> Kelemenn -> Kelemen
  applyFilter() {
    this.filterOnAllTeacher();
    this.highlightMatch();
  }

  private filterOnAllTeacher() {
    this.filteredAllTeacher = this.allTeacher.filter((teacher) =>
      teacher.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  private highlightMatch() {
    let matchingAttributes = document.getElementsByClassName('all-teacher');
    let lowerFilterText = this.filterText.toLowerCase();
    let lowerAttributeText = '';
    let originalAttributeText = '';
    let indexOfMatching = 0;
    let highlightOpeningTag = '<span style="color: red">';
    let highlightClosingTag = '</span>';

    for (let i = 0; i < matchingAttributes.length; i++) {
      originalAttributeText = matchingAttributes[i].innerHTML;
      if (originalAttributeText.includes(highlightOpeningTag)) {
        originalAttributeText = originalAttributeText.replace(
          highlightOpeningTag,
          ''
        );
        originalAttributeText = originalAttributeText.replace(
          highlightClosingTag,
          ''
        );
      }
      lowerAttributeText = originalAttributeText.toLowerCase();
      if (lowerAttributeText.includes(lowerFilterText)) {
        indexOfMatching = lowerAttributeText.indexOf(lowerFilterText);
        matchingAttributes[i].innerHTML =
          originalAttributeText.substring(0, indexOfMatching) +
          highlightOpeningTag +
          originalAttributeText.substring(
            indexOfMatching,
            indexOfMatching + lowerFilterText.length
          ) +
          highlightClosingTag +
          originalAttributeText.substring(
            indexOfMatching + lowerFilterText.length
          );
      } else {
        matchingAttributes[i].innerHTML = originalAttributeText;
      }
    }
  }
}
