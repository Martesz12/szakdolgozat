import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { TeacherService } from 'src/app/shared/service/timetable/teacher.service';
import { TeacherDto } from 'src/app/shared/model/timetable/dto/teacher.dto';

@Component({
    selector: 'app-teacher-data-operations-description',
    templateUrl: './teacher-data-operations-description.component.html',
    styleUrls: ['./teacher-data-operations-description.component.scss'],
})
export class TeacherDataOperationsDescriptionComponent {
    selectedTeacher: TeacherDto = {} as TeacherDto;

    constructor(private teacherService: TeacherService, private snackBar: MatSnackBar, private clipboard: Clipboard) {
        this.getSelectedTeacher();
    }

    copyEmail(email: string) {
        this.clipboard.copy(email);
        this.snackBar.open('Email cím lemásolva!', 'X', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['info-snackbar']
        });
    }

    private getSelectedTeacher() {
        this.teacherService.getSelectedTeacherSubject().subscribe(teacher => {
            this.selectedTeacher = teacher;
        });
    }

    getScreenWidth(): number{
        return window.innerWidth;
    }

    isInMobileView(): boolean{
        return this.getScreenWidth() <= 599;
    }
}
