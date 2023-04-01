import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/shared/model/authentication/authentication-request';
import { UserService } from 'src/app/shared/service/user.service';
import { SnackBarService } from '../../../shared/service/snack-bar.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    email = new FormControl('');
    password = new FormControl('');

    constructor(private userService: UserService, private snackBarService: SnackBarService, private router: Router) {}

    ngOnInit(): void {
        this.addValidators();
    }

    addValidators(): void {
        this.email?.addValidators(Validators.required);
        this.password?.addValidators(Validators.required);
    }

    login(): void {
        if (this.email.valid && this.password.valid) {
            let authRequest = this.createAuthenticationRequest();
            this.userService.login(authRequest).subscribe({
                next: response => {
                    this.userService.setToken(response.token);
                    localStorage.setItem('token', response.token);
                    this.router.navigateByUrl('timetable/timetable-daily');
                },
                error: error => {
                    this.snackBarService.errorSnackBar('Hiba bejelentkezés során!');
                },
            });
        } else {
            if (this.email.invalid) this.email.markAsTouched();
            if (this.password.invalid) this.password.markAsTouched();
        }
    }

    createAuthenticationRequest(): AuthenticationRequest {
        return new AuthenticationRequest(this.email.value!, this.password.value!);
    }
}
