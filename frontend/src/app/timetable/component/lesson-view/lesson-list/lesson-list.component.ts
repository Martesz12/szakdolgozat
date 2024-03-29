import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { DialogData } from 'src/app/shared/component/dialog/dialog-data.model';
import { DialogComponent } from 'src/app/shared/component/dialog/dialog.component';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { LessonDto } from 'src/app/shared/model/timetable/dto/lesson.dto';
import { SubjectDto } from 'src/app/shared/model/timetable/dto/subject.dto';
import { LessonService } from 'src/app/shared/service/timetable/lesson.service';
import { MainTaskService } from 'src/app/shared/service/timetable/main-task.service';
import { SubTaskService } from 'src/app/shared/service/timetable/sub-task.service';
import { SubjectService } from 'src/app/shared/service/timetable/subject.service';
import { TimetableService } from 'src/app/shared/service/timetable/timetable.service';
import { SnackBarService } from '../../../../shared/service/snack-bar.service';

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
    allLessonName: Map<number, string> = new Map<number, string>();
    filteredAllLessonName: Map<number, string> = new Map<number, string>();

    selectedTimetableId: number = 0;

    constructor(
        private lessonService: LessonService,
        private changeDetection: ChangeDetectorRef,
        private snackBarService: SnackBarService,
        private dialog: MatDialog,
        private subjectService: SubjectService,
        private timetableService: TimetableService,
        private mainTaskService: MainTaskService,
        private subTaskService: SubTaskService
    ) {
        this.getAllLesson();
        this.getSelectedLesson();
        this.getSelecterTimetableId();
    }

    getSelecterTimetableId() {
        this.timetableService
            .getSelectedTimetableId()
            .subscribe(timetableId => (this.selectedTimetableId = timetableId));
    }

    private getSelectedLesson() {
        this.lessonService.getSelectedLessonSubject().subscribe(lesson => {
            this.selectedLesson = lesson;
        });
    }

    private getAllLesson() {
        this.lessonService
            .getAllLessonSubject()
            .pipe(
                switchMap(lessons => {
                    this.allLesson = lessons;
                    this.filteredAllLesson = lessons;
                    return this.subjectService.getAllSubjectSubject();
                })
            )
            .subscribe(subjects => {
                if (subjects && subjects.length) this.createLessonListName(subjects);
            });
    }

    createLessonListName(allSubject: SubjectDto[]): void {
        this.filteredAllLessonName = new Map<number, string>();
        this.allLessonName = new Map<number, string>();

        this.allLesson.forEach(lesson => {
            let lessonId: number = -1;
            if (lesson.id !== null) lessonId = lesson.id;
            this.allLessonName.set(
                lessonId,
                lesson.day +
                    ' - ' +
                    allSubject.filter(subject => subject.id === lesson.subjectId)[0].name +
                    ' - ' +
                    lesson.type
            );
        });
        this.filteredAllLessonName = new Map(this.allLessonName);
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
            dialogContent:
                'Biztos ki akarod törölni? A "Törlés" gombra nyomva végleg törlöd. A tanóra törlése magával vonja az összes hozzá tartozó feladat törlését.',
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
                    this.lessonService.resetLessonState(true);
                    this.mainTaskService.resetMainTaskState(true);
                    this.subTaskService.resetSubTaskState(true);
                    this.snackBarService.infoSnackBar('Tanóra törlése sikeres!');
                },
                error: error => this.snackBarService.errorSnackBar('Hiba tanóra törlése során!'),
            });
    }

    applyFilter() {
        this.filterOnAllLesson();
        this.changeDetection.detectChanges();
        this.highlightMatch();
    }

    private filterOnAllLesson() {
        this.filteredAllLessonName = new Map<number, string>();
        this.allLessonName.forEach((value, key) => {
            if (value.toLowerCase().includes(this.filterText.toLowerCase())) this.filteredAllLessonName.set(key, value);
        });
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
