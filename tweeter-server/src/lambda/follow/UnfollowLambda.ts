import { FollowActionRequest, TotalCountResponse, User } from 'tweeter-shared';
import { FollowService } from '../../model/service/FollowService';

export const handler = async (request: FollowActionRequest): Promise<TotalCountResponse> => {
    const followService = new FollowService(User);
    const [followerCount, followeeCount] = await followService.unfollow(request.token, request.selectedUserAlias);

    return {
        success: true,
        message: null,
        followerCount,
        followeeCount
    };
}