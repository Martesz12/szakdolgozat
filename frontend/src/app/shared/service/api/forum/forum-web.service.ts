import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/shared/enum/api-path.enum';
import { ForumDto } from 'src/app/shared/model/forum/forum.dto';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user.service';

@Injectable({
    providedIn: 'root',
})
export class ForumWebService {
    private specificUrl: string = 'forum/';

    constructor(private http: HttpClient, private userService: UserService) {}

    private buildFullPath(path: ApiPath): string {
        return environment.apiBaseUrl + this.specificUrl + path;
    }

    getAllForum(): Observable<ForumDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindAll);
        return this.http.get<ForumDto[]>(fullPath, { headers: this.createHeader() });
    }

    getForumById(forumId: number): Observable<ForumDto> {
        var fullPath = this.buildFullPath(ApiPath.FindById);
        fullPath += '/' + forumId;
        return this.http.get<ForumDto>(fullPath, { headers: this.createHeader() });
    }

    addForum(forum: ForumDto): Observable<ForumDto> {
        const fullPath = this.buildFullPath(ApiPath.Add);
        return this.http.post<ForumDto>(fullPath, forum, { headers: this.createHeader() });
    }

    updateForum(forum: ForumDto): Observable<ForumDto> {
        const fullPath = this.buildFullPath(ApiPath.Update);
        return this.http.put<ForumDto>(fullPath, forum, { headers: this.createHeader() });
    }

    deleteForum(forumId: number): Observable<any> {
        var fullPath = this.buildFullPath(ApiPath.Delete);
        fullPath += '/' + forumId;
        return this.http.delete<any>(fullPath, { headers: this.createHeader() });
    }

    createHeader(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${this.userService.getToken()}`,
        });
    }
}
