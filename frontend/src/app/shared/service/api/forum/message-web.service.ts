import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiPath } from 'src/app/shared/enum/api-path.enum';
import { MessageDto } from 'src/app/shared/model/forum/message.dto';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class MessageWebService {
    private specificUrl: string = 'message/';

    constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

    private buildFullPath(path: ApiPath): string {
        return environment.apiBaseUrl + this.specificUrl + path;
    }

    getAllMessage(): Observable<MessageDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindAll);
        return this.http.get<MessageDto[]>(fullPath, { headers: this.createHeader() }).pipe(
            catchError(err => {
                if (err.status === 403) {
                    localStorage.clear();
                    this.router.navigateByUrl('authentication/login');
                    throw 'Authentication error';
                }
                throw err;
            })
        );
    }

    getMessageById(messageId: number): Observable<MessageDto> {
        var fullPath = this.buildFullPath(ApiPath.FindById);
        fullPath += '/' + messageId;
        return this.http.get<MessageDto>(fullPath, { headers: this.createHeader() }).pipe(
            catchError(err => {
                if (err.status === 403) {
                    localStorage.clear();
                    this.router.navigateByUrl('authentication/login');
                    throw 'Authentication error';
                }
                throw err;
            })
        );
    }

    getMessagesByForumId(forumId: number): Observable<MessageDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindByForumId);
        fullPath += '/' + forumId;
        return this.http.get<MessageDto[]>(fullPath, { headers: this.createHeader() }).pipe(
            catchError(err => {
                if (err.status === 403) {
                    localStorage.clear();
                    this.router.navigateByUrl('authentication/login');
                    throw 'Authentication error';
                }
                throw err;
            })
        );
    }

    addMessage(message: MessageDto): Observable<MessageDto> {
        const fullPath = this.buildFullPath(ApiPath.Add);
        return this.http.post<MessageDto>(fullPath, message, { headers: this.createHeader() }).pipe(
            catchError(err => {
                if (err.status === 403) {
                    localStorage.clear();
                    this.router.navigateByUrl('authentication/login');
                    throw 'Authentication error';
                }
                throw err;
            })
        );
    }

    updateMessage(message: MessageDto): Observable<MessageDto> {
        const fullPath = this.buildFullPath(ApiPath.Update);
        return this.http.put<MessageDto>(fullPath, message, { headers: this.createHeader() }).pipe(
            catchError(err => {
                if (err.status === 403) {
                    localStorage.clear();
                    this.router.navigateByUrl('authentication/login');
                    throw 'Authentication error';
                }
                throw err;
            })
        );
    }

    deleteMessage(messageId: number): Observable<any> {
        var fullPath = this.buildFullPath(ApiPath.Delete);
        fullPath += '/' + messageId;
        return this.http.delete<any>(fullPath, { headers: this.createHeader() }).pipe(
            catchError(err => {
                if (err.status === 403) {
                    localStorage.clear();
                    this.router.navigateByUrl('authentication/login');
                    throw 'Authentication error';
                }
                throw err;
            })
        );
    }

    createHeader(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${this.userService.getToken()}`,
        });
    }
}
