import { Component, OnDestroy, OnInit } from '@angular/core';
import { ForumService } from '../../shared/service/forum/forum.service';
import { ForumDto } from '../../shared/model/forum/forum.dto';
import { FormControl } from '@angular/forms';
import { MessageService } from '../../shared/service/forum/message.service';
import { MessageDto } from '../../shared/model/forum/message.dto';
import { MessageTypeEnum } from '../../shared/model/forum/message-type.enum';
import { UserService } from '../../shared/service/user.service';
import { UserDto } from '../../shared/model/authentication/dto/user.dto';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-forum-main',
    templateUrl: './forum-main.component.html',
    styleUrls: ['./forum-main.component.scss'],
})
export class ForumMainComponent implements OnInit, OnDestroy {
    selectedForum: ForumDto = {} as ForumDto;
    message = new FormControl('');
    allMessage: MessageDto[] = [];
    userMap: Map<number, UserDto> = new Map<number, UserDto>();

    constructor(
        private forumService: ForumService,
        private messageService: MessageService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.getSelectedForum();
        this.getMessages();
    }

    ngOnDestroy(): void {
        this.forumService.selectForum(0);
    }

    getSelectedForum(): void {
        this.forumService.getSelectedForumSubject().subscribe(forum => (this.selectedForum = forum));
    }

    getMessages(): void {
        this.messageService
            .getAllMessageSubject()
            .pipe(
                switchMap(messages => {
                    this.allMessage = messages;
                    let userIds: Set<number> = new Set();
                    messages.forEach(message => userIds.add(message.userId));
                    return this.userService.getUsersByIds(Array.from(userIds));
                })
            )
            .subscribe(users => {
                users.forEach(user => this.userMap.set(user.id!, user));
            });
        // interval(1000)
        //     .pipe(switchMap(() => this.messageService.getAllMessageBySelectedForumId()))
        //     .subscribe(messages => (this.allMessage = messages));
    }

    isForumSelected(): boolean {
        return !!Object.keys(this.selectedForum).length;
    }

    sendMessage() {
        if (this.message.value !== '') {
            let message = this.createMessage();
            this.messageService.addMessage(message).subscribe({
                next: message => {
                    this.message.setValue('');
                    console.log('message sent');
                },
                error: _ => {
                    console.error('message error');
                },
            });
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

    pinMessage(message: MessageDto) {
        let pinnedMessage = new MessageDto(
            true,
            message.content,
            message.type,
            message.dateOfUpload,
            message.userId,
            message.forumId,
            message.id
        );
        this.updateMessage(pinnedMessage);
    }

    unpinMessage(message: MessageDto) {
        let pinnedMessage = new MessageDto(
            false,
            message.content,
            message.type,
            message.dateOfUpload,
            message.userId,
            message.forumId,
            message.id
        );
        this.updateMessage(pinnedMessage);
    }

    updateMessage(updatedMessage: MessageDto) {
        this.messageService.updateMessage(updatedMessage).subscribe({
            next: message => {
                console.log('message updated');
            },
            error: _ => {
                console.error('message error');
            },
        });
    }
}
