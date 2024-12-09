import { TweeterRequest } from "./TweeterRequest";

export interface IsFollowerRequest extends TweeterRequest {
    readonly userAlias: string
    readonly selectedUserAlias: string
}