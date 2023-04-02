export class AuthenticationModifyRequest {
    public readonly newEmail: string;
    public readonly oldEmail: string;
    public readonly password: string;

    constructor(oldEmail: string, newEmail: string, password: string) {
        this.oldEmail = oldEmail;
        this.password = password;
        this.newEmail = newEmail;
    }
}
