import { CountResponse, User } from 'tweeter-shared';
import { FollowService } from '../../model/service/FollowService';
import { TweeterRequest } from 'tweeter-shared/dist/model/net/request/TweeterRequest';

export const handler = async (request: TweeterRequest): Promise<CountResponse> => {
    const followService = new FollowService(User);
    const count = await followService.getFollowerCount(request.token, request.userAlias);

    return {
        success: true,
        message: null,
        count: count
    };
}