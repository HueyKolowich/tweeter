import { AuthToken } from "tweeter-shared";
import { StatusItemListPresenter, StatusItemListView } from "./StatusItemListPresenter";
import { StatusService } from "../../service/StatusService";

export const PAGE_SIZE = 10;

export class FeedPresenter extends StatusItemListPresenter {
    private statusService: StatusService;

    public constructor(view: StatusItemListView) {
        super(view);
        this.statusService = new StatusService();
    }

    public async loadMoreItems(authToken: AuthToken, userAlias: string) {
        try {
            const [newItems, hasMore] = await this.statusService.loadMoreFeedItems(
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
                `Failed to load feed items because of exception: ${error}`
            );
        }
    };
}