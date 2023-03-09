import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
    constructor(public router: Router) {}

    canActivate(): boolean {
        let token = localStorage.getItem('token');
        if (token) {
            return true;
        }
        this.router.navigateByUrl('authentication/login');
        return false;
    }
}
