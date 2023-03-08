import { Injectable } from "@angular/core";
import { AuthenticationWebService } from "./api/authentication/authentication-web.service";
import { Observable } from "rxjs";
import { AuthenticationResponse } from "../model/authentication/authentication-response";
import { AuthenticationRequest } from "../model/authentication/authentication-request";
import { RegisterRequest } from "../model/authentication/register-request";


@Injectable({
    providedIn: 'root',
})
export class UserService {
    

    constructor(private authenticationWebService: AuthenticationWebService) {
        
    }

    login(authRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
        return this.authenticationWebService.login(authRequest);
    }

    register(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
        return this.authenticationWebService.register(registerRequest);
    }
}
