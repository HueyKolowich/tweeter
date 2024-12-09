import { TweeterRequest } from "./TweeterRequest";

export interface PagedItemRequest<DtoType> extends TweeterRequest {
    readonly pageSize: number
    readonly lastItem: DtoType | null
}