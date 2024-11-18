import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../../service/FollowService";
import { MessageView, Presenter } from "../Presenter";

export interface UserInfoView extends MessageView {
    setIsFollower: (status: boolean) => void
    setFolloweeCount: (count: number) => void
    setFollowerCount: (count: number) => void
    setDisplayedUser: (user: User) => void
    setIsLoading: (status: boolean) => void
}

export class UserInfoPresenter extends Presenter<UserInfoView> {
    private followService: FollowService;

    constructor(view: UserInfoView) {
        super(view);
        this.followService = new FollowService();
    }

    public async setIsFollowerStatus(
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
    ): Promise<void> {
        try {
          if (currentUser === displayedUser) {
            this.view.setIsFollower(false);
          } else {
            this.view.setIsFollower(
              await this.followService.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
            );
          }
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to determine follower status because of exception: ${error}`
          );
        }
    };

    public async setNumbFollowees(
        authToken: AuthToken,
        displayedUser: User
    ): Promise<void> {
        try {
          this.view.setFolloweeCount(await this.followService.getFolloweeCount(authToken, displayedUser));
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to get followees count because of exception: ${error}`
          );
        }
    };

    public async setNumbFollowers(
        authToken: AuthToken,
        displayedUser: User
    ): Promise<void> {
        try {
          this.view.setFollowerCount(await this.followService.getFollowerCount(authToken, displayedUser));
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to get followers count because of exception: ${error}`
          );
        }
    };

    public switchToLoggedInUser(event: React.MouseEvent, currentUser: User): void {
        event.preventDefault();
        this.view.setDisplayedUser(currentUser!);
    };

    public async followDisplayedUser(
        event: React.MouseEvent,
        authToken: AuthToken,
        displayedUser: User
    ): Promise<void> {
        event.preventDefault();
    
        try {
          this.view.setIsLoading(true);
          this.view.displayInfoMessage(`Following ${displayedUser!.name}...`, 0);
    
          const [followerCount, followeeCount] = await this.followService.follow(
            authToken!,
            displayedUser!
          );
    
          this.view.setIsFollower(true);
          this.view.setFollowerCount(followerCount);
          this.view.setFolloweeCount(followeeCount);
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to follow user because of exception: ${error}`
          );
        } finally {
          this.view.clearLastInfoMessage();
          this.view.setIsLoading(false);
        }
    };

    public async unfollowDisplayedUser(
        event: React.MouseEvent,
        authToken: AuthToken,
        displayedUser: User
    ): Promise<void> {
        event.preventDefault();
    
        try {
          this.view.setIsLoading(true);
          this.view.displayInfoMessage(
            `Unfollowing ${displayedUser!.name}...`,
            0
          );
    
          const [followerCount, followeeCount] = await this.followService.unfollow(
            authToken!,
            displayedUser!
          );
    
          this.view.setIsFollower(false);
          this.view.setFollowerCount(followerCount);
          this.view.setFolloweeCount(followeeCount);
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to unfollow user because of exception: ${error}`
          );
        } finally {
          this.view.clearLastInfoMessage();
          this.view.setIsLoading(false);
        }
    };
}