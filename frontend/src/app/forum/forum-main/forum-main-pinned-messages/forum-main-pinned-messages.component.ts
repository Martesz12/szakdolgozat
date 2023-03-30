import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageDto } from '../../../shared/model/forum/message.dto';
import { UserDto } from '../../../shared/model/authentication/dto/user.dto';
import { FileWebService } from '../../../shared/service/api/file-web.service';

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
        public data: { messages: MessageDto[]; userMap: Map<number, UserDto> },
        public fileWebService: FileWebService
    ) {
        this.userMap = data['userMap'];
        this.pinnedMessage = data['messages'].filter(message => message.pinned).reverse();
    }

    ngOnInit(): void {}

    downloadFile(fileName: string): void {
        this.fileWebService.getMessageFile(fileName).subscribe(file => {
            const elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(file);
            elem.download = fileName;
            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);
        });
    }
}
