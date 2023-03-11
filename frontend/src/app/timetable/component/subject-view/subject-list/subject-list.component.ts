import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogData } from 'src/app/shared/component/dialog/dialog-data.model';
import { DialogComponent } from 'src/app/shared/component/dialog/dialog.component';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { SubjectDto } from 'src/app/shared/model/timetable/dto/subject.dto';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';
import { MainTaskService } from 'src/app/shared/service/timetable/main-task.service';
import { SubTaskService } from 'src/app/shared/service/timetable/sub-task.service';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';

@Component({
    selector: 'app-subject-list',
    templateUrl: './subject-list.component.html',
    styleUrls: ['./subject-list.component.scss'],
})
export class SubjectListComponent {
    allSubject: SubjectDto[] = [];
    filteredAllSubject: SubjectDto[] = [];
    filterText: string = '';
    selectedSubject: SubjectDto = {} as SubjectDto;

    constructor(
        private subjectService: SubjectService,
        private changeDetection: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private lessonService: LessonService,
        private mainTaskService: MainTaskService,
        private subTaskService: SubTaskService
    ) {
        this.getAllSubject();
        this.getSelectedSubject();
    }

    private getSelectedSubject() {
        this.subjectService.getSelectedSubjectSubject().subscribe(subject => {
            this.selectedSubject = subject;
        });
    }

    private getAllSubject() {
        this.subjectService.getAllSubjectSubject().subscribe(subjects => {
            console.log(subjects);
            this.allSubject = subjects;
            this.filteredAllSubject = subjects;
        });
    }

    selectSubject(subjectId: number | null) {
        if (subjectId !== null) {
            if (this.selectedSubject.id !== subjectId) this.subjectService.selectSubject(subjectId);
            this.subjectService.setSubjectDataOperationPageState(DataOperationPageState.Description);
        }
    }

    addSubject() {
        this.subjectService.setSubjectDataOperationPageState(DataOperationPageState.Add);
    }

    modifySubject(subjectId: number | null) {
        if (subjectId !== null) {
            if (this.selectedSubject.id !== subjectId) this.subjectService.selectSubject(subjectId);
            this.subjectService.setSubjectDataOperationPageState(DataOperationPageState.Modify);
        }
    }

    openDeleteDialog(subjectId: number | null): void {
        const dialogInterface: DialogData = {
            dialogHeader: 'Tantárgy törlése',
            dialogContent:
                'Biztos ki akarod törölni? A "Törlés" gombra nyomva végleg törlöd. A tantárgy törlése magával vonja az összes hozzá tartozó tanóra és feladat törlését.',
            cancelButtonLabel: 'Vissza',
            confirmButtonLabel: 'Törlés',
            callbackMethod: () => {
                this.deleteSubject(subjectId);
            },
        };
        this.dialog.open(DialogComponent, {
            data: dialogInterface,
        });
    }

    deleteSubject(subjectId: number | null): void {
        if (subjectId !== null)
            this.subjectService.deleteSubject(subjectId).subscribe({
                next: _ => {
                    this.subjectService.resetSubjectState(true);
                    this.lessonService.resetLessonState(true);
                    this.mainTaskService.resetMainTaskState(true);
                    this.subTaskService.resetSubTaskState(true);
                    this.snackBar.open('Tantárgy törlése sikeres!', 'X', {
                        duration: 2000,
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['info-snackbar'],
                    });
                },
                error: error =>
                    this.snackBar.open('Hiba tantárgy törlése során: ' + error, 'X', {
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['error-snackbar'],
                    }),
            });
    }

    applyFilter() {
        this.filterOnAllSubject();
        this.changeDetection.detectChanges();
        this.highlightMatch();
    }

    private filterOnAllSubject() {
        this.filteredAllSubject = this.allSubject.filter(subject =>
            subject.name.toLowerCase().includes(this.filterText.toLowerCase())
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
