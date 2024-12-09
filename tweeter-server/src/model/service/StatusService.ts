import { AuthToken, Status, FakeData, StatusDto } from "tweeter-shared";
import { ItemService } from "./ItemService";

export class StatusService extends ItemService<StatusDto, Status> {
    public async loadMoreFeedItems(
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: StatusDto | null
    ): Promise<[StatusDto[], boolean]> {
        return this.getFakeData(lastItem, pageSize, userAlias, FakeData.instance.getPageOfStatuses.bind(FakeData.instance));
    };
    
    public async loadMoreStoryItems(
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: StatusDto | null
    ): Promise<[StatusDto[], boolean]> {
        return this.getFakeData(lastItem, pageSize, userAlias, FakeData.instance.getPageOfStatuses.bind(FakeData.instance));
    };

    public async postStatus(
        authToken: AuthToken,
        newStatus: Status
      ): Promise<void> {
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
    
        // TODO: Call the server to post the status
      };
}