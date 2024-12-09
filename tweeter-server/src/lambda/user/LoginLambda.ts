import { UserService } from '../../model/service/UserService';
import { AuthenticationResponse, LoginRequest } from 'tweeter-shared';

export const handler = async (request: LoginRequest): Promise<AuthenticationResponse> => {
    const userService = new UserService();
    const [userDto, token] = await userService.login(request.userAlias, request.password);

    return {
        success: true,
        message: null,
        userDto,
        token
    };
}