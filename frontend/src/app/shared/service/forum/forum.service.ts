import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ForumDto } from '../../model/forum/forum.dto';
import { ForumWebService } from '../api/forum/forum-web.service';
import { UserService } from '../user.service';

@Injectable({
    providedIn: 'root',
})
export class ForumService {
    allForumSubject: BehaviorSubject<ForumDto[]> = new BehaviorSubject<ForumDto[]>([]);
    selectedForumSubject: BehaviorSubject<ForumDto> = new BehaviorSubject<ForumDto>({} as ForumDto);

    constructor(private forumWebService: ForumWebService, private userService: UserService) {
        this.getAllForum();
    }

    getAllForum() {
        this.forumWebService.getAllForum().subscribe(Forums => {
            this.allForumSubject.next(Forums);
        });
    }

    getAllForumSubject(): Observable<ForumDto[]> {
        return this.allForumSubject.asObservable();
    }

    getSelectedForumSubject(): Observable<ForumDto> {
        return this.selectedForumSubject.asObservable();
    }

    selectForum(forumId: number) {
        if (!forumId) this.selectedForumSubject.next({} as ForumDto);
        this.forumWebService.getForumById(forumId).subscribe(Forum => this.selectedForumSubject.next(Forum));
    }

    removeSelectedForum() {
        this.selectedForumSubject.next({} as ForumDto);
    }

    addForum(forum: ForumDto): Observable<ForumDto> {
        return this.forumWebService.addForum(forum);
    }

    deleteForum(forumId: number) {
        return this.forumWebService.deleteForum(forumId);
    }

    updateForum(forum: ForumDto): Observable<ForumDto> {
        return this.forumWebService.updateForum(forum);
    }

    getForumById(id: number): Observable<ForumDto> {
        return this.forumWebService.getForumById(id);
    }

    resetForumState(afterDelete: boolean = false): void {
        this.removeSelectedForum();
        if (afterDelete) this.getAllForum();
    }
}
