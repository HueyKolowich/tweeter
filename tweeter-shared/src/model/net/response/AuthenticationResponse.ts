import { UserDto } from "../../dto/UserDto";
import { TweeterResponse } from "./TweeterResponse";

export interface AuthenticationResponse extends TweeterResponse {
    readonly userDto: UserDto
    readonly token: string
}