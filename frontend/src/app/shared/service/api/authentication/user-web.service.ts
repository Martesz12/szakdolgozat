import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiPath } from 'src/app/shared/enum/api-path.enum';
import { environment } from 'src/environments/environment';
import { UserDto } from '../../../model/authentication/dto/user.dto';
import { Router } from '@angular/router';
import { AuthenticationModifyRequest } from '../../../model/authentication/authentication-modify-request';

@Injectable({
    providedIn: 'root',
})
export class UserWebService {
    private specificUrl: string = 'user/';

    constructor(private http: HttpClient, private router: Router) {}

    private buildFullPath(path: ApiPath): string {
        return environment.apiBaseUrl + this.specificUrl + path;
    }

    getUsersByIds(userIds: number[]): Observable<UserDto[]> {
        var fullPath = this.buildFullPath(ApiPath.FindUsersByIds);
        return this.http.post<UserDto[]>(fullPath, userIds, { headers: this.createHeader() }).pipe(
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

    getUserByToken(): Observable<UserDto> {
        var fullPath = this.buildFullPath(ApiPath.FindUserByToken);
        return this.http.post<UserDto>(fullPath, localStorage.getItem('token'), { headers: this.createHeader() }).pipe(
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

    modifyUserPreference(userDto: UserDto): Observable<UserDto> {
        var fullPath = this.buildFullPath(ApiPath.ModifyUserPreference);
        return this.http.post<UserDto>(fullPath, userDto, { headers: this.createHeader() }).pipe(
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

    modifyUserAuthenticationData(authenticationRequest: AuthenticationModifyRequest): Observable<UserDto> {
        var fullPath = this.buildFullPath(ApiPath.ModifyUserAuthenticationData);
        return this.http.post<UserDto>(fullPath, authenticationRequest, { headers: this.createHeader() }).pipe(
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
        let token = localStorage.getItem('token');
        return new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
    }
}
