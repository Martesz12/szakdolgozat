import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
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
    selectedTeacher: TeacherDto = {} as TeacherDto;

    constructor(
        private teacherService: TeacherService,
        private changeDetection: ChangeDetectorRef,
        private snackBar: MatSnackBar
    ) {
        this.getAllTeacher();
        this.getSelectedTeacher();
    }

    private getSelectedTeacher() {
        this.teacherService.getSelectedTeacherSubject().subscribe(teacher => {
            this.selectedTeacher = teacher;
        });
    }

    private getAllTeacher() {
        this.teacherService.getAllTeacherSubject().subscribe(teachers => {
            this.allTeacher = teachers;
            this.filteredAllTeacher = teachers;
        });
    }

    selectTeacher(teacherId: number | null) {
        if (teacherId !== null) {
            if (this.selectedTeacher.id !== teacherId) this.teacherService.selectTeacher(teacherId);
            this.teacherService.setTeacherDataOperationPageState(DataOperationPageState.Description);
        }
    }

    addTeacher() {
        this.teacherService.setTeacherDataOperationPageState(DataOperationPageState.Add);
    }

    modifyTeacher(teacherId: number | null) {
        if (teacherId !== null) {
            if (this.selectedTeacher.id !== teacherId) this.teacherService.selectTeacher(teacherId);
            this.teacherService.setTeacherDataOperationPageState(DataOperationPageState.Modify);
        }
    }

    deleteTeacher(teacherId: number | null): void {
        if (teacherId !== null)
            this.teacherService.deleteTeacher(teacherId).subscribe({
                next: _ => {
                    this.teacherService.getAllTeacher();
                    this.teacherService.removeSelectedTeacher();
                    this.teacherService.setTeacherDataOperationPageState(DataOperationPageState.Base);
                    this.snackBar.open('Tanár törlése sikeres!', 'X', {
                        duration: 2000,
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                    });
                },
                error: error =>
                    this.snackBar.open('Hiba tanár törlése során: ' + error, 'X', {
                        duration: 10000,
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                    }),
            });
    }

    applyFilter() {
        this.filterOnAllTeacher();
        this.changeDetection.detectChanges();
        this.highlightMatch();
    }

    private filterOnAllTeacher() {
        this.filteredAllTeacher = this.allTeacher.filter(teacher =>
            teacher.name.toLowerCase().includes(this.filterText.toLowerCase())
        );
    }

    private highlightMatch() {
        let matchingAttributes = document.getElementsByClassName('list-row-name');
        let lowerFilterText = this.filterText.toLowerCase();
        let lowerAttributeText = '';
        let originalAttributeText = '';
        let indexOfMatching = 0;
        let highlightOpeningTag = '<span style="color: red">';
        let highlightClosingTag = '</span>';

        for (let i = 0; i < matchingAttributes.length; i++) {
            originalAttributeText = matchingAttributes[i].innerHTML;
            if (originalAttributeText.includes(highlightOpeningTag)) {
                originalAttributeText = originalAttributeText.replace(highlightOpeningTag, '');
                originalAttributeText = originalAttributeText.replace(highlightClosingTag, '');
            }
            lowerAttributeText = originalAttributeText.toLowerCase();
            if (lowerAttributeText.includes(lowerFilterText)) {
                indexOfMatching = lowerAttributeText.indexOf(lowerFilterText);
                matchingAttributes[i].innerHTML =
                    originalAttributeText.substring(0, indexOfMatching) +
                    highlightOpeningTag +
                    originalAttributeText.substring(indexOfMatching, indexOfMatching + lowerFilterText.length) +
                    highlightClosingTag +
                    originalAttributeText.substring(indexOfMatching + lowerFilterText.length);
            } else {
                matchingAttributes[i].innerHTML = originalAttributeText;
            }
        }
    }
}
