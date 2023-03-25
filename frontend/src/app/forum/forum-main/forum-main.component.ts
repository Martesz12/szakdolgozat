import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../shared/service/forum/forum.service';
import { ForumDto } from '../../shared/model/forum/forum.dto';
import { FormControl } from '@angular/forms';
import { MessageService } from '../../shared/service/forum/message.service';
import { MessageDto } from '../../shared/model/forum/message.dto';
import { MessageTypeEnum } from '../../shared/model/forum/message-type.enum';
import { UserService } from '../../shared/service/user.service';

@Component({
    selector: 'app-forum-main',
    templateUrl: './forum-main.component.html',
    styleUrls: ['./forum-main.component.scss'],
})
export class ForumMainComponent implements OnInit {
    selectedForum: ForumDto = {} as ForumDto;
    message = new FormControl('');
    allMessage: MessageDto[] = [];

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
        this.messageService.getAllMessageSubject().subscribe(messages => (this.allMessage = messages));
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
}
