export class AuthenticationRequest {
    private readonly email: string;
    private readonly password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}