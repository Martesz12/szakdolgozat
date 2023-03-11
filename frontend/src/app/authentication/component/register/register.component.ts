import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/shared/model/authentication/register-request';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    email = new FormControl('');
    password = new FormControl('');
    passwordAgain = new FormControl('');
    firstname = new FormControl('');
    lastname = new FormControl('');
    username = new FormControl('');
    arePasswordsEqual: boolean = true;

    constructor(private userService: UserService, private snackBar: MatSnackBar, private router: Router) {}

    ngOnInit(): void {
        this.addValidators();
    }

    addValidators(): void {
        this.email?.addValidators([Validators.required, Validators.maxLength(255), Validators.email]);
        this.password?.addValidators([Validators.required, Validators.maxLength(255)]);
        this.passwordAgain?.addValidators([
            Validators.required,
            Validators.maxLength(255),
            this.passwrodsEqualValidator(),
        ]);
        this.firstname?.addValidators([Validators.required, Validators.maxLength(255)]);
        this.lastname?.addValidators([Validators.required, Validators.maxLength(255)]);
        this.username?.addValidators([Validators.required, Validators.maxLength(255)]);
    }

    register(): void {
        if (
            this.email.valid &&
            this.password.valid &&
            this.passwordAgain.valid &&
            this.firstname.valid &&
            this.lastname.valid &&
            this.username.valid
        ) {
            let registerRequest = this.createRegisterRequest();
            this.userService.register(registerRequest).subscribe({
                next: response => {
                    this.snackBar.open('Sikeres regisztráció!', 'X', {
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['info-snackbar'],
                    });
                    this.router.navigateByUrl('authentication/login');
                },
                error: error => {
                    this.snackBar.open('Hiba regisztráció során: ' + error, 'X', {
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                        panelClass: ['error-snackbar'],
                    });
                },
            });
        } else {
            if (this.email.invalid) this.email.markAsTouched();
            if (this.password.invalid) this.password.markAsTouched();
            if (this.passwordAgain.invalid) this.passwordAgain.markAsTouched();
            if (this.firstname.invalid) this.firstname.markAsTouched();
            if (this.lastname.invalid) this.lastname.markAsTouched();
            if (this.username.invalid) this.username.markAsTouched();
        }
    }

    createRegisterRequest(): RegisterRequest {
        return new RegisterRequest(
            this.firstname.value!,
            this.lastname.value!,
            this.username.value!,
            this.email.value!,
            this.password.value!
        );
    }

    passwrodsEqualValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return this.password.value === this.passwordAgain.value
                ? null
                : { passwordsAreEqual: { value: control.value } };
        };
    }
}
