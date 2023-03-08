export class RegisterRequest {
    public readonly firstname: string;
    public readonly lastname: string;
    public readonly appUsername: string;
    public readonly email: string;
    public readonly password: string;

    constructor(firstname: string, lastname: string, appUsername: string, email: string, password: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.appUsername = appUsername;
        this.email = email;
        this.password = password;
    }
}