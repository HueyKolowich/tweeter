import { AuthToken, User } from "tweeter-shared";

export interface UserItemListView {
    addItems: (newItems: User[]) => void
    displayErrorMessage: (message: string) => void
}

export abstract class UserItemListPresenter {
    private _view: UserItemListView;
    private _hasMoreItems = true;
    private _lastItem: User | null = null;

    protected constructor(view: UserItemListView) {
        this._view = view;
    }

    protected get view() {
        return this._view;
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