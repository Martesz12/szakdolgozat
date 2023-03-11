export class AuthenticationRequest {
    public readonly email: string;
    public readonly password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
