import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { TeacherService } from 'src/app/shared/service/timetable/teacher.service';
import { TeacherDto } from 'src/app/shared/model/timetable/dto/teacher.dto';
import { SnackBarService } from '../../../../../shared/service/snack-bar.service';

@Component({
    selector: 'app-teacher-data-operations-description',
    templateUrl: './teacher-data-operations-description.component.html',
    styleUrls: ['./teacher-data-operations-description.component.scss'],
})
export class TeacherDataOperationsDescriptionComponent {
    selectedTeacher: TeacherDto = {} as TeacherDto;

    constructor(
        private teacherService: TeacherService,
        private snackBarService: SnackBarService,
        private clipboard: Clipboard
    ) {
        this.getSelectedTeacher();
    }

    copyEmail(email: string) {
        this.clipboard.copy(email);
        this.snackBarService.infoSnackBar('Email cím lemásolva!');
    }

    private getSelectedTeacher() {
        this.teacherService.getSelectedTeacherSubject().subscribe(teacher => {
            this.selectedTeacher = teacher;
        });
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    isInMobileView(): boolean {
        return this.getScreenWidth() <= 1000;
    }
}
