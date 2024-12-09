import { User, FakeData, UserDto } from "tweeter-shared";
import { ItemService } from "./ItemService";

export class FollowService extends ItemService<UserDto, User> {        
    public async loadMoreFollowers(
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: UserDto | null
    ): Promise<[UserDto[], boolean]>  {
        return this.getFakeData(lastItem, pageSize, userAlias, (lastUser, limit, omit = userAlias) => FakeData.instance.getPageOfUsers(lastUser, limit, omit));
    };
    
    public async loadMoreFollowees(
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: UserDto | null
    ): Promise<[UserDto[], boolean]> {
        return this.getFakeData(lastItem, pageSize, userAlias, (lastUser, limit, omit = userAlias) => FakeData.instance.getPageOfUsers(lastUser, limit, omit));
    };

    public async getIsFollowerStatus(
        token: string,
        userAlias: string,
        selectedUserAlias: string
    ): Promise<boolean> {
        return FakeData.instance.isFollower();
    };

    public async getFolloweeCount(
        token: string,
        userAlias: string
    ): Promise<number> {
        return this.getItemCount(userAlias, FakeData.instance.getFolloweeCount.bind(FakeData.instance));
    };

    public async getFollowerCount(
        token: string,
        userAlias: string
    ): Promise<number> {
        return this.getItemCount(userAlias, FakeData.instance.getFollowerCount.bind(FakeData.instance));
    };

    public async unfollow(
        token: string,
        userAliasToUnfollow: string
    ): Promise<[followerCount: number, followeeCount: number]> {
        const followerCount = await this.getFollowerCount(token, userAliasToUnfollow);
        const followeeCount = await this.getFolloweeCount(token, userAliasToUnfollow);
    
        return [followerCount, followeeCount];
    };

    public async follow(
        token: string,
        userAliasToFollow: string
    ): Promise<[followerCount: number, followeeCount: number]> {
        const followerCount = await this.getFollowerCount(token, userAliasToFollow);
        const followeeCount = await this.getFolloweeCount(token, userAliasToFollow);
    
        return [followerCount, followeeCount];
    };
}