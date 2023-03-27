import { Component, OnDestroy, OnInit } from '@angular/core';
import { ForumService } from '../../shared/service/forum/forum.service';
import { ForumDto } from '../../shared/model/forum/forum.dto';
import { FormControl } from '@angular/forms';
import { MessageService } from '../../shared/service/forum/message.service';
import { MessageDto } from '../../shared/model/forum/message.dto';
import { MessageTypeEnum } from '../../shared/model/forum/message-type.enum';
import { UserService } from '../../shared/service/user.service';
import { interval, switchMap } from 'rxjs';

@Component({
    selector: 'app-forum-main',
    templateUrl: './forum-main.component.html',
    styleUrls: ['./forum-main.component.scss'],
})
export class ForumMainComponent implements OnInit, OnDestroy {
    selectedForum: ForumDto = {} as ForumDto;
    message = new FormControl('');
    allMessage: MessageDto[] = [];

    constructor(
        private forumService: ForumService,
        private messageService: MessageService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.messageService.connectToActiveForumMessages();
        this.getSelectedForum();
        this.getMessages();
    }

    ngOnDestroy(): void {
        this.messageService.disconnectFromActiveForumMessages();
        this.forumService.selectForum(0);
    }

    getSelectedForum(): void {
        this.forumService.getSelectedForumSubject().subscribe(forum => (this.selectedForum = forum));
    }

    getMessages(): void {
        interval(1000)
            .pipe(switchMap(() => this.messageService.getAllMessageBySelectedForumId()))
            .subscribe(messages => (this.allMessage = messages));
    }

    isForumSelected(): boolean {
        return !!Object.keys(this.selectedForum).length;
    }

    sendMessage() {
        if (this.message.value !== '') {
            let message = this.createMessage();
            this.messageService.sendMessageToActiveForum(message);
            this.message.setValue('');
        }
    }

    private createMessage() {
        return new MessageDto(
            false,
            this.message.value!,
            MessageTypeEnum.MESSAGE,
            new Date(),
            this.userService.getUserId(),
            this.selectedForum.id!
        );
    }
}
