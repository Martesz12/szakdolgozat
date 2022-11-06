import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeacherDto } from 'src/app/shared/model/timetable/dto/teacher.dto';
import { TeacherService } from 'src/app/shared/service/timetable/teacher.service';

@Component({
  selector: 'app-teacher-data-operations',
  templateUrl: './teacher-data-operations.component.html',
  styleUrls: ['./teacher-data-operations.component.scss'],
})
export class TeacherDataOperationsComponent implements OnInit {
  selectedTeacher: TeacherDto = {} as TeacherDto;

  updatedName = new FormControl('');
  updatedEmail = new FormControl('');
  updatedWebpage = new FormControl('');

  newName = new FormControl('');
  newEmail = new FormControl('');
  newWebpage = new FormControl('');

  constructor(
    private teacherService: TeacherService,
    private snackBar: MatSnackBar
  ) {
    this.getSelectedTeacher();
  }

  //TODO letesztelni és szépíteni a kódon

  ngOnInit(): void {
    this.newName?.addValidators(Validators.required);
    this.newEmail?.addValidators(Validators.required);
    this.newWebpage?.addValidators(Validators.required);

    this.updatedName?.addValidators(Validators.required);
    this.updatedEmail?.addValidators(Validators.required);
    this.updatedWebpage?.addValidators(Validators.required);
  }

  private getSelectedTeacher() {
    this.teacherService.getSelectedTeacherSubject().subscribe((teacher) => {
      this.selectedTeacher = teacher;
      this.updatedName.setValue(this.selectedTeacher.name);
      this.updatedEmail.setValue(this.selectedTeacher.email);
      this.updatedWebpage.setValue(this.selectedTeacher.webpage);
    });
  }

  isTeacherSelected(): boolean {
    return Object.keys(this.selectedTeacher).length !== 0;
  }

  updateTeacher() {
    if (
      this.updatedName.valid &&
      this.updatedEmail.valid &&
      this.updatedWebpage.valid
    ) {
      let updatedTeacher: TeacherDto = this.createUpdatedTeacher();
      this.teacherService.updateTeacher(updatedTeacher).subscribe(
        (_) => {
          this.teacherService.getAllTeacher();
          if(updatedTeacher.id !== null) this.teacherService.selectTeacher(updatedTeacher.id);
          this.snackBar.open('Tanár módosítása sikeres!', 'Ok');
        },
        (err) => this.snackBar.open('Hiba tanár módosítása során: ' + err, 'Ok')
      );
    }
  }

  deleteTeacher(teacherId: number | null) {
    if (teacherId !== null)
      this.teacherService.deleteTeacher(teacherId).subscribe(
        (_) => {
          this.teacherService.getAllTeacher();
          this.teacherService.removeSelectedTeacher();
          this.snackBar.open('Tanár törlése sikeres!', 'Ok');
        },
        (err) => this.snackBar.open('Hiba tanár törlése során: ' + err, 'Ok')
      );
  }

  addTeacher() {
    if (this.newName.valid && this.newWebpage.valid && this.newEmail.valid) {
      let newTeacher: TeacherDto = this.createNewTeacher();
      this.teacherService.addTeacher(newTeacher).subscribe(
        (_) => {
          this.teacherService.getAllTeacher();
          this.snackBar.open('Tanár hozzáadása sikeres!', 'Ok');
          this.newName.setValue('');
          this.newEmail.setValue('');
          this.newWebpage.setValue('');
        },
        (err) => this.snackBar.open('Hiba tanár hozzáadása során: ' + err, 'Ok')
      );
    }
  }

  createNewTeacher(): TeacherDto {
    let name: string = '';
    let webpage: string = '';
    let email: string = '';
    if (this.newName.value !== null) name = this.newName.value;
    if (this.newWebpage.value !== null) webpage = this.newWebpage.value;
    if (this.newEmail.value !== null) email = this.newEmail.value;
    return new TeacherDto(name, webpage, email, 3);
  }

  createUpdatedTeacher(): TeacherDto {
    let name: string = '';
    let webpage: string = '';
    let email: string = '';
    if (this.updatedName.value !== null) name = this.updatedName.value;
    if (this.updatedWebpage.value !== null) webpage = this.updatedWebpage.value;
    if (this.updatedEmail.value !== null) email = this.updatedEmail.value;
    console.log(name + ' ' + webpage + ' ' + email);

    return new TeacherDto(name, webpage, email, 3, this.selectedTeacher.id);
  }
}
