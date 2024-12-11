import { AuthToken, User } from "tweeter-shared";
import { ServerFacade } from "../net/ServerFacade";

export class FollowService {
    private serverFacade = new ServerFacade();

    public async loadMoreFollowers(
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]>  {
        const pagedUserItemRequest = {
            token: authToken.token,
            userAlias: userAlias,
            pageSize: pageSize,
            lastItem: lastItem?.dto || null
        };
        return this.serverFacade.getMoreFollowers(pagedUserItemRequest);
    };
    
    public async loadMoreFollowees(
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        const pagedUserItemRequest = {
            token: authToken.token,
            userAlias: userAlias,
            pageSize: pageSize,
            lastItem: lastItem?.dto || null
        };
        return this.serverFacade.getMoreFollowees(pagedUserItemRequest);
    };
    
    public async getIsFollowerStatus(
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean> {
        const followActionRequest = {
            token: authToken.token,
            userAlias: user.alias,
            selectedUserAlias: selectedUser.alias
        }
        return this.serverFacade.getIsFollowerStatus(followActionRequest);
    };

    public async getFolloweeCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        const tweeterRequest = {
            token: authToken.token,
            userAlias: user.alias
        }
        return this.serverFacade.getIsFolloweeCount(tweeterRequest);
    };

    public async getFollowerCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        const tweeterRequest = {
            token: authToken.token,
            userAlias: user.alias
        }
        return this.serverFacade.getIsFollowerCount(tweeterRequest);
    };

    public async unfollow(
        authToken: AuthToken,
        user: User,
        userToUnfollow: User
    ): Promise<[followerCount: number, followeeCount: number]> {
        const followActionRequest = {
            token: authToken.token,
            userAlias: user.alias,
            selectedUserAlias: userToUnfollow.alias
        }
        return this.serverFacade.unfollow(followActionRequest);
    };

    public async follow(
        authToken: AuthToken,
        user: User,
        userToFollow: User
    ): Promise<[followerCount: number, followeeCount: number]> {
        const followActionRequest = {
            token: authToken.token,
            userAlias: user.alias,
            selectedUserAlias: userToFollow.alias
        }
        return this.serverFacade.follow(followActionRequest);
    };
}