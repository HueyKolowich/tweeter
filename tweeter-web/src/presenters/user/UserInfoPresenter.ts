import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../../service/FollowService";

export interface UserInfoView {
    setIsFollower: (status: boolean) => void
    setFolloweeCount: (count: number) => void
    setFollowerCount: (count: number) => void
    setDisplayedUser: (user: User) => void
    setIsLoading: (status: boolean) => void
    displayInfoMessage: (message: string, duration: number) => void
    displayErrorMessage: (message: string) => void
    clearLastInfoMessage: () => void
}

export class UserInfoPresenter {
    private _view: UserInfoView;
    private followService: FollowService;

    constructor(view: UserInfoView) {
        this._view = view;
        this.followService = new FollowService();
    }

    public async setIsFollowerStatus(
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
    ): Promise<void> {
        try {
          if (currentUser === displayedUser) {
            this._view.setIsFollower(false);
          } else {
            this._view.setIsFollower(
              await this.followService.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
            );
          }
        } catch (error) {
          this._view.displayErrorMessage(
            `Failed to determine follower status because of exception: ${error}`
          );
        }
    };

    public async setNumbFollowees(
        authToken: AuthToken,
        displayedUser: User
    ): Promise<void> {
        try {
          this._view.setFolloweeCount(await this.followService.getFolloweeCount(authToken, displayedUser));
        } catch (error) {
          this._view.displayErrorMessage(
            `Failed to get followees count because of exception: ${error}`
          );
        }
    };

    public async setNumbFollowers(
        authToken: AuthToken,
        displayedUser: User
    ): Promise<void> {
        try {
          this._view.setFollowerCount(await this.followService.getFollowerCount(authToken, displayedUser));
        } catch (error) {
          this._view.displayErrorMessage(
            `Failed to get followers count because of exception: ${error}`
          );
        }
    };

    public switchToLoggedInUser(event: React.MouseEvent, currentUser: User): void {
        event.preventDefault();
        this._view.setDisplayedUser(currentUser!);
    };

    public async followDisplayedUser(
        event: React.MouseEvent,
        authToken: AuthToken,
        displayedUser: User
    ): Promise<void> {
        event.preventDefault();
    
        try {
          this._view.setIsLoading(true);
          this._view.displayInfoMessage(`Following ${displayedUser!.name}...`, 0);
    
          const [followerCount, followeeCount] = await this.followService.follow(
            authToken!,
            displayedUser!
          );
    
          this._view.setIsFollower(true);
          this._view.setFollowerCount(followerCount);
          this._view.setFolloweeCount(followeeCount);
        } catch (error) {
          this._view.displayErrorMessage(
            `Failed to follow user because of exception: ${error}`
          );
        } finally {
          this._view.clearLastInfoMessage();
          this._view.setIsLoading(false);
        }
    };

    public async unfollowDisplayedUser(
        event: React.MouseEvent,
        authToken: AuthToken,
        displayedUser: User
    ): Promise<void> {
        event.preventDefault();
    
        try {
          this._view.setIsLoading(true);
          this._view.displayInfoMessage(
            `Unfollowing ${displayedUser!.name}...`,
            0
          );
    
          const [followerCount, followeeCount] = await this.followService.unfollow(
            authToken!,
            displayedUser!
          );
    
          this._view.setIsFollower(false);
          this._view.setFollowerCount(followerCount);
          this._view.setFolloweeCount(followeeCount);
        } catch (error) {
          this._view.displayErrorMessage(
            `Failed to unfollow user because of exception: ${error}`
          );
        } finally {
          this._view.clearLastInfoMessage();
          this._view.setIsLoading(false);
        }
    };
}