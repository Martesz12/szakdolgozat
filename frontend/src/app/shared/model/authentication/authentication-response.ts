import { UserDto } from "./dto/user.dto";

export class AuthenticationResponse {
    private readonly token: string;
    private readonly userDto: UserDto;

    constructor(token: string, userDto: UserDto) {
        this.token = token;
        this.userDto = {...userDto};
    }
}