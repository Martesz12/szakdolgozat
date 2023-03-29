import { Injectable } from '@angular/core';
import { AuthenticationWebService } from './api/authentication/authentication-web.service';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../model/authentication/authentication-response';
import { AuthenticationRequest } from '../model/authentication/authentication-request';
import { RegisterRequest } from '../model/authentication/register-request';
import { UserDto } from '../model/authentication/dto/user.dto';
import { Router } from '@angular/router';
import { UserWebService } from './api/authentication/user-web.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private token: string = '';

    constructor(
        private authenticationWebService: AuthenticationWebService,
        private router: Router,
        private userWebService: UserWebService
    ) {}

    login(authRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
        return this.authenticationWebService.login(authRequest);
    }

    register(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
        return this.authenticationWebService.register(registerRequest);
    }

    logout(): void {
        this.authenticationWebService.logout().subscribe({
            next: _ => {
                localStorage.clear();
                this.router.navigateByUrl('authentication/login');
            },
        });
    }

    setToken(token: string): void {
        this.token = token;
    }

    getToken(): string {
        return this.token;
    }

    getUsersByIds(userIds: number[]): Observable<UserDto[]> {
        return this.userWebService.getUsersByIds(userIds);
    }

    getUserByToken(): Observable<UserDto> {
        return this.userWebService.getUserByToken();
    }
}
