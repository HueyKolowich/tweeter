import InfiniteScroll from "react-infinite-scroll-component";
import StatusItem from "../statusItem/StatusItem";
import { useState, useContext, useEffect } from "react";
import { Status, AuthToken } from "tweeter-shared";
import useToastListener from "../toaster/ToastListenerHook";
import { UserInfoContext } from "../userInfo/UserInfoProvider";

const PAGE_SIZE = 10;

interface Props {
    loadMoreItems: (
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: Status | null) => Promise<[Status[], boolean]>
    itemTypeDescription: string
}

const StatusItemScroller = (props: Props) => {
    const { displayErrorMessage } = useToastListener();
    const [items, setItems] = useState<Status[]>([]);
    const [newItems, setNewItems] = useState<Status[]>([]);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [lastItem, setLastItem] = useState<Status | null>(null);
    const [changedDisplayedUser, setChangedDisplayedUser] = useState(true);

    const addItems = (newItems: Status[]) =>
        setNewItems(newItems);

    const { displayedUser, authToken } =
        useContext(UserInfoContext);

    // Initialize the component whenever the displayed user changes
    useEffect(() => {
        reset();
    }, [displayedUser]);

    // Load initial items whenever the displayed user changes. Done in a separate useEffect hook so the changes from reset will be visible.
    useEffect(() => {
        if(changedDisplayedUser) {
        loadMoreItems();
        }
    }, [changedDisplayedUser]);

    // Add new items whenever there are new items to add
    useEffect(() => {
        if(newItems) {
        setItems([...items, ...newItems]);
        }
    }, [newItems])

    const reset = async () => {
        setItems([]);
        setNewItems([]);
        setLastItem(null);
        setHasMoreItems(true);
        setChangedDisplayedUser(true);
    }

    const loadMoreItems = async () => {
        try {
        const [newItems, hasMore] = await props.loadMoreItems(
            authToken!,
            displayedUser!.alias,
            PAGE_SIZE,
            lastItem
        );

        setHasMoreItems(hasMore);
        setLastItem(newItems[newItems.length - 1]);
        addItems(newItems);
        setChangedDisplayedUser(false)
        } catch (error) {
        displayErrorMessage(
            `Failed to load ${props.itemTypeDescription} items because of exception: ${error}`
        );
        }
    };

    return (
        <div className="container px-0 overflow-visible vh-100">
            <InfiniteScroll
                className="pr-0 mr-0"
                dataLength={items.length}
                next={loadMoreItems}
                hasMore={hasMoreItems}
                loader={<h4>Loading...</h4>}
            >
                {items.map((item, index) => (
                <div
                    key={index}
                    className="row mb-3 mx-0 px-0 border rounded bg-white"
                >
                    <StatusItem statusItem={item}/>
                </div>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default StatusItemScroller;