import { AuthToken } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

export const PAGE_SIZE = 10;

export interface ItemListView<I> extends View {
    addItems: (newItems: I[]) => void
}

export abstract class PagedPresenter<I, S> extends Presenter<ItemListView<I>> {
    private _service: S;
    private _hasMoreItems = true;
    private _lastItem: I | null = null;

    public constructor(view: ItemListView<I>) {
        super(view);
        this._service = this.createService(); 
    }

    protected abstract createService(): S;

    protected get service() {
        return this._service;
    }

    protected get lastItem() {
        return this._lastItem;
    }

    protected set lastItem(value: I | null) {
        this._lastItem = value;
    }

    public get hasMoreItems() {
        return this._hasMoreItems;
    }

    protected set hasMoreItems(value: boolean) {
        this._hasMoreItems = value;
    }

    public async loadMoreItems(authToken: AuthToken, userAlias: string) {
        this.doAsyncFailureReportingOperation(async () => {
            const [newItems, hasMore] = await this.getMoreItems(
                authToken,
                userAlias,
            );

            this.hasMoreItems = hasMore;
            this.lastItem = newItems[newItems.length - 1];
            this.view.addItems(newItems);
        }, this.getItemDescription());
    };

    protected abstract getMoreItems(authToken: AuthToken, userAlias: string): Promise<[I[], boolean]>;

    protected abstract getItemDescription(): string;

    public reset() {
        this._lastItem = null;
        this._hasMoreItems = true;
    }
}