import { TweeterRequest } from "./TweeterRequest";

export interface PagedItemRequest<DtoType> extends TweeterRequest {
    readonly userAlias: string
    readonly pageSize: number
    readonly lastItem: DtoType | null
}