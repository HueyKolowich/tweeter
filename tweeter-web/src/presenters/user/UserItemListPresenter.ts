import { AuthToken, User } from "tweeter-shared";
import { Presenter, ErrorView } from "../Presenter";

export interface UserItemListView extends ErrorView {
    addItems: (newItems: User[]) => void
}

export abstract class UserItemListPresenter extends Presenter<UserItemListView> {
    private _hasMoreItems = true;
    private _lastItem: User | null = null;

    protected constructor(view: UserItemListView) {
        super(view);
    }

    protected get lastItem() {
        return this._lastItem;
    }

    protected set lastItem(value: User | null) {
        this._lastItem = value;
    }

    public get hasMoreItems() {
        return this._hasMoreItems;
    }

    protected set hasMoreItems(value: boolean) {
        this._hasMoreItems = value;
    }

    public abstract loadMoreItems(authToken: AuthToken, userAlias: string): Promise<void>;

    public reset() {
        this._lastItem = null;
        this._hasMoreItems = true;
    }
}