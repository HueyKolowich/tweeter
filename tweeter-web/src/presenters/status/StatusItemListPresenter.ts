import { AuthToken, Status } from "tweeter-shared";

export interface StatusItemListView {
    addItems: (newItems: Status[]) => void
    displayErrorMessage: (message: string) => void
}

export abstract class StatusItemListPresenter {
    private _view: StatusItemListView;
    private _hasMoreItems = true;
    private _lastItem: Status | null = null;

    protected constructor(view: StatusItemListView) {
        this._view = view;
    }

    protected get view() {
        return this._view;
    }

    protected get lastItem() {
        return this._lastItem;
    }

    protected set lastItem(value: Status | null) {
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