import { Role } from '../role.enum';

export class UserDto {
    public readonly id: number | null;
    public readonly firstname: string;
    public readonly lastname: string;
    public readonly appUsername: string;
    public readonly email: string;
    public readonly role: Role;

    constructor(
        id: number | null = null,
        firstname: string,
        lastname: string,
        appUsername: string,
        email: string,
        role: Role
    ) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.appUsername = appUsername;
        this.email = email;
        this.role = role;
    }
}
