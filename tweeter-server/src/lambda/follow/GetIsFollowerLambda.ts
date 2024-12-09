import { FollowActionRequest, IsFollowerResponse, User } from 'tweeter-shared';
import { FollowService } from '../../model/service/FollowService';

export const handler = async (request: FollowActionRequest): Promise<IsFollowerResponse> => {
    const followService = new FollowService(User);
    const status = await followService.getIsFollowerStatus(request.token, request.userAlias, request.selectedUserAlias);

    return {
        success: true,
        message: null,
        status: status
    };
}