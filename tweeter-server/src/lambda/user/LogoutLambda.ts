import { TweeterRequest } from 'tweeter-shared';
import { UserService } from '../../model/service/UserService';

export const handler = async (request: TweeterRequest): Promise<void> => {
    const userService = new UserService();
    await userService.logout(request.token);
}