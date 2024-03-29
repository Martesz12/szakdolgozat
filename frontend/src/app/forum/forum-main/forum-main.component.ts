import { Component, OnDestroy, OnInit } from '@angular/core';
import { ForumService } from '../../shared/service/forum/forum.service';
import { ForumDto } from '../../shared/model/forum/forum.dto';
import { FormControl } from '@angular/forms';
import { MessageService } from '../../shared/service/forum/message.service';
import { MessageDto } from '../../shared/model/forum/message.dto';
import { MessageTypeEnum } from '../../shared/model/forum/message-type.enum';
import { UserService } from '../../shared/service/user.service';
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
import { SnackBarService } from '../../shared/service/snack-bar.service';

@Component({
    selector: 'app-forum-main',
    templateUrl: './forum-main.component.html',
    styleUrls: ['./forum-main.component.scss'],
})
export class ForumMainComponent implements OnInit, OnDestroy {
    selectedForum: ForumDto = {} as ForumDto;
    message = new FormControl('');
    selectedForumUniversity: UniversityDto = {} as UniversityDto;
    selectedForumMajors: MajorDto[] = [];
    selectedForumFaculties: FacultyDto[] = [];

    isForumSelected: boolean = false;

    isFileSelectionDisplayed: boolean = false;
    messageFile: File | null = null;
    currentUserId: number | null = null;

    constructor(
        private forumService: ForumService,
        public messageService: MessageService,
        private userService: UserService,
        private universtiyService: UniversityService,
        private majorService: MajorService,
        private facultyService: FacultyService,
        public dialog: MatDialog,
        public fileWebService: FileWebService,
        private snackBarService: SnackBarService
    ) {}

    ngOnInit(): void {
        this.messageService.connectToActiveForumMessages();
        this.getSelectedForum();
        this.checkForumSelected();
        this.userService.getUserByToken().subscribe(user => (this.currentUserId = user.id!));
    }

    ngOnDestroy(): void {
        this.messageService.disconnectFromActiveForumMessages();
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

    checkForumSelected() {
        this.forumService.getSelectedForumSubject().subscribe(forum => {
            this.isForumSelected = !!Object.keys(forum).length;
        });
    }

    sendMessage() {
        if (this.currentUserId) {
            if (this.message.value !== '' && !this.isFileSelectionDisplayed) {
                let message = this.createMessage(MessageTypeEnum.MESSAGE, this.message.value!);
                this.messageService.addMessage(message).subscribe({
                    next: message => {
                        this.message.setValue('');
                        this.messageService.sendMessageToActiveForum(message);
                    },
                    error: _ => {
                        this.snackBarService.errorSnackBar('Hiba üzenet elküldése során!');
                    },
                });
            } else if (this.messageFile) {
                if (this.checkFileSize(this.messageFile)) return;
                let messageType = this.getMessageType(this.messageFile.type);
                if (!messageType) return;
                let message = this.createMessage(messageType!, this.messageFile.name);
                this.messageService
                    .addMessage(message)
                    .pipe(
                        switchMap(newMessage => {
                            message = newMessage;
                            return this.fileWebService.uploadMessageFile(this.messageFile!);
                        })
                    )
                    .subscribe({
                        next: _ => {
                            this.setFileSelection();
                            this.messageService.sendMessageToActiveForum(message);
                        },
                        error: err => {
                            this.snackBarService.errorSnackBar('Hiba a kép feltöltése során!');
                            this.messageService.deleteMessage(message.id!).subscribe();
                        },
                    });
            } else {
                this.snackBarService.errorSnackBar('Hiba az üzenet elküldése során!');
            }
        } else {
            this.snackBarService.errorSnackBar('Hiba üzenet elküldése során: Felhasználó ismeretlen');
        }
    }

    private checkFileSize(messageFile: File): boolean {
        if (messageFile.size > 500000) {
            this.snackBarService.errorSnackBar(
                'A fájl mérete túl nagy! Legfejlebb 500KB méretű fájl feltöltése támogatott!'
            );
            return true;
        }
        return false;
    }

    private createMessage(type: MessageTypeEnum, content: string) {
        return new MessageDto(false, content, type, new Date(), this.currentUserId!, this.selectedForum.id!);
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
                this.messageService.sendMessageToActiveForum(message);
            },
            error: _ => {
                this.snackBarService.errorSnackBar('Hiba üzenet kitűzése során!');
            },
        });
    }

    openPinnedMessages(): void {
        this.dialog.open(ForumMainPinnedMessagesComponent, {
            data: { messages: this.messageService.allMessage, userMap: this.messageService.userMap },
            width: '700px',
            height: '500px',
        });
    }

    onFileSelected($event: any) {
        [this.messageFile] = $event.target.files;
    }

    setFileSelection(): void {
        if (!this.isFileSelectionDisplayed) this.message.disable();
        if (this.isFileSelectionDisplayed) {
            this.messageFile = null;
            this.message.enable();
        }
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

    private getMessageType(type: string): MessageTypeEnum | null {
        let fileType = type.split('/')[0];
        if (fileType === 'image') return MessageTypeEnum.IMAGE;
        else if (fileType === 'application' || fileType === 'text') return MessageTypeEnum.FILE;
        else {
            this.snackBarService.errorSnackBar('Ez a fájlformátum nem támogatott!');
            return null;
        }
    }
}
