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
        selectedUserAlias: string
    ): Promise<[followerCount: number, followeeCount: number]> {
        return this.getBothCounts(token, selectedUserAlias);
    };

    public async follow(
        token: string,
        selectedUserAlias: string
    ): Promise<[followerCount: number, followeeCount: number]> {
        return this.getBothCounts(token, selectedUserAlias);
    };

    private async getBothCounts(
        token: string,
        selectedUserAlias: string
    ): Promise<[followerCount: number, followeeCount: number]> {
        const followerCount = await this.getFollowerCount(token, selectedUserAlias);
        const followeeCount = await this.getFolloweeCount(token, selectedUserAlias);
    
        return [followerCount, followeeCount];
    }
}