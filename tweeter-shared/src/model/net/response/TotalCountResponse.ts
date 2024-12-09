import { TweeterResponse } from "./TweeterResponse";

export interface TotalCountResponse extends TweeterResponse {
    readonly followerCount: number
    readonly followeeCount: number
}