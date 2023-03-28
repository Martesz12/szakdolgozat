import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageDto } from '../../../shared/model/forum/message.dto';
import { UserDto } from '../../../shared/model/authentication/dto/user.dto';

@Component({
    selector: 'app-forum-main-pinned-messages',
    templateUrl: './forum-main-pinned-messages.component.html',
    styleUrls: ['./forum-main-pinned-messages.component.scss'],
})
export class ForumMainPinnedMessagesComponent implements OnInit {
    pinnedMessage: MessageDto[] = [];
    userMap: Map<number, UserDto> = new Map<number, UserDto>();
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { messages: MessageDto[]; userMap: Map<number, UserDto> }
    ) {
        this.userMap = data['userMap'];
        this.pinnedMessage = data['messages'].filter(message => message.pinned).reverse();
    }

    ngOnInit(): void {}
}
