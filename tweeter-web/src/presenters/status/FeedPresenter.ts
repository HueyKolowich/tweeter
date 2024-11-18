import { AuthToken, Status } from "tweeter-shared";
import { StatusItemListPresenter } from "./StatusItemListPresenter";
import { PAGE_SIZE } from "../PagedPresenter";

export class FeedPresenter extends StatusItemListPresenter {
    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[Status[], boolean]> {
        return this.service.loadMoreFeedItems(authToken, userAlias, PAGE_SIZE, this.lastItem);
    }

    protected getItemDescription(): string {
        return 'load feed items';
    }
}