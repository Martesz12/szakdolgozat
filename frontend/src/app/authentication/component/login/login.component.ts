import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    email = new FormControl('');
    password = new FormControl('');

    constructor() {}

    ngOnInit(): void {
        this.addValidators();
    }

    addValidators(): void {
        this.email?.addValidators(Validators.required);
        this.password?.addValidators(Validators.required);
    }

    login(): void {
        if (this.email.valid && this.password.valid) {
            let user = this.createUser();
        } else {
            if (this.email.invalid) this.email.markAsTouched();
            if (this.password.invalid) this.password.markAsTouched();
        }
    }

    createUser(): void {

    }
}
