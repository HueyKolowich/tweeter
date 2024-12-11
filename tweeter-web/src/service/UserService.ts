import { AuthToken, User } from "tweeter-shared";
import { Buffer } from "buffer";
import { ServerFacade } from "../net/ServerFacade";

export class UserService {
    private serverFacade = new ServerFacade();

    public async getUser(
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> {
        const tweeterRequest = {
          token: authToken.token,
          userAlias: alias
        }
        return this.serverFacade.getUser(tweeterRequest);
    };

    public async login(
        alias: string,
        password: string
      ): Promise<[User, AuthToken]> {
        const loginRequest = {
          userAlias: alias,
          password: password
        }
        return this.serverFacade.login(loginRequest);
    };

    public async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array,
        imageFileExtension: string
      ): Promise<[User, AuthToken]> {
        const imageStringBase64: string =
          Buffer.from(userImageBytes).toString("base64");
    
          const registerRequest = {
            firstName: firstName,
            lastName: lastName,
            userAlias: alias,
            password: password,
            imageStringBase64: imageStringBase64,
            imageFileExtension: imageFileExtension
          }
          return this.serverFacade.register(registerRequest);
    };

    public async logout(authToken: AuthToken, user: User): Promise<void> {
      const tweeterRequest = {
        token: authToken.token,
        userAlias: user.alias
      }  
      await this.serverFacade.logout(tweeterRequest);
    };
}