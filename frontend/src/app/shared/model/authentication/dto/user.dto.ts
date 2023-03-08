import { Role } from "../role.enum";

export class UserDto {
    private readonly id: number | null;
    private readonly firstname: string;
    private readonly lastname: string;
    private readonly appUsername: string;
    private readonly email: string;
    private readonly role: Role;

    constructor(id: number | null = null, firstname: string, lastname: string, appUsername: string, email: string, role: Role) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.appUsername = appUsername;
        this.email = email;
        this.role = role;
    }
}
