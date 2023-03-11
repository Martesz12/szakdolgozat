import { Injectable } from '@angular/core';
import { AuthenticationWebService } from './api/authentication/authentication-web.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationResponse } from '../model/authentication/authentication-response';
import { AuthenticationRequest } from '../model/authentication/authentication-request';
import { RegisterRequest } from '../model/authentication/register-request';
import { UserDto } from '../model/authentication/dto/user.dto';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private userId: number = 0;
    private token: string = '';

    constructor(private authenticationWebService: AuthenticationWebService, private router: Router) {}

    login(authRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
        return this.authenticationWebService.login(authRequest);
    }

    register(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
        return this.authenticationWebService.register(registerRequest);
    }

    logout(): void {
        this.authenticationWebService.logout().subscribe({
            next: (_) => {
                localStorage.clear();
                this.router.navigateByUrl('authentication/login');
            }
        });;
    }

    setToken(token: string): void {
        this.token = token;
    }

    getToken(): string {
        return this.token;
    }

    setUserId(userId: number): void {
        this.userId = userId;
    }

    getUserId(): number {
        return this.userId
    }
}
