import { UserService } from '../../model/service/UserService';
import { AuthenticationResponse, RegisterRequest } from 'tweeter-shared';

export const handler = async (request: RegisterRequest): Promise<AuthenticationResponse> => {
    const userService = new UserService();
    const [userDto, token] = await userService.register(
        request.firstName,
        request.lastName,
        request.userAlias, 
        request.password,
        request.imageStringBase64,
        request.imageFileExtension
    );

    return {
        success: true,
        message: null,
        userDto,
        token
    };
}