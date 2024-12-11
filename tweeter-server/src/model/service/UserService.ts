import { FakeData, UserDto } from "tweeter-shared";
import { Buffer } from "buffer";

export class UserService {
    public async getUser(
        token: string,
        userAlias: string
    ): Promise<UserDto | null> {
        return FakeData.instance.findUserByAlias(userAlias)?.dto ?? null;
    };

    public async login(
        userAlias: string,
        password: string
      ): Promise<[UserDto, string]> {
        return this.findUserAndReturnAuthData("Invalid alias or password")
    };

    public async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        imageStringBase64: string,
        imageFileExtension: string
      ): Promise<[UserDto, string]> {    
        return this.findUserAndReturnAuthData("Invalid Registration");
    };

    public async logout(token: string): Promise<void> {
        console.log('Nothing to do yet... or see here...');
    };

    private async findUserAndReturnAuthData(errorMessage: string): Promise<[UserDto, string]> {
        const user = FakeData.instance.firstUser;
    
        if (user === null) {
          throw new Error(errorMessage);
        }
    
        return [user.dto, FakeData.instance.authToken.token];
    }
}