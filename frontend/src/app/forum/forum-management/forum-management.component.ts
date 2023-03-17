import { Component, OnDestroy, OnInit } from '@angular/core';
import { ForumService } from 'src/app/shared/service/forum/forum.service';

@Component({
    selector: 'app-forum-management',
    templateUrl: './forum-management.component.html',
    styleUrls: ['./forum-management.component.scss'],
})
export class ForumManagementComponent implements OnInit, OnDestroy {
    constructor(private forumService: ForumService) {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.forumService.resetForumState();
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    showBothCard(): boolean {
        return this.getScreenWidth() > 1000;
    }

    // showForumListCard(): boolean {
    //     return this.showBothCard() || (!this.showBothCard() && this.isStateTheCurrentPageState('base'));
    // }

    // showForumDataOperationCard(): boolean {
    //     return this.showBothCard() || (!this.showBothCard() && !this.isStateTheCurrentPageState('base'));
    // }
}
