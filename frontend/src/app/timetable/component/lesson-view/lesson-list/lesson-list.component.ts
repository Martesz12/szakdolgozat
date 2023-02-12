import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogData } from 'src/app/shared/component/dialog/dialog-data.model';
import { DialogComponent } from 'src/app/shared/component/dialog/dialog.component';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { LessonDto } from 'src/app/shared/model/timetable/dto/lesson.dto';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';

@Component({
    selector: 'app-lesson-list',
    templateUrl: './lesson-list.component.html',
    styleUrls: ['./lesson-list.component.scss'],
})
export class LessonListComponent {
    allLesson: LessonDto[] = [];
    filteredAllLesson: LessonDto[] = [];
    filterText: string = '';
    selectedLesson: LessonDto = {} as LessonDto;
    allLessonListName: string[] = [];

    constructor(
        private lessonService: LessonService,
        private changeDetection: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {
        this.getAllLesson();
        this.getSelectedLesson();
    }

    private getSelectedLesson() {
        this.lessonService.getSelectedLessonSubject().subscribe(lesson => {
            this.selectedLesson = lesson;
        });
    }

    private getAllLesson() {
        this.lessonService.getAllLessonSubject().subscribe(lessons => {
            this.allLesson = lessons;
            this.filteredAllLesson = lessons;
            this.setAllLessonListName();
        });
    }

    private setAllLessonListName(){
      this.allLesson.forEach((lesson, i) => this.allLessonListName[i] = lesson.day + " - " + lesson.subjectId + " - " + lesson.type);
      console.log(this.allLessonListName);
      
    }

    selectLesson(lessonId: number | null) {
        if (lessonId !== null) {
            if (this.selectedLesson.id !== lessonId) this.lessonService.selectLesson(lessonId);
            this.lessonService.setLessonDataOperationPageState(DataOperationPageState.Description);
        }
    }

    addLesson() {
        this.lessonService.setLessonDataOperationPageState(DataOperationPageState.Add);
    }

    modifyLesson(lessonId: number | null) {
        if (lessonId !== null) {
            if (this.selectedLesson.id !== lessonId) this.lessonService.selectLesson(lessonId);
            this.lessonService.setLessonDataOperationPageState(DataOperationPageState.Modify);
        }
    }

    openDeleteDialog(lessonId: number | null): void {
        const dialogInterface: DialogData = {
            dialogHeader: 'Tanóra törlése',
            dialogContent: 'Biztos ki akarod törölni? A "Törlés" gombra nyomva végleg törlöd.',
            cancelButtonLabel: 'Vissza',
            confirmButtonLabel: 'Törlés',
            callbackMethod: () => {
                this.deleteLesson(lessonId);
            },
        };
        this.dialog.open(DialogComponent, {
            data: dialogInterface,
        });
    }

    deleteLesson(lessonId: number | null): void {
        if (lessonId !== null)
            this.lessonService.deleteLesson(lessonId).subscribe({
                next: _ => {
                    this.lessonService.getAllLesson();
                    this.lessonService.removeSelectedLesson();
                    this.lessonService.setLessonDataOperationPageState(DataOperationPageState.Base);
                    this.snackBar.open('Tanóra törlése sikeres!', 'X', {
                        duration: 2000,
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['info-snackbar'],
                    });
                },
                error: error =>
                    this.snackBar.open('Hiba tanóra törlése során: ' + error, 'X', {
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['error-snackbar'],
                    }),
            });
    }

    applyFilter() {
        this.filterOnAllLesson();
        this.changeDetection.detectChanges();
        this.highlightMatch();
    }

    private filterOnAllLesson() {
        this.filteredAllLesson = this.allLesson.filter((lesson, i) =>
            this.allLessonListName[i].toLowerCase().includes(this.filterText.toLowerCase())
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
