import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, switchMap } from 'rxjs';
import { MessageDto } from '../../model/forum/message.dto';
import { MessageWebService } from '../api/forum/message-web.service';
import { ForumService } from './forum.service';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    allMessageSubject: BehaviorSubject<MessageDto[]> = new BehaviorSubject<MessageDto[]>([]);

    constructor(private messageWebService: MessageWebService, private forumService: ForumService) {
        this.getAllMessage();
    }

    getAllMessage() {
        this.getAllMessageBySelectedForumId().subscribe(messages => {
            this.allMessageSubject.next(messages);
        });
    }

    getAllMessageBySelectedForumId(): Observable<MessageDto[]> {
        return this.forumService.getSelectedForumSubject().pipe(
            filter(forum => !!Object.keys(forum).length),
            switchMap(forum => {
                return this.messageWebService.getMessagesByForumId(forum.id!);
            })
        );
    }

    getAllMessageSubject(): Observable<MessageDto[]> {
        return this.allMessageSubject.asObservable();
    }

    addMessage(message: MessageDto): Observable<MessageDto> {
        return this.messageWebService.addMessage(message);
    }

    deleteMessage(messageId: number) {
        return this.messageWebService.deleteMessage(messageId);
    }

    updateMessage(message: MessageDto): Observable<MessageDto> {
        return this.messageWebService.updateMessage(message);
    }

    getMessageById(id: number): Observable<MessageDto> {
        return this.messageWebService.getMessageById(id);
    }

    resetMessageState(afterDelete: boolean = false): void {
        if (afterDelete) this.getAllMessage();
    }

    connectToActiveForumMessages(): void {
        this.messageWebService.connectToActiveForumMessages();
    }

    disconnectFromActiveForumMessages(): void {
        this.messageWebService.disconnectFromActiveForumMessages();
    }

    sendMessageToActiveForum(message: MessageDto): void {
        this.messageWebService.sendMessageToActiveForum(message);
    }
}
