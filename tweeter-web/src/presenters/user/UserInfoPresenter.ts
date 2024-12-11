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
        this.doAsyncFailureReportingOperation(async () => {
          if (currentUser === displayedUser) {
            this.view.setIsFollower(false);
          } else {
            this.view.setIsFollower(
              await this.followService.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
            );
          }
        }, 'determine follower status');
    };

    public async setNumbFollowees(
        authToken: AuthToken,
        displayedUser: User
    ): Promise<void> {
        this.doAsyncFailureReportingOperation(async () => {
          this.view.setFolloweeCount(await this.followService.getFolloweeCount(authToken, displayedUser));
        }, 'get followees count');
    };

    public async setNumbFollowers(
        authToken: AuthToken,
        displayedUser: User
    ): Promise<void> {
        this.doAsyncFailureReportingOperation(async () => {
          this.view.setFollowerCount(await this.followService.getFollowerCount(authToken, displayedUser));
        }, 'get followers count');
    };

    public switchToLoggedInUser(event: React.MouseEvent, currentUser: User): void {
        event.preventDefault();
        this.view.setDisplayedUser(currentUser!);
    };

    public async followDisplayedUser(
        event: React.MouseEvent,
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
    ): Promise<void> {
        event.preventDefault();

        try {
          this.doAsyncFailureReportingOperation(async () => {
            this.view.setIsLoading(true);
            this.view.displayInfoMessage(`Following ${displayedUser!.name}...`, 2000);
      
            const [followerCount, followeeCount] = await this.followService.follow(
              authToken!,
              currentUser!,
              displayedUser!
            );
      
            this.view.setIsFollower(true);
            this.view.setFollowerCount(followerCount);
            this.view.setFolloweeCount(followeeCount);
          }, 'follow user');
        } finally {
          this.view.clearLastInfoMessage();
          this.view.setIsLoading(false);
        }
    };

    public async unfollowDisplayedUser(
        event: React.MouseEvent,
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
    ): Promise<void> {
        event.preventDefault();

        try {
          this.doAsyncFailureReportingOperation(async () => {
            this.view.setIsLoading(true);
            this.view.displayInfoMessage(
              `Unfollowing ${displayedUser!.name}...`,
              0
            );
      
            const [followerCount, followeeCount] = await this.followService.unfollow(
              authToken!,
              currentUser!,
              displayedUser!
            );
      
            this.view.setIsFollower(false);
            this.view.setFollowerCount(followerCount);
            this.view.setFolloweeCount(followeeCount);
          }, 'unfollow user');
        } finally {
          this.view.clearLastInfoMessage();
          this.view.setIsLoading(false);
        }
    };
}