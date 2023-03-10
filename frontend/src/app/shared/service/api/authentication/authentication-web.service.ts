import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/app/shared/enum/api-path.enum';
import { AuthenticationRequest } from 'src/app/shared/model/authentication/authentication-request';
import { AuthenticationResponse } from 'src/app/shared/model/authentication/authentication-response';
import { RegisterRequest } from 'src/app/shared/model/authentication/register-request';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationWebService {
    private specificUrl: string = 'authentication/';

    constructor(private http: HttpClient) {}

    private buildFullPath(path: ApiPath): string {
        return environment.apiBaseUrl + this.specificUrl + path;
    }

    login(authRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
        const fullPath = this.buildFullPath(ApiPath.Authenticate);
        return this.http.post<AuthenticationResponse>(fullPath, authRequest);
    }

    register(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
        const fullPath = this.buildFullPath(ApiPath.Register);
        return this.http.post<AuthenticationResponse>(fullPath, registerRequest);
    }

    logout(): Observable<void> {
        const fullPath = this.buildFullPath(ApiPath.Logout);
        return this.http.get<void>(fullPath, { headers: this.createHeader() });
    }

    createHeader(): HttpHeaders {
        let token = localStorage.getItem('token');
        console.log(token);
        if (token)
            return new HttpHeaders({
                Authorization: `Bearer ${token}`,
            });
        return new HttpHeaders();
    }
}
