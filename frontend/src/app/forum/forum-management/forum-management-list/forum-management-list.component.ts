import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogData } from 'src/app/shared/component/dialog/dialog-data.model';
import { DialogComponent } from 'src/app/shared/component/dialog/dialog.component';
import { ForumDto } from 'src/app/shared/model/forum/forum.dto';
import { ForumService } from 'src/app/shared/service/forum/forum.service';

@Component({
    selector: 'app-forum-management-list',
    templateUrl: './forum-management-list.component.html',
    styleUrls: ['./forum-management-list.component.scss'],
})
export class ForumManagementListComponent {
    allApprovedForum: ForumDto[] = [];
    allDisapprovedForum: ForumDto[] = [];
    filteredAllApprovedForum: ForumDto[] = [];
    filteredAllDisapprovedForum: ForumDto[] = [];
    approvedFilterText: string = '';
    disapprovedFilterText: string = '';
    selectedForum: ForumDto = {} as ForumDto;

    constructor(
        private forumService: ForumService,
        private changeDetection: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {
        this.getAllForum();
        this.getSelectedForum();
    }

    private getSelectedForum() {
        this.forumService.getSelectedForumSubject().subscribe(forum => {
            this.selectedForum = forum;
        });
    }

    private getAllForum() {
        this.forumService.getAllForumSubject().subscribe(forums => {
            this.allApprovedForum = forums.filter(forum => forum.approved);
            this.filteredAllApprovedForum = forums.filter(forum => forum.approved);
            this.allDisapprovedForum = forums.filter(forum => !forum.approved);
            this.filteredAllDisapprovedForum = forums.filter(forum => !forum.approved);
        });
    }

    selectForum(forumId: number | null) {
        if (forumId !== null) {
            if (this.selectedForum.id !== forumId) this.forumService.selectForum(forumId);
        }
    }

    modifyForum(forumId: number | null) {
        if (forumId !== null) {
            if (this.selectedForum.id !== forumId) this.forumService.selectForum(forumId);
        }
    }

    openDeleteDialog(forumId: number | null): void {
        const dialogInterface: DialogData = {
            dialogHeader: 'Szoba törlése',
            dialogContent:
                'Biztos ki akarod törölni? A "Törlés" gombra nyomva végleg törlöd. A szoba törlése magával vonja az összes hozzá tartozó üzenet törlését.',
            cancelButtonLabel: 'Vissza',
            confirmButtonLabel: 'Törlés',
            callbackMethod: () => {
                this.deleteForum(forumId);
            },
        };
        this.dialog.open(DialogComponent, {
            data: dialogInterface,
        });
    }

    deleteForum(forumId: number | null): void {
        if (forumId !== null)
            this.forumService.deleteForum(forumId).subscribe({
                next: _ => {
                    this.forumService.resetForumState(true);
                    this.snackBar.open('Szoba törlése sikeres!', 'X', {
                        duration: 2000,
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['info-snackbar'],
                    });
                },
                error: error =>
                    this.snackBar.open('Hiba szoba törlése során!', 'X', {
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['error-snackbar'],
                    }),
            });
    }

    applyFilter(isApproved: boolean) {
        this.filterOnAllForum();
        this.changeDetection.detectChanges();
        this.highlightMatch(isApproved);
    }

    private filterOnAllForum() {
        this.filteredAllApprovedForum = this.allApprovedForum.filter(forum =>
            forum.name.toLowerCase().includes(this.approvedFilterText.toLowerCase())
        );
        this.filteredAllDisapprovedForum = this.allDisapprovedForum.filter(forum =>
            forum.name.toLowerCase().includes(this.disapprovedFilterText.toLowerCase())
        );
    }

    private highlightMatch(isApproved: boolean) {
        let matchingAttributes = document.getElementsByClassName(
            isApproved ? 'approved-list-row-name' : 'disapproved-list-row-name'
        );
        let lowerFilterText = (isApproved ? this.approvedFilterText : this.disapprovedFilterText).toLowerCase();
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
