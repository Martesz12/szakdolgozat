import { Injectable } from '@angular/core';
import { AuthenticationWebService } from './api/authentication/authentication-web.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationResponse } from '../model/authentication/authentication-response';
import { AuthenticationRequest } from '../model/authentication/authentication-request';
import { RegisterRequest } from '../model/authentication/register-request';
import { UserDto } from '../model/authentication/dto/user.dto';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    userSubject: BehaviorSubject<UserDto> = new BehaviorSubject<UserDto>({} as UserDto);
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor(private authenticationWebService: AuthenticationWebService) {}

    login(authRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
        return this.authenticationWebService.login(authRequest);
    }

    register(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
        return this.authenticationWebService.register(registerRequest);
    }

    setToken(token: string): void {
        this.tokenSubject.next(token);
    }

    getToken(): Observable<string> {
        return this.tokenSubject.asObservable();
    }

    setUser(user: UserDto): void {
        this.userSubject.next(user);
    }

    getUser(): Observable<UserDto> {
        return this.userSubject.asObservable();
    }
}
