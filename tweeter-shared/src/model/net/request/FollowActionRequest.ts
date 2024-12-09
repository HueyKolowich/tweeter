import { TweeterRequest } from "./TweeterRequest";

export interface FollowActionRequest extends TweeterRequest {
    readonly selectedUserAlias: string
}