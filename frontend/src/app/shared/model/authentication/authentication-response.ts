import { UserDto } from './dto/user.dto';

export class AuthenticationResponse {
    public readonly token: string;
    public readonly userDto: UserDto;

    constructor(token: string, userDto: UserDto) {
        this.token = token;
        this.userDto = userDto;
    }
}
