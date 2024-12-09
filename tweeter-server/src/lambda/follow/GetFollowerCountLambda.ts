import { CountResponse, TweeterRequest, User } from 'tweeter-shared';
import { FollowService } from '../../model/service/FollowService';

export const handler = async (request: TweeterRequest): Promise<CountResponse> => {
    const followService = new FollowService(User);
    const count = await followService.getFollowerCount(request.token, request.userAlias);

    return {
        success: true,
        message: null,
        count: count
    };
}