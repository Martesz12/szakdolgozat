import { Role } from '../role.enum';

export class UserDto {
    public readonly id: number | null;
    public readonly firstname: string;
    public readonly lastname: string;
    public readonly appUsername: string;
    public readonly email: string;
    public readonly role: Role;
    public readonly timetablePreference: number | null;
    public readonly universityPreference: number | null;
    public readonly facultiesPreference: number[] | null;
    public readonly majorsPreference: number[] | null;

    constructor(
        id: number | null = null,
        firstname: string,
        lastname: string,
        appUsername: string,
        email: string,
        role: Role,
        timetablePreference: number | null,
        universityPreference: number | null,
        facultiesPreference: number[] | null,
        majorsPreference: number[] | null
    ) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.appUsername = appUsername;
        this.email = email;
        this.role = role;
        this.timetablePreference = timetablePreference;
        this.universityPreference = universityPreference;
        this.facultiesPreference = facultiesPreference;
        this.majorsPreference = majorsPreference;
    }
}
