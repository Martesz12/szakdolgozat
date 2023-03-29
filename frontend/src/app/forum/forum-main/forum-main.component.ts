import { Component, OnDestroy, OnInit } from '@angular/core';
import { ForumService } from '../../shared/service/forum/forum.service';
import { ForumDto } from '../../shared/model/forum/forum.dto';
import { FormControl } from '@angular/forms';
import { MessageService } from '../../shared/service/forum/message.service';
import { MessageDto } from '../../shared/model/forum/message.dto';
import { MessageTypeEnum } from '../../shared/model/forum/message-type.enum';
import { UserService } from '../../shared/service/user.service';
import { UserDto } from '../../shared/model/authentication/dto/user.dto';
import { filter, forkJoin, switchMap } from 'rxjs';
import { UniversityDto } from '../../shared/model/forum/university.dto';
import { MajorDto } from '../../shared/model/forum/major.dto';
import { FacultyDto } from '../../shared/model/forum/faculty.dto';
import { UniversityService } from '../../shared/service/forum/university.service';
import { MajorService } from '../../shared/service/forum/major.service';
import { FacultyService } from '../../shared/service/forum/faculty.service';
import { MatDialog } from '@angular/material/dialog';
import { ForumMainPinnedMessagesComponent } from './forum-main-pinned-messages/forum-main-pinned-messages.component';
import { FileWebService } from '../../shared/service/api/file-web.service';

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

    selectedForumUniversity: UniversityDto = {} as UniversityDto;
    selectedForumMajors: MajorDto[] = [];
    selectedForumFaculties: FacultyDto[] = [];

    isForumSelected: boolean = false;

    isFileSelectionDisplayed: boolean = false;
    messageFile: File | null = null;
    imgUrl: string = '';
    imgBlob: Blob = new Blob();

    constructor(
        private forumService: ForumService,
        private messageService: MessageService,
        private userService: UserService,
        private universtiyService: UniversityService,
        private majorService: MajorService,
        private facultyService: FacultyService,
        public dialog: MatDialog,
        public fileWebService: FileWebService
    ) {}

    ngOnInit(): void {
        this.getSelectedForum();
        this.getMessages();
        this.checkForumSelected();
    }

    ngOnDestroy(): void {
        this.forumService.selectForum(0);
    }

    getSelectedForum(): void {
        this.forumService
            .getSelectedForumSubject()
            .pipe(
                filter(forum => !!Object.keys(forum).length),
                switchMap(forum => {
                    this.selectedForum = forum;
                    return forkJoin([
                        this.universtiyService.getUniversityById(forum.universityId),
                        this.majorService.getMajorsByIds(forum.majorIds),
                        this.facultyService.getFacultiesByIds(forum.facultyIds),
                    ]);
                })
            )
            .subscribe(data => {
                this.selectedForumUniversity = data[0];
                this.selectedForumMajors = data[1];
                this.selectedForumFaculties = data[2];
            });
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

    checkForumSelected() {
        this.forumService.getSelectedForumSubject().subscribe(forum => {
            this.isForumSelected = !!Object.keys(forum).length;
        });
    }

    sendMessage() {
        if (this.message.value !== '' && !this.isFileSelectionDisplayed) {
            let message = this.createMessage(MessageTypeEnum.MESSAGE, this.message.value!);
            this.messageService.addMessage(message).subscribe({
                next: message => {
                    this.message.setValue('');
                    console.log('message sent');
                },
                error: _ => {
                    console.error('message error');
                },
            });
        } else {
            if (this.messageFile) {
                let fileType = this.messageFile.type.split('/')[0];
                let messageType;
                if (fileType === 'image') messageType = MessageTypeEnum.IMAGE;
                else if (fileType === 'application') messageType = MessageTypeEnum.FILE;
                else return; //TODO error msg nem támogatott formátum
                let message = this.createMessage(messageType, this.messageFile.name);
                this.messageService
                    .addMessage(message)
                    .pipe(switchMap(_ => this.fileWebService.uploadMessageFile(this.messageFile!)))
                    .subscribe(_ => {
                        console.log('file uploaded');
                    });
            }
        }
    }

    private createMessage(type: MessageTypeEnum, content: string) {
        return new MessageDto(false, content, type, new Date(), this.userService.getUserId(), this.selectedForum.id!);
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

    openPinnedMessages(): void {
        this.dialog.open(ForumMainPinnedMessagesComponent, {
            data: { messages: this.allMessage, userMap: this.userMap },
            width: '700px',
            height: '500px',
        });
    }

    onFileSelected($event: any) {
        console.log($event.target.files[0]);
        this.messageFile = $event.target.files[0];
    }

    imageToShow: any = null;
    result: any;

    setFileSelection(): void {
        if (!this.isFileSelectionDisplayed) this.message.disable();
        if (this.isFileSelectionDisplayed) this.message.enable();
        this.isFileSelectionDisplayed = !this.isFileSelectionDisplayed;
    }

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
