import { PagedItemRequest, PagedItemResponse, StatusDto, UserDto } from 'tweeter-shared';

export const handlePagedRequest = async <DtoType extends UserDto | StatusDto>(
    request: PagedItemRequest<DtoType>,
    serviceFunction: (token: string, userAlias: string, pageSize: number, lastItem: DtoType | null ) => Promise<[DtoType[], boolean]>
): Promise<PagedItemResponse<DtoType>> => {
    const [items, hasMore] = await serviceFunction(
        request.token,
        request.userAlias,
        request.pageSize,
        request.lastItem
    );

    return {
        success: true,
        message: null,
        items,
        hasMore,
    };
};
