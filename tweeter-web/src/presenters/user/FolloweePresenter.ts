import { AuthToken, User } from "tweeter-shared";
import { UserItemListPresenter } from "./UserItemListPresenter";
import { PAGE_SIZE } from "../PagedPresenter";

export class FolloweePresenter extends UserItemListPresenter {
    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[User[], boolean]> {
        return this.service.loadMoreFollowees(authToken, userAlias, PAGE_SIZE, this.lastItem);
    }

    protected getItemDescription(): string {
        return 'load followees';
    }
}