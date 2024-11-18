import { AuthToken, Status } from "tweeter-shared";
import { Presenter, ErrorView } from "../Presenter";

export interface StatusItemListView extends ErrorView {
    addItems: (newItems: Status[]) => void
}

export abstract class StatusItemListPresenter extends Presenter<StatusItemListView> {
    private _hasMoreItems = true;
    private _lastItem: Status | null = null;

    protected constructor(view: StatusItemListView) {
        super(view);
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