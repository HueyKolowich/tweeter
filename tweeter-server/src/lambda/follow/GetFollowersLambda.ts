import { PagedItemRequest, PagedItemResponse, User, UserDto } from 'tweeter-shared';
import { FollowService } from '../../model/service/FollowService';
import { handlePagedRequest } from '../util/HandlePagedRequest';

export const handler = async (request: PagedItemRequest<UserDto>): Promise<PagedItemResponse<UserDto>> => {
    const followService = new FollowService(User);
    return handlePagedRequest(request, followService.loadMoreFollowers.bind(followService));
}