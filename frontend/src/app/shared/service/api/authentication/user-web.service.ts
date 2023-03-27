import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/shared/enum/api-path.enum';
import { environment } from 'src/environments/environment';
import { UserDto } from '../../../model/authentication/dto/user.dto';

@Injectable({
    providedIn: 'root',
})
export class UserWebService {
    private specificUrl: string = 'user/';

    constructor(private http: HttpClient) {}

    private buildFullPath(path: ApiPath): string {
        return environment.apiBaseUrl + this.specificUrl + path;
    }

    getUsersByIds(userIds: number[]): Observable<UserDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindUsersByIds);
        return this.http.post<UserDto[]>(fullPath, userIds, { headers: this.createHeader() });
    }

    createHeader(): HttpHeaders {
        let token = localStorage.getItem('token');
        return new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
    }
}
