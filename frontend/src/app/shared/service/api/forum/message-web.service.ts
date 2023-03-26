import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/shared/enum/api-path.enum';
import { MessageDto } from 'src/app/shared/model/forum/message.dto';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
    providedIn: 'root',
})
export class MessageWebService {
    private specificUrl: string = 'message/';

    constructor(private http: HttpClient, private userService: UserService) {}

    public stompClient: any;

    connectToActiveForumMessages() {
        const socket = new SockJS('http://localhost:8080/socket');
        this.stompClient = Stomp.over(socket);
        const _this = this;
        this.stompClient.connect({}, function (frame: any) {
            _this.stompClient.subscribe('/activeForumMessages', function (hello: any) {
                console.log(JSON.parse(hello.body) as MessageDto);
            });
        });
    }

    disconnectFromActiveForumMessages() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
    }

    sendMessageToActiveForum(newMessage: MessageDto) {
        console.log(newMessage);
        this.stompClient.send(
            '/app/addMessageToActiveForum',
            {},
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

    private buildFullPath(path: ApiPath): string {
        return environment.apiBaseUrl + this.specificUrl + path;
    }

    getAllMessage(): Observable<MessageDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindAll);
        return this.http.get<MessageDto[]>(fullPath, { headers: this.createHeader() });
    }

    getMessageById(messageId: number): Observable<MessageDto> {
        var fullPath = this.buildFullPath(ApiPath.FindById);
        fullPath += '/' + messageId;
        return this.http.get<MessageDto>(fullPath, { headers: this.createHeader() });
    }

    getMessagesByForumId(forumId: number): Observable<MessageDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindByForumId);
        fullPath += '/' + forumId;
        return this.http.get<MessageDto[]>(fullPath, { headers: this.createHeader() });
    }

    addMessage(message: MessageDto): Observable<MessageDto> {
        const fullPath = this.buildFullPath(ApiPath.Add);
        return this.http.post<MessageDto>(fullPath, message, { headers: this.createHeader() });
    }

    updateMessage(message: MessageDto): Observable<MessageDto> {
        const fullPath = this.buildFullPath(ApiPath.Update);
        return this.http.put<MessageDto>(fullPath, message, { headers: this.createHeader() });
    }

    deleteMessage(messageId: number): Observable<any> {
        var fullPath = this.buildFullPath(ApiPath.Delete);
        fullPath += '/' + messageId;
        return this.http.delete<any>(fullPath, { headers: this.createHeader() });
    }

    createHeader(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${this.userService.getToken()}`,
        });
    }
}
