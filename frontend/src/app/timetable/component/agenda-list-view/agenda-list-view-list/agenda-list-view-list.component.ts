import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogData } from 'src/app/shared/component/dialog/dialog-data.model';
import { DialogComponent } from 'src/app/shared/component/dialog/dialog.component';
import { DataOperationPageState } from 'src/app/shared/enum/DataOperationPageState.enum';
import { MainTaskDto } from 'src/app/shared/model/timetable/dto/main-task.dto';
import { MainTaskService } from 'src/app/shared/service/timetable/main-task.service';
import { TimetableService } from 'src/app/shared/service/timetable/timetable.service';

@Component({
    selector: 'app-agenda-list-view-list',
    templateUrl: './agenda-list-view-list.component.html',
    styleUrls: ['./agenda-list-view-list.component.scss'],
})
export class AgendaListViewListComponent {
    allMainTask: MainTaskDto[] = [];
    filteredAllMainTask: MainTaskDto[] = [];
    filterText: string = '';
    selectedMainTask: MainTaskDto = {} as MainTaskDto;

    selectedTimetableId: number = 0;

    constructor(
        private mainTaskService: MainTaskService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private changeDetection: ChangeDetectorRef,
        private timetableService: TimetableService,
    ) {
        this.getAllMainTask();
        this.getSelectedMainTask();
        this.getSelecterTimetableId();
    }

    getAllMainTask() {
        this.mainTaskService.getAllMainTaskSubject().subscribe(mainTasks => {
            console.log(mainTasks);
            this.allMainTask = mainTasks;
            this.filteredAllMainTask = mainTasks;
        });
    }

    getSelecterTimetableId() {
        this.timetableService
            .getSelectedTimetableId()
            .subscribe(timetableId => (this.selectedTimetableId = timetableId));
    }

    private getSelectedMainTask() {
        this.mainTaskService.getSelectedMainTaskSubject().subscribe(mainTask => {
            this.selectedMainTask = mainTask;
        });
    }

    selectMainTask(mainTaskId: number | null) {
        if (mainTaskId !== null) {
            if (this.selectedMainTask.id !== mainTaskId) this.mainTaskService.selectMainTask(mainTaskId);
            this.mainTaskService.setMainTaskDataOperationPageState(DataOperationPageState.Description);
        }
    }

    addMainTask() {
        this.mainTaskService.setMainTaskDataOperationPageState(DataOperationPageState.Add);
    }

    modifyMainTask(mainTaskId: number | null) {
        if (mainTaskId !== null) {
            if (this.selectedMainTask.id !== mainTaskId) this.mainTaskService.selectMainTask(mainTaskId);
            this.mainTaskService.setMainTaskDataOperationPageState(DataOperationPageState.Modify);
        }
    }

    openDeleteDialog(mainTaskId: number | null): void {
        const dialogInterface: DialogData = {
            dialogHeader: 'Feladat törlése',
            dialogContent: 'Biztos ki akarod törölni? A "Törlés" gombra nyomva végleg törlöd.',
            cancelButtonLabel: 'Vissza',
            confirmButtonLabel: 'Törlés',
            callbackMethod: () => {
                this.deleteMainTask(mainTaskId);
            },
        };
        this.dialog.open(DialogComponent, {
            data: dialogInterface,
        });
    }

    deleteMainTask(mainTaskId: number | null): void {
        if (mainTaskId !== null)
            this.mainTaskService.deleteMainTask(mainTaskId).subscribe({
                next: _ => {
                    this.mainTaskService.getMainTasksByLessonIds();
                    this.mainTaskService.removeSelectedMainTask();
                    this.mainTaskService.setMainTaskDataOperationPageState(DataOperationPageState.Base);
                    this.snackBar.open('Feladat törlése sikeres!', 'X', {
                        duration: 2000,
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['info-snackbar'],
                    });
                },
                error: error =>
                    this.snackBar.open('Hiba feladat törlése során: ' + error, 'X', {
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['error-snackbar'],
                    }),
            });
    }

    applyFilter() {
        this.filterOnAllMainTask();
        this.changeDetection.detectChanges();
        this.highlightMatch();
    }

    private filterOnAllMainTask() {
        this.filteredAllMainTask = this.allMainTask.filter(mainTask =>
            mainTask.name.toLowerCase().includes(this.filterText.toLowerCase())
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
