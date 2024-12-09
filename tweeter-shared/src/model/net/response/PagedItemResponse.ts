import { TweeterResponse } from "./TweeterResponse";

export interface PagedItemResponse<DtoType> extends TweeterResponse {
    readonly items: DtoType[] | null
    readonly hasMore: boolean
}