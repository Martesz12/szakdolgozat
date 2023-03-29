import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AdminAuthGuardService implements CanActivate {
    constructor(public router: Router, public userService: UserService) {}

    canActivate(): Observable<boolean> {
        return this.userService.isUserAdmin();
    }
}
