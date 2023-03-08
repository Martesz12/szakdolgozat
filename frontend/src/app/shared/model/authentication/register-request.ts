export class RegisterRequest {
    private readonly firstname: string;
    private readonly lastname: string;
    private readonly appUsername: string;
    private readonly email: string;
    private readonly password: string;

    constructor(firstname: string, lastname: string, appUsername: string, email: string, password: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.appUsername = appUsername;
        this.email = email;
        this.password = password;
    }
}