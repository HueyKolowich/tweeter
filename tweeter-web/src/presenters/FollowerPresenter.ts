import { AuthToken } from "tweeter-shared";
import { FollowService } from "../service/FollowService";
import { UserItemListPresenter, UserItemListView } from "./UserItemListPresenter";

export const PAGE_SIZE = 10;

export class FollowerPresenter extends UserItemListPresenter {
    private followService: FollowService;

    public constructor(view: UserItemListView) {
        super(view);
        this.followService = new FollowService();
    }

    public async loadMoreItems(authToken: AuthToken, userAlias: string): Promise<void> {
        try {            
            const [newItems, hasMore] = await this.followService.loadMoreFollowers(
                authToken,
                userAlias,
                PAGE_SIZE,
                this.lastItem
            );
        
            this.hasMoreItems = hasMore;
            this.lastItem = newItems[newItems.length - 1];
            this.view.addItems(newItems);
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to load followers because of exception: ${error}`
            );
        }
    };
}