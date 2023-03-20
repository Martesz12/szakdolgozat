import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ForumDto } from 'src/app/shared/model/forum/forum.dto';
import { ForumService } from 'src/app/shared/service/forum/forum.service';

@Component({
    selector: 'app-forum-side-menu',
    templateUrl: './forum-side-menu.component.html',
    styleUrls: ['./forum-side-menu.component.scss'],
})
export class ForumSideMenuComponent implements OnInit {
    allForum: ForumDto[] = [];
    filteredForums: ForumDto[] = [];
    filterText: string = '';

    constructor(private forumService: ForumService, private changeDetection: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.getAllForum();
    }

    private getAllForum() {
        this.forumService.getAllForumSubject().subscribe(forums => {
            this.allForum = forums.filter(forum => forum.approved);
            this.filteredForums = forums.filter(forum => forum.approved);
        });
    }

    applyFilter() {
        this.filterOnAllForum();
        this.changeDetection.detectChanges();
        this.highlightMatch();
    }

    private filterOnAllForum() {
        this.filteredForums = this.allForum.filter(forum =>
            forum.name.toLowerCase().includes(this.filterText.toLowerCase())
        );
    }

    private highlightMatch() {
        let matchingAttributes = document.getElementsByClassName('side-menu-element');
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
