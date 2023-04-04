import { Injectable } from '@angular/core';
import { filter, Observable, switchMap } from 'rxjs';
import { MessageDto } from '../../model/forum/message.dto';
import { MessageWebService } from '../api/forum/message-web.service';
import { ForumService } from './forum.service';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { UserService } from '../user.service';
import { UserDto } from '../../model/authentication/dto/user.dto';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    allMessage: MessageDto[] = [];
    userMap: Map<number, UserDto> = new Map<number, UserDto>();

    constructor(
        private messageWebService: MessageWebService,
        private forumService: ForumService,
        private userService: UserService
    ) {
        this.getAllMessage();
    }

    getAllMessage() {
        this.getAllMessageBySelectedForumId()
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
    }

    getAllMessageBySelectedForumId(): Observable<MessageDto[]> {
        return this.forumService.getSelectedForumSubject().pipe(
            filter(forum => !!Object.keys(forum).length),
            switchMap(forum => {
                return this.messageWebService.getMessagesByForumId(forum.id!);
            })
        );
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

    public stompClient: any;

    connectToActiveForumMessages() {
        const socket = new SockJS('http://localhost:8080/socket');
        this.stompClient = Stomp.over(socket);
        const _this = this;
        this.stompClient.connect({ Authorization: `Bearer ${this.userService.getToken()}` }, function (frame: any) {
            _this.stompClient.subscribe('/activeForumMessages', function (newMessageResponse: any) {
                let newMessage = JSON.parse(newMessageResponse.body) as MessageDto;
                let newMessageIndex = _this.allMessage.findIndex(message => message.id === newMessage.id);
                newMessageIndex === -1
                    ? _this.allMessage.unshift(newMessage)
                    : (_this.allMessage[newMessageIndex] = newMessage);
            });
        });
    }

    disconnectFromActiveForumMessages() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
    }

    sendMessageToActiveForum(newMessage: MessageDto) {
        this.stompClient.send(
            '/app/addMessageToActiveForum',
            { Authorization: `Bearer ${this.userService.getToken()}` },
            JSON.stringify({
                id: newMessage.id,
                pinned: newMessage.pinned,
                content: newMessage.content,
                dateOfUpload: newMessage.dateOfUpload,
                type: newMessage.type,
                userId: newMessage.userId,
                forumId: newMessage.forumId,
            })
        );
    }
}
