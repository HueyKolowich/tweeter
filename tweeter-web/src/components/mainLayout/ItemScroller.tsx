import { useEffect, useState } from "react";
import { ItemListView, PagedPresenter } from "../../presenters/PagedPresenter";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfo from "../userInfo/UserInfoHook";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props<I, S> {
    presenterGenerator: (view: ItemListView<I>) => PagedPresenter<I, S>
    itemComponent: (item: I) => JSX.Element
}

const ItemScroller = <I, S>(props: Props<I, S>) => {
    const { displayErrorMessage } = useToastListener();
    const [items, setItems] = useState<I[]>([]);
    const [newItems, setNewItems] = useState<I[]>([]);
    const [changedDisplayedUser, setChangedDisplayedUser] = useState(true);

    const { displayedUser, authToken } =
        useUserInfo();

    useEffect(() => {
        reset();
    }, [displayedUser]);

    useEffect(() => {
        if(changedDisplayedUser) {
        loadMoreItems();
        }
    }, [changedDisplayedUser]);

    useEffect(() => {
        if(newItems) {
        setItems([...items, ...newItems]);
        }
    }, [newItems])

    const reset = async () => {
        setItems([]);
        setNewItems([]);
        setChangedDisplayedUser(true);

        presenter.reset();
    }

    const listener: ItemListView<I> = {
        addItems: setNewItems,
        displayErrorMessage: displayErrorMessage
    };
    
    const [presenter] = useState(props.presenterGenerator(listener));

    const loadMoreItems = async () => {
        presenter.loadMoreItems(authToken!, displayedUser!.alias);
        setChangedDisplayedUser(false);
    };

    return (
        <div className="container px-0 overflow-visible vh-100">
            <InfiniteScroll
                className="pr-0 mr-0"
                dataLength={items.length}
                next={loadMoreItems}
                hasMore={presenter.hasMoreItems}
                loader={<h4>Loading...</h4>}
            >
                {items.map((item, index) => (
                <div
                    key={index}
                    className="row mb-3 mx-0 px-0 border rounded bg-white"
                >
                    {props.itemComponent(item)}
                </div>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default ItemScroller;