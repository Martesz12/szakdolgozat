import { Component, OnDestroy, OnInit } from '@angular/core';
import { ForumService } from 'src/app/shared/service/forum/forum.service';

@Component({
    selector: 'app-forum-management',
    templateUrl: './forum-management.component.html',
    styleUrls: ['./forum-management.component.scss'],
})
export class ForumManagementComponent implements OnInit, OnDestroy {
    hasSelectedForum: boolean = false;
    
    constructor(private forumService: ForumService) {}

    ngOnInit(): void {
        this.forumService.getSelectedForumSubject().subscribe(selectedForum => {
            this.hasSelectedForum = !!Object.keys(selectedForum).length
        });
    }

    ngOnDestroy(): void {
        this.forumService.resetForumState();
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    showBothCard(): boolean {
        return this.getScreenWidth() > 1000;
    }

    showForumListCard(): boolean {
        return this.showBothCard() || (!this.showBothCard() && !this.hasSelectedForum);
    }

    showForumModifyCard(): boolean {
        return this.showBothCard() || (!this.showBothCard() && this.hasSelectedForum);
    }
}
